import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ConfigProvider, Layout, Menu, Row, ThemeConfig} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import {MainNavigation} from "@/components/navigation/MainNavigation";
import {Logo} from "@/components/navigation/Logo";
import {AuthContextProvider} from "@/components/login/AuthContextProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rike 👰🏼🤵🏽 Andi",
  description: "20.07.2024"
};

const theme : ThemeConfig = {
    token: {
        colorPrimary: "#A6553C",
        colorText: "#868686"
    }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
        <body>
        <ConfigProvider theme={theme}>
            <AntdRegistry>
                <Layout className="w-full !min-h-lvh">
                    <AuthContextProvider>
                        <Header className="flex items-center !pl-0">
                            <Logo />
                            <MainNavigation />
                        </Header>
                        <Content className="p-5">
                            {children}
                        </Content>
                        <Footer className="text-center">
                            <Row justify="center">Rike 👰🏼🤵🏽 Andi</Row>
                            <Row justify="center">20.07.2024</Row>
                        </Footer>
                    </AuthContextProvider>
                </Layout>
            </AntdRegistry>
        </ConfigProvider>
        </body>
    </html>
  );
}
