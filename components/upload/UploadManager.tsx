"use client"

import {useCallback, useContext, useState} from "react";
import {UploadContext} from "@/components/upload/UploadContextProvider";
import {Button, Col, notification, Row} from "antd";
import {UploaderName} from "@/components/upload/UploaderName";
import {ImageManager} from "@/components/upload/ImageManager";
import {addDoc, collection} from "firebase/firestore";
import {cloudStorage, firestore} from "@/lib/firebase/firebase";
import {ref, uploadBytes, uploadString} from "@firebase/storage";
import {Image} from "@/components/gallery/GalleryContextProvider";
import {Timestamp} from "@firebase/firestore";
import Title from "antd/es/typography/Title";
import {useTranslations} from "@/hooks/useTranslations";

export const UploadManager = () => {
    const t = useTranslations();
    const {uploaderName, images, setImages, tags, setTags} = useContext(UploadContext);
    const [uploading, setUploading] = useState(false);

    /** uploads image files to google cloud and stores meta info in firestore  */
    const upload = useCallback(async () => {
        try {
            setUploading(true);

            const imageCollection = collection(firestore, "images");

            await Promise.all(images.map(async (image,  index) => {
                const basePath = `${uploaderName}/${image.id}`;
                const fileExtension = image.file.name.split(".")[1]

                const fullSizeImageRef = ref(cloudStorage, `${basePath}/full.${fileExtension}`);
                const previewImageRef = ref(cloudStorage, `${basePath}/preview.${fileExtension}`);

                await uploadBytes(fullSizeImageRef, image.file as Blob);
                await uploadString(previewImageRef, image.preview, "data_url");

                await addDoc(imageCollection, {
                    uploaderName,
                    fullSizePath: fullSizeImageRef.fullPath,
                    previewPath: previewImageRef.fullPath,
                    fileExtension,
                    tags: tags[image.id] ?? [],
                    createdAt: Timestamp.now(),
                    updatedAt: Timestamp.now()
                } as Image);
            }));

            setUploading(false);

            notification.success({
                message: t("Images uploaded successfully!")
            })

            setImages([]);
            setTags({});
        } catch(error) {
            notification.error({
                message: t("Upload failed!"),
                description: String(error)
            })
        }
    }, [images, t, setImages, setTags, uploaderName, tags]);

    return <>
        <Title level={1} className="text-center">{t("Upload Images")}</Title>

        <Row justify="center" className="mt-7 mb-5">
            <Col>
                <UploaderName />
            </Col>
        </Row>

        {!!uploaderName && <Row justify="center">
            <Col>
                <ImageManager/>
            </Col>
        </Row>}

        {!!uploaderName && images.length > 0 &&
            <div className="flex justify-center items-center p-5 bg-white !fixed !bottom-0 left-0 !w-full">
                <Button
                    type="primary"
                    className="!font-bold !w-full max-w-md"
                    loading={uploading}
                    onClick={upload}
                >
                    {t("Submit!")}
                </Button>
            </div>
        }
    </>
}