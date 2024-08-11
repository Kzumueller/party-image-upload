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
    title: process.env.NEXT_PUBLIC_META_TITLE,
    description: process.env.NEXT_PUBLIC_META_DESCRIPTION
};

// env vars need to be referenced as simple as possible because of the way next passes env vars to the front-end
const primaryCode = process.env.NEXT_PUBLIC_PRIMARY_COLOUR;
const secondaryCode = process.env.NEXT_PUBLIC_SECONDARY_COLOUR;

const primaryColour = `#${primaryCode}`;
const secondaryColour = `#${secondaryCode}`;

const theme : ThemeConfig = {
    token: {
        colorPrimary: primaryColour,
        colorText: primaryColour,
        colorError: "#d44",
        colorTextPlaceholder: "#757575",
        colorBorder: "#bbb"
    },
    components: {
        Layout: {
            headerBg: secondaryColour,
            colorBgLayout: "#f5f5f5"
        },
        Menu: {
            darkItemBg: secondaryColour,
            darkItemColor: primaryColour,
            darkItemSelectedColor: secondaryColour
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
