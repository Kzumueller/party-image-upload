"use client"

import {createContext, ReactNode, useState} from "react"
import {Timestamp} from "@firebase/firestore";

export type Image = {
    id: string;
    uploaderName: string;
    path: string;
    tags: string[];
    createdAt: Timestamp;
    updatedAt: Timestamp;
};

export type Sort = {
    by: string;
    direction: "desc" | "asc"
};

export type GalleryState = {
    images: Image[];
    setImages: (list: Image[]) => void;
    uploaderName: string;
    setUploaderName: (name: string) => void;
    uploaderNames: string[];
    setUploaderNames: (names: string[]) => void;
    tag: string;
    setTag: (tag: string) => void;
    tags: string[];
    setTags: (tags: string[]) => void;
    sort: Sort;
    setSort: (sort: Sort) => void;
};

export const GalleryContext = createContext<GalleryState>({
    images: [],
    setImages: () => {},
    uploaderName: "",
    setUploaderName: () => {},
    uploaderNames: [],
    setUploaderNames: () => {},
    tag: "",
    setTag: () => {},
    tags: [],
    setTags: () => {},
    sort: { by: "createdAt", direction: "desc" },
    setSort: () => {},
})

export const GalleryContextProvider = ({children}: { children: ReactNode }) => {
    const [images, setImages] = useState<Image[]>([]);
    const [uploaderName, setUploaderName] = useState<string>("");
    const [uploaderNames, setUploaderNames] = useState<string[]>([]);
    const [tag, setTag] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [sort, setSort] = useState<Sort>({ by: "createdAt", direction: "desc" });

    return <GalleryContext.Provider value={{
        images,
        setImages,
        uploaderName: uploaderName ?? localStorage.getItem("uploaderName") ?? "",
        setUploaderName,
        uploaderNames,
        setUploaderNames,
        tag,
        setTag,
        tags,
        setTags,
        sort,
        setSort,
    }}>{children}</GalleryContext.Provider>
}