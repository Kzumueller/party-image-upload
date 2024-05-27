"use client"

import {useContext, useEffect, useMemo, useState} from "react";
import {GalleryContext, Image} from "@/components/gallery/GalleryContextProvider";
import {collection, query, where, orderBy, onSnapshot, getDocs} from "firebase/firestore";
import {firestore} from "@/lib/firebase/firebase";

export const GallerySubscriber = () => {
    const {
        setImages,
        setUploaderNames,
        setTags,
        uploaderName,
        tag,
        sort
    } = useContext(GalleryContext);

    const [unsubscribe, setUnsubscribe] = useState<() => void>(() => () => {});

    const constraints = useMemo(() => [
        ...(uploaderName ? [where("uploaderName", "==", uploaderName)] : []),
        ...(tag ? [where("tags", "==", tag)] : []),
        orderBy(sort.by, sort.direction)
    ], [uploaderName, tag]);

    const imageCollection = useMemo(() => collection(firestore, "images"), []);
    const imageQuery = useMemo(() => query(imageCollection, ...constraints), [imageCollection, constraints])

    /** Subscription effect */
    useEffect(() => {
        console.log("calling onSnapshot");

        // unsubscribe the earlier listener first
        //if (typeof unsubscribe === "function") unsubscribe();

        const images: Image[] = []
        const tags: string[] = [];
        const uploaderNames: string[] = [];

        const newUnsubscribe = onSnapshot(imageQuery, snapshot => {
            snapshot.forEach(doc => {
                const image = { ...doc.data(), id: doc.id } as Image;

                tags.push(...image.tags);
                uploaderNames.push(image.uploaderName);
                images.push(image);
            });

            setTags(Array.from(new Set(...tags)));
            setUploaderNames(Array.from(new Set(...uploaderNames)))
            setImages(images);
        }, error => console.error(error));

        //setUnsubscribe(newUnsubscribe);

        return newUnsubscribe;
    }, [imageQuery, setTags, setUploaderNames, setImages]);

    return <></>;
}