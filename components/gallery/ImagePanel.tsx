import {Image} from "@/components/gallery/GalleryContextProvider";
import {Button, Col, Row, Skeleton, Tag} from "antd";
import {SuperLine} from "@/components/SuperLine";
import {DownloadOutlined} from "@ant-design/icons";
import {downloadImage} from "@/components/gallery/download/downloadImage";
import {useEffect, useState} from "react";
import {getDownloadURL, ref} from "@firebase/storage";
import {cloudStorage} from "@/lib/firebase/firebase";

type Props = { image: Image };

export const ImagePanel = ({ image }: Props) => {
    const [imageURL, setImageUrl] = useState("");

    useEffect(() => {
        const imageRef = ref(cloudStorage, image.previewPath);
        getDownloadURL(imageRef).then(setImageUrl);
    }, [image.previewPath]);

    return <div className="pt-2 pb-2 pl-1 pr-1 bg-white rounded-md max-w-lg">
        <Col>
            <Row justify="center" className="mb-2">
                <Skeleton style={{ width: 300, height: 170 }} title={false} active loading={!imageURL} paragraph={{ rows: 5 }}>
                    <img
                        className="max-w-full max-h-96"
                        //src={`https://firebasestorage.googleapis.com/v0/b/party-image-upload.appspot.com/o/${image.previewPath.replaceAll("/", "%2F")}?alt=media`}
                        src={imageURL}
                        alt={`${image.uploaderName} um ${image.createdAt.toDate().toLocaleTimeString()}`}
                    />
                </Skeleton>
            </Row>

            <SuperLine>
                {image.uploaderName} um {image.createdAt.toDate().toLocaleTimeString()}
            </SuperLine>

            <Row gutter={[0, 5]} justify="space-between" align="middle" className="mb-1">
                <Col>
                    <Row>{image.tags.map(tag => <Col key={tag}><Tag>{tag}</Tag></Col>)}</Row>
                </Col>

                <Col>
                    <Button icon={<DownloadOutlined/>} onClick={() => downloadImage(image)}></Button>
                </Col>
            </Row>
        </Col>
    </div>
}