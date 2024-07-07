import type {Metadata} from "next";
import "./globals.css";
import {Col, ConfigProvider, Layout, Row, ThemeConfig} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {AntdRegistry} from '@ant-design/nextjs-registry';
import {MainNavigation} from "@/components/navigation/MainNavigation";
import {Logo} from "@/components/navigation/Logo";
import {AuthContextProvider} from "@/components/login/AuthContextProvider";
import {LoadingScreen} from "@/components/loadingScreen/LoadingScreen";
import {TranslationsContextProvider} from "@/components/TranslationsContextProvider";
import {LanguageSelector} from "@/components/footer/LanguageSelector";
import {LogOut} from "@/components/footer/LogOut";

export const metadata: Metadata = {
  title: "Rike 👰🏼🤵🏽 Andi",
  description: "20.07.2024"
};

const primary = "#A6553C";
const secondary = "#001529";

const theme : ThemeConfig = {
    token: {
        colorPrimary: primary,
        colorText: "#868686",
        colorError: "#933"
    },
    components: {
        Layout: {
            headerBg: secondary,

        },
        Menu: {
            darkItemBg: secondary,
            darkItemColor: "#ddd",
            darkItemSelectedColor: "#fff"
        }
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
                            <Header className="flex justify-start items-center gap-x-3 !pl-3 !pr-3 !m-0 !w-svh !max-w-full !h-max">
                                <Logo />
                                <MainNavigation />
                            </Header>
                            <Content className="p-5">
                                {children}
                            </Content>
                            <Footer className="text-center">
                                <Row justify="end" align="middle" gutter={15}>
                                    <Col><LogOut /></Col>
                                    <Col><LanguageSelector /></Col>
                                </Row>
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
