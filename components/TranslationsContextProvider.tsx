"use client"

import {createContext, ReactNode, useCallback, useEffect, useState} from "react";

import en from "@/lib/i18n/en.json";
import de from "@/lib/i18n/de.json";
import es from "@/lib/i18n/es.json";

type Resources = {
    [locale: string]: {
        [key: string]: string
    }
};

const resources: Resources = { ...en, ...de, ...es };

type TranslationsState = {
    t: (key: string) => string;
    language: string;
    setLanguage: (language: string) => void;
}

export const TranslationsContext = createContext<TranslationsState>({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {}
})

export const TranslationsContextProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<string>("en");

    useEffect(() => {
        const locale = window.navigator.language;
        const language = locale.split("-")[0];

        setLanguage(language in resources ? language: "en");
    }, [setLanguage]);

    const t = useCallback((key: string) => {
        if(key in resources[language])
            return resources[language][key];

        if(language !== "en") console.info(`Missing key ${key} in language ${language}`);

        return key;
    }, [language])

    return <TranslationsContext.Provider value={{
        language,
        setLanguage,
        t
    }}>{children}</TranslationsContext.Provider>
}