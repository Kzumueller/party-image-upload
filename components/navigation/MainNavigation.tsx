"use client"

import {Menu} from "antd";
import Link from 'next/link'
import {usePathname} from "next/navigation";
import {useContext, useMemo} from "react";
import {AuthContext} from "@/components/login/AuthContextProvider";

export const MainNavigation = () => {
    const pathname = usePathname();
    const { permissions } = useContext(AuthContext);

    const items = useMemo(() => [
        ...(permissions?.upload ? [{ key: "/", label: <Link href="/">Hochladen</Link> }] : []),
        ...(permissions?.download ? [{ key: "/gallery", label: <Link href="/gallery">Galerie</Link> }] : []),
        ...(permissions?.present ? [{ key: "/presentation", label: <Link href="/presentation">Präsentation</Link> }] : []),
        ],
        [permissions]);

    return <Menu
        mode="horizontal"
        theme="dark"
        className="w-full"
        selectedKeys={[pathname]}
        items={items}
    />
}