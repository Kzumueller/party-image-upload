"use client"

import {Menu} from "antd";
import Link from 'next/link'
import {usePathname} from "next/navigation";
import {useContext, useMemo} from "react";
import {AuthContext} from "@/components/login/AuthContextProvider";
import {useTranslations} from "@/hooks/useTranslations";

export const MainNavigation = () => {
    const t = useTranslations();
    const pathname = usePathname();
    const { permissions } = useContext(AuthContext);

    const items = useMemo(() => [
        ...(permissions?.upload ? [{ key: "/", label: <Link href="/">{t("Upload")}</Link> }] : []),
        ...(permissions?.download ? [{ key: "/gallery", label: <Link href="/gallery">{t("Gallery")}</Link> }] : []),
        ...(permissions?.present ? [{ key: "/slideshow", label: <Link href="/slideshow">{t("Slideshow")}</Link> }] : []),
        ...(permissions?.admin ? [{ key: "/admin", label: <Link href="/admin">{t("Admin")}</Link> }] : []),
        ],
        [permissions, t]);

    return <Menu
        mode="horizontal"
        theme="dark"
        //className="w-full"
        selectedKeys={[pathname]}
        items={items}
    />
}