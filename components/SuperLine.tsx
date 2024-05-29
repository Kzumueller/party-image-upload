import {Row} from "antd";
import {ReactNode} from "react";

export const SuperLine = ({ children }: Readonly<{ children: ReactNode }>) => {
    return <Row className="text-xs italic mb-2 pl-2">{children}</Row>
}