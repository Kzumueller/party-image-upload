import {LoginForm} from "@/components/login/LoginForm";
import {Suspense, useMemo} from "react";

type Props = {
    params: { parts: string[] }
};

export default function LoginPage ({ params: { parts } }: Props) {
    const user = useMemo(() => decodeURIComponent(parts?.[0] ?? ""), [parts]);

    return <Suspense>
        <LoginForm user={user} />
    </Suspense>;
}