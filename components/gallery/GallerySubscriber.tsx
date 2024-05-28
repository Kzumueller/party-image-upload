"use client"

import {useContext, useEffect, useMemo, useState} from "react";
import {GalleryContext, Image} from "@/components/gallery/GalleryContextProvider";
import {collection, query,  where, orderBy, onSnapshot, getDocs, limit} from "firebase/firestore";
import {firestore} from "@/lib/firebase/firebase";

export const GallerySubscriber = () => {
    const {
        setImages,
        setUploaderNames,
        setTags,
        uploaderName,
        tag,
        uploaderNames: savedUploaderNames,
        tags: savedTags,
        sort,
        setLoading
    } = useContext(GalleryContext);

    const [unsubscribe, setUnsubscribe] = useState<() => void>(() => () => {});

    const constraints = useMemo(() => [
        ...(uploaderName ? [where("uploaderName", "==", uploaderName)] : []),
        ...(tag ? [where("tags", "array-contains", tag)] : []),
        orderBy(sort.by, sort.direction),
        limit(10),

    ], [uploaderName, tag]);

    const imageCollection = useMemo(() => collection(firestore, "images"), []);
    const imageQuery = useMemo(() => query(imageCollection, ...constraints), [imageCollection, constraints])

    /** Subscription effect */
    useEffect(() => {
        const newUnsubscribe = onSnapshot(imageQuery, snapshot => {
            const images: Image[] = []
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
                const newTags = Array.from(new Set(tags));

                setTags(newTags);

                const names = Array.from(new Set(uploaderNames));
                setUploaderNames(names)
            }

            setImages(images);
            setLoading(false);
        }, error => console.error(error));

        //setUnsubscribe(newUnsubscribe);

        return newUnsubscribe;
    }, [imageQuery, setTags, setUploaderNames, setImages]);

    return <></>;
}