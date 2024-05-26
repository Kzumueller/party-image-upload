import {Menu} from "antd";

export const MainNavigation = () => {
    return <Menu
        mode="horizontal"
        theme="dark"
        defaultSelectedKeys={["upload"]}
        items={[
            { key: "upload", label: "Hochladen" },
            { key: "gallery", label: "Galerie" },
        ]}
    />
}