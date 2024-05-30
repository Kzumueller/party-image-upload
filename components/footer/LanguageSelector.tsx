"use client"

import { GB, DE, ES } from "country-flag-icons/react/3x2";
import {Dropdown, Select} from "antd";
import {ReactNode, useContext} from "react";
import {TranslationsContext} from "@/components/TranslationsContextProvider";

const languageToFlag: Record<string, ReactNode> = {
    en: <GB className="w-5 h-5" />,
    de: <DE className="w-5 h-5" />,
    es: <ES className="w-5 h-5" />,
}

export const LanguageSelector = () => {
    const { language, setLanguage } = useContext(TranslationsContext);

    /*
    * <Select
        value={language}
        onChange={setLanguage}
        options={}
    />*/

    return <Dropdown
        placement="top"
        menu={{
            items: ["en", "de", "es"].map(language => ({
                key: language,
                label: languageToFlag[language],
                onClick: () => setLanguage(language),
            }))
    }}
    >
        {languageToFlag[language]}
    </Dropdown>
}