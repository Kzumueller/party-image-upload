import {Menu} from "antd";
import Link from 'next/link'

export const MainNavigation = () => {
    return <Menu
        mode="horizontal"
        theme="dark"
        defaultSelectedKeys={["upload"]}
        items={[
            { key: "upload", label: <Link href="/">Hochladen</Link> },
            { key: "gallery", label: <Link href="/gallery">Galerie</Link> },
        ]}
    />
}