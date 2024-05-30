"use client"

import {useContext} from "react";
import {TranslationsContext} from "@/components/TranslationsContextProvider";

export const useTranslations = () => {
    const { t } = useContext(TranslationsContext);

    return t;
}