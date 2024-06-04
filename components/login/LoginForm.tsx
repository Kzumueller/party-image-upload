"use client"

import {Button, Col, Input, notification, Row} from "antd";
import {signInWithEmailAndPassword,} from "firebase/auth";
import {useCallback, useContext, useEffect, useState} from "react";
import {fireAuth} from "@/lib/firebase/firebase";
import Title from "antd/es/typography/Title";
import {useRouter, useSearchParams} from "next/navigation";
import {AuthContext} from "@/components/login/AuthContextProvider";
import {useTranslations} from "@/hooks/useTranslations";

export const LoginForm = () => {
    const t = useTranslations();
    const router = useRouter();
    const query = useSearchParams();

    const { permissions, setLoading } = useContext(AuthContext);

    const [userPreset] = useState<boolean>(!!query.get("user"));
    const [email, setEmail] = useState(query.get("user") ?? "");
    const [password, setPassword] = useState("");
    const [signingIn, setSigningIn] = useState(false);

    const signIn = useCallback(async (email: string, password: string) => {

        try {
            setSigningIn(true);
            await signInWithEmailAndPassword(fireAuth, email, password);
            setLoading(true);
        } catch(error) {
            notification.error({
                message: t("Login failed")
            })
        } finally {
            setSigningIn(false);
        }
    }, [setLoading, t]);

    useEffect(() => {
        if(permissions) router.push("/");
    }, [router, permissions]);

    return <>
        <Title level={1} className="text-center">{t("Login")}</Title>
        <Row justify="center">
            <Col className="!max-w-lg w-full">
                {!userPreset && <Row className="mb-2">
                    <Input
                        placeholder={t("E-Mail")}
                        type="email"
                        value={email}
                        onChange={({target: {value}}) => setEmail(value)}
                    />
                </Row>}

                <Row className="mb-2">
                    <Input.Password
                        placeholder={t("Password")}
                        type="password"
                        value={password}

                        onChange={({ target: { value } }) => setPassword(value)}
                        onPressEnter={() => signIn(email, password)}
                    />
                </Row>

                <Row className="mb-2">
                    <Col>
                        <Button
                            type="primary"
                            loading={signingIn}
                            disabled={!email || !password}
                            onClick={() => signIn(email, password)}>
                            {t("Login")}
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    </>
}