"use client"

import {useTranslations} from "@/hooks/useTranslations";
import {Button} from "antd";
import {LogoutOutlined} from "@ant-design/icons";
import {useCallback, useContext, useMemo} from "react";
import {fireAuth} from "@/lib/firebase/firebase";
import {useRouter} from "next/navigation";
import {AuthContext} from "@/components/login/AuthContextProvider";

export const LogOut = () => {
    const t = useTranslations();
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const loggedIn = useMemo(() => user !== null, [user]);

    const logOut = useCallback(() => {
        const currentEmail = user?.email;
        fireAuth.signOut();
        console.log(`/login/${currentEmail}`);
        router.replace(`/login/${currentEmail}`);
    }, [router, user]);

    if(!loggedIn) return <></>;

    return <Button icon={<LogoutOutlined/>} onClick={logOut} />;
}