import {CloseOutlined, LoadingOutlined} from "@ant-design/icons";
import {Popconfirm, Row} from "antd";
import {useTranslations} from "@/hooks/useTranslations";

type Props = {
    onClick: () => void;
    loading?: boolean;
}

export const DeleteButton = ({ onClick, loading = false }: Props) => {
    const t = useTranslations();

    return <Row justify="end">
        {loading
            ? <LoadingOutlined/>
            : <Popconfirm onConfirm={onClick} title={t("Delete this image?")} okText={t("Yes")} okButtonProps={{ danger: true }} cancelText={t("No")}>
                <CloseOutlined className="!color-danger cursor-pointer mb-3"/>
            </Popconfirm>
        }
    </Row>
}