import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Layout, Menu, Row} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import {MainNavigation} from "@/components/navigation/MainNavigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Party Image UploadManager",
  description: "UploadManager images of the party at the party",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
        <body>
        <AntdRegistry>
            <Layout className="w-full !min-h-lvh">
                <Header className="w-full">
                    <div id="logo"></div>
                    <MainNavigation />
                </Header>
                <Content className="p-5">
                    {children}
                </Content>
                <Footer className="text-center">
                    <Row justify="center">Rike 👰🏼🤵🏽 Andi</Row>
                    <Row justify="center">20.07.2024</Row>
                </Footer>
            </Layout>
        </AntdRegistry>
        </body>
    </html>
  );
}
