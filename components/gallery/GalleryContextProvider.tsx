"use client"

import {createContext, ReactNode, useState} from "react"
import {Timestamp} from "@firebase/firestore";

export type Image = {
    id?: string;
    uploaderName: string;
    fullSizePath: string;
    previewPath: string;
    fileExtension: string;
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
    total: number;
    setTotal: (total: number) => void;
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
    page: number;
    setPage: (page: number) => void;
    loading: boolean,
    setLoading: (bool: boolean) => void
};

export const pageSize = 5;

export const GalleryContext = createContext<GalleryState>({
    images: [],
    setImages: () => {},
    total: 0,
    setTotal: () => {},
    uploaderName: "defaultValue",
    setUploaderName: () => {},
    uploaderNames: [],
    setUploaderNames: () => {},
    tag: "",
    setTag: () => {},
    tags: [],
    setTags: () => {},
    sort: { by: "createdAt", direction: "desc" },
    setSort: () => {},
    page: 1,
    setPage: () => {},
    loading: false,
    setLoading: () => {}
})

export const GalleryContextProvider = ({children}: { children: ReactNode }) => {
    const [images, setImages] = useState<Image[]>([]);
    const [total, setTotal] = useState(0);
    const [uploaderName, setUploaderName] = useState<string>("");
    const [uploaderNames, setUploaderNames] = useState<string[]>([]);
    const [tag, setTag] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    const [sort, setSort] = useState<Sort>({ by: "createdAt", direction: "desc" });
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);

    return <GalleryContext.Provider value={{
        images,
        setImages,
        total,
        setTotal,
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
        page,
        setPage,
        loading,
        setLoading
    }}>{children}</GalleryContext.Provider>
}