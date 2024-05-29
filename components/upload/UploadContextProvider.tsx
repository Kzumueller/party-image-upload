"use client"

import {createContext, ReactNode, useState} from "react"
import {ManagedFile} from "@/components/upload/processImageFile";

export type Upload = {
    uploaderName: string;
    setUploaderName: (name: string) => void;
    images: ManagedFile[];
    setImages: (images: ManagedFile[]) => void;
    tags: Record<string, string[]>;
    setTags: (tags: Record<string, string[]>) => void;
};

export const UploadContext = createContext<Upload>({
    uploaderName: "",
    setUploaderName: () => {},
    images: [],
    setImages: () => {},
    tags: {},
    setTags: () => {}
})

export const UploadContextProvider = ({children}: { children: ReactNode }) => {
    const [uploaderName, setUploaderName] = useState("");
    const [images, setImages] = useState<ManagedFile[]>([]);
    const [tags, setTags] = useState<Record<string, string[]>>({});

    return <UploadContext.Provider value={{
        uploaderName: uploaderName ?? localStorage.getItem("uploaderName") ?? "",
        setUploaderName,
        images,
        setImages,
        tags,
        setTags
    }}>{children}</UploadContext.Provider>
}