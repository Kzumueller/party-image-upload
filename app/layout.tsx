import type {Metadata} from "next";
import "./globals.css";
import {ConfigProvider, Layout, Row, ThemeConfig} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {AntdRegistry} from '@ant-design/nextjs-registry';
import {MainNavigation} from "@/components/navigation/MainNavigation";
import {Logo} from "@/components/navigation/Logo";
import {AuthContextProvider} from "@/components/login/AuthContextProvider";
import {LoadingScreen} from "@/components/loadingScreen/LoadingScreen";
import {TranslationsContextProvider} from "@/components/TranslationsContextProvider";
import {LanguageSelector} from "@/components/footer/LanguageSelector";

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
    <html>
        <body>
        <ConfigProvider theme={theme}>
            <AntdRegistry>
                <Layout className="w-full !min-h-svh">
                    <TranslationsContextProvider>
                        <AuthContextProvider>
                            <LoadingScreen />
                            <Header className="flex justify-start items-center !p-0 !m-0 w-svh">
                                <Logo />
                                <MainNavigation />
                            </Header>
                            <Content className="p-5">
                                {children}
                            </Content>
                            <Footer className="text-center">
                                <Row justify="end"><LanguageSelector /></Row>
                            </Footer>
                        </AuthContextProvider>
                    </TranslationsContextProvider>
                </Layout>
            </AntdRegistry>
        </ConfigProvider>
        </body>
    </html>
  );
}
