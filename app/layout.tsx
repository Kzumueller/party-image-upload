import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Layout, Menu} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Party Image Upload",
  description: "Upload images of the party at the party",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
        <body>
        <Layout className="w-full h-lvh">
            <Header className="w-full">
                <Menu
                    mode="horizontal"
                    theme="dark"
                    defaultSelectedKeys={["upload"]}
                    items={[
                        { key: "upload", label: "Upload" },
                        { key: "gallery", label: "Galerie" },
                    ]}
                />
            </Header>
            <Content className="p-5">
                {children}
            </Content>
            <Footer></Footer>
        </Layout>
        </body>
    </html>
  );
}
