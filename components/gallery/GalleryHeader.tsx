"use client"

import Title from "antd/es/typography/Title";
import {useTranslations} from "@/hooks/useTranslations";

export const GalleryHeader = () => {
    const t = useTranslations();

    return <Title level={1} className="text-center">{t("Gallery")}</Title>
}