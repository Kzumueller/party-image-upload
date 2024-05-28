"use client"

import {Menu} from "antd";
import Link from 'next/link'
import {usePathname} from "next/navigation";

export const MainNavigation = () => {
    const pathname = usePathname();

    return <Menu
        mode="horizontal"
        theme="dark"
        defaultSelectedKeys={[pathname]}
        items={[
            { key: "/", label: <Link href="/">Hochladen</Link> },
            { key: "/gallery", label: <Link href="/gallery">Galerie</Link> },
        ]}
    />
}