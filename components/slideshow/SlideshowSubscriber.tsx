"use client"

import {useContext, useEffect, useMemo} from "react";
import {SlideshowContext} from "@/components/slideshow/SlideshowContextProvider";
import {collection, limit, onSnapshot, orderBy, query} from "firebase/firestore";
import {firestore} from "@/lib/firebase/firebase";
import {Image} from "@/components/gallery/GalleryContextProvider";

export const SlideshowSubscriber = () => {
    const {
        setImages,
        setLoading
    } = useContext(SlideshowContext);

    const imageCollection = useMemo(() => collection(firestore, "images"), []);
    const imageQuery = useMemo(() => query(imageCollection, orderBy("createdAt", "desc"), limit(25)), [imageCollection]);

    /** Subscription effect */
    useEffect(() => {
        return onSnapshot(imageQuery, snapshot => {
                const images = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Image));

                setImages(images);
                setLoading(false);
            },
            error => console.error(error)
        );
    }, [imageQuery, setImages]);

    return <></>;
}