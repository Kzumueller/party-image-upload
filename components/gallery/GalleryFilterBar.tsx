"use client"

import {useContext} from "react";
import {GalleryContext} from "@/components/gallery/GalleryContextProvider";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import {Row} from "antd";

export const GalleryFilterBar = () => {
    const {
        images,
        uploaderName,
        setUploaderName,
        uploaderNames,
        tag,
        setTag,
        tags,
        sort,
        setSort
    } = useContext(GalleryContext);



    return <Row justify="center">
        Filters
    </Row>
}