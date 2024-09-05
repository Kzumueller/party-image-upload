"use client"

import {useContext, useEffect, useMemo} from "react";
import {GalleryContext, Image} from "@/components/gallery/GalleryContextProvider";
import {collection, getCountFromServer, onSnapshot, orderBy, query, where} from "firebase/firestore";
import {firestore} from "@/lib/firebase/firebase";

export const GallerySubscriber = () => {
    const {
        setImages,
        setUploaderNames,
        setTags,
        setTotal,
        uploaderName,
        tag,
        sort,
        setLoading
    } = useContext(GalleryContext);

    const constraints = useMemo(() => [
        ...(uploaderName ? [where("uploaderName", "==", uploaderName)] : []),
        ...(tag ? [where("tags", "array-contains", tag)] : []),
        orderBy(sort.by, sort.direction)
    ], [uploaderName, tag, sort]);

    const imageCollection = useMemo(() => collection(firestore, "images"), []);
    const imageQuery = useMemo(() => query(imageCollection, ...constraints), [imageCollection, constraints]);

    /** Subscription effect */
    useEffect(() => {
        return onSnapshot(imageQuery, snapshot => {
            setTotal(0);

            const images: Image[] = [];
            const tags: string[] = [];
            const uploaderNames: string[] = [];

            const unfiltered = !tag && !uploaderName;

            snapshot.docs.forEach(doc => {
                const image = { ...doc.data(), id: doc.id } as Image;

                if(unfiltered) {
                    tags.push(...image.tags);
                    uploaderNames.push(image.uploaderName);
                }

                images.push(image);
            });

            if(unfiltered) {
                setTags(Array.from(new Set(tags)));
                setUploaderNames(Array.from(new Set(uploaderNames)));
            }

            getCountFromServer(imageQuery)
                .then(snapshot => setTotal(snapshot.data().count))

            setImages(images);
            setLoading(false);
        },
                error => console.error(error)
        );
    }, [imageQuery, setTags, setUploaderNames, setImages, tag, uploaderName, imageCollection, setLoading, setTotal]);

    return <></>;
}