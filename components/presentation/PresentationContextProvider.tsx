"use client"

import {createContext, ReactNode, useState} from "react"
import {Image} from "@/components/gallery/GalleryContextProvider";

export type PresentationState = {
    images: Image[];
    setImages: (list: Image[]) => void;
    loading: boolean,
    setLoading: (bool: boolean) => void
};

export const PresentationContext = createContext<PresentationState>({
    images: [],
    setImages: () => {},
    loading: false,
    setLoading: () => {}
})

export const PresentationContextProvider = ({children}: { children: ReactNode }) => {
    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    return <PresentationContext.Provider value={{
        images,
        setImages,
        loading,
        setLoading
    }}>{children}</PresentationContext.Provider>
}