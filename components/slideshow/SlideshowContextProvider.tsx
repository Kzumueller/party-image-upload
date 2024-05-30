"use client"

import {createContext, ReactNode, useState} from "react"
import {Image} from "@/components/gallery/GalleryContextProvider";

export type SlideshowState = {
    images: Image[];
    setImages: (list: Image[]) => void;
    loading: boolean,
    setLoading: (bool: boolean) => void
};

export const SlideshowContext = createContext<SlideshowState>({
    images: [],
    setImages: () => {},
    loading: false,
    setLoading: () => {}
})

export const SlideshowContextProvider = ({children}: { children: ReactNode }) => {
    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    return <SlideshowContext.Provider value={{
        images,
        setImages,
        loading,
        setLoading
    }}>{children}</SlideshowContext.Provider>
}