"use client"

import {useContext} from "react";
import {AuthContext} from "@/components/login/AuthContextProvider";
import Image from "next/image";
import {LoadingOutlined} from "@ant-design/icons";

import svg from "../../app/icon.svg";

import "./loading.css";

const background = `#${process.env.NEXT_PUBLIC_SECONDARY_COLOUR}`

export const LoadingScreen = () => {
    const { loading } = useContext(AuthContext);

    if(!loading) return <></>;

    return <div className="fixed w-dvw h-dvh top-0 left-0 flex flex-col justify-start items-center z-50" style={{ background }}>
        <div className="h-1/2 flex flex-col justify-evenly items-center">
            <Image src={svg} alt="logo" width={300} height={300} style={{ margin: -80 }} />
            <LoadingOutlined className="loading-icon" />
        </div>
    </div>
}