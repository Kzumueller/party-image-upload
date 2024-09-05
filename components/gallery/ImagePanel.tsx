import {Image as ImageType} from "@/components/gallery/GalleryContextProvider";
import Image from "next/image";
import {Button, Col, notification, Row, Skeleton, Tag} from "antd";
import {SuperLine} from "@/components/SuperLine";
import {DownloadOutlined} from "@ant-design/icons";
import {downloadImage} from "@/components/gallery/download/downloadImage";
import {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {deleteObject, getDownloadURL, ref} from "@firebase/storage";
import {cloudStorage, firestore} from "@/lib/firebase/firebase";
import {useTranslations} from "@/hooks/useTranslations";
import {AuthContext} from "@/components/login/AuthContextProvider";
import {DeleteButton} from "@/components/DeleteButton";
import {deleteDoc} from "firebase/firestore";
import {doc} from "@firebase/firestore";

type Props = { image: ImageType };

export const ImagePanel = ({ image }: Props) => {
    const t = useTranslations();
    const { permissions } = useContext(AuthContext);
    const [imageURL, setImageUrl] = useState("");
    const [downloading, setDownloading] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const isAdmin = useMemo(() => permissions?.admin ?? false, [permissions]);

    useEffect(() => {
        const imageRef = ref(cloudStorage, image.previewPath);
        getDownloadURL(imageRef).then(setImageUrl);
    }, [image.previewPath]);

    const deleteImage = useCallback(async () => {
        setDeleting(true);

        const refs = [
            ref(cloudStorage, image.previewPath),
            ref(cloudStorage, image.fullSizePath)
        ];

        try {
            await Promise.all(refs.map(ref => deleteObject(ref)));

            await deleteDoc(doc(firestore, "images", image.id!));
            
            notification.success({ message: t("Image deleted successfully!") });
        } catch(error) {
            console.error(error);
            notification.error({ message: t("Error while deleting image!") });
        } finally {
            setDeleting(false);
        }
    }, [image, t]);

    return <div className="pt-2 pb-2 pl-1 pr-1 bg-white rounded-md max-w-lg">
        <Col>

            {isAdmin && <DeleteButton onClick={deleteImage} loading={deleting} />}

            <Row justify="center" className="mb-2" style={{ minWidth: 300, minHeight: 170 }}>
                <Skeleton style={{ width: 300, height: 170 }} title={false} active loading={!imageURL} paragraph={{ rows: 5 }}>
                    <img
                        className="max-w-full max-h-96"
                        src={imageURL}
                        alt={image.createdAt.toDate().toLocaleTimeString()}
                    />
                </Skeleton>
            </Row>

            <SuperLine>
                {t("%name at %date")
                    .replace("%name", image.uploaderName)
                    .replace("%date", image.createdAt.toDate().toLocaleString())
                }
            </SuperLine>

            <Row gutter={[0, 5]} justify="space-between" align="middle" className="mb-1">
                <Col>
                    <Row>{image.tags.map(tag => <Col key={tag}><Tag>{tag}</Tag></Col>)}</Row>
                </Col>

                <Col>
                    <Button loading={downloading} icon={<DownloadOutlined/>} onClick={async () => {
                        setDownloading(true);
                        await downloadImage(image);
                        setDownloading(false);
                    }}></Button>
                </Col>
            </Row>
        </Col>
    </div>
}