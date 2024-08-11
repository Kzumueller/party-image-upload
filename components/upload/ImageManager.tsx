"use client"

import {useCallback, useContext, useMemo, useRef, useState} from "react";
import {Button, Card, Col, Row, Select} from "antd";
import {FileImageOutlined} from "@ant-design/icons";
import {SuperLine} from "@/components/SuperLine";
import {UploadContext} from "@/components/upload/UploadContextProvider";
import {processImageFile} from "@/components/upload/processImageFile";
import {useTranslations} from "@/hooks/useTranslations";
import {DeleteButton} from "@/components/DeleteButton";

const presetTags = String(process.env.NEXT_PUBLIC_PRESET_TAGS).split(",")

export const ImageManager = () => {
    const t = useTranslations();
    const { images, setImages, tags, setTags } = useContext(UploadContext);
    const [parsing, setParsing] = useState(false);

    const fileDialogueRef = useRef<HTMLInputElement>(null);

    /** removed the image with the given id from the list */
    const removeImage = useCallback(
        (uid: string) => setImages(images.filter(file => file.id !== uid)),
        [images, setImages]
    );

    /** adds a tag for the given image id  */
    const selectTag = useCallback((imageId: string, tag: string) => {
        setTags({
            ...tags,
            [imageId]: [
                ...(tags[imageId] ?? []),
                tag
            ]
        })
    }, [tags, setTags])

    /** removes a tag from the given image id  */
    const deselectTag = useCallback((imageId: string, tag: string) => {
        setTags({
            ...tags,
            [imageId]: tags[imageId].filter(entry => entry !== tag)
        })
    }, [tags, setTags])

    /** parses images selected via ant's UploadManager component */
    const parseImages = useCallback(async (images: File[]) => {
        setParsing(true);
        setImages([]);
        setTags({});

        const newFileList = await Promise.all(Array.from(images).map(processImageFile))

        setImages(newFileList);
        setParsing(false);
    }, [setParsing, setImages, setTags]);

    // preset tags unified with tags typed in by the user
    const tagOptions = useMemo(
        () => Array.from(new Set([...presetTags, ...Object.values(tags).flatMap(array => array)])),
        [tags])

    return <>
        <Row className="w-full mb-5" justify="center" align="middle">
            <input
                ref={fileDialogueRef}
                className="h-0 w-0"
                type="file"
                accept=".jpg,.jpeg,.png,.ttif,.tif"
                multiple
                onChange={(event) => parseImages(Array.from(event.target.files ?? []))}

            />
            <Button icon={<FileImageOutlined />} loading={parsing} onClick={() => fileDialogueRef.current?.click()}>{t("Select Images")}</Button>
        </Row>

        {!parsing && images.length > 0 && <Row>
            <Col>
                {images.map(image => <Card key={image.id} className="shadow-md !mb-3">
                    <Row gutter={[10, 10]} align="middle" justify="space-between">
                        <Col className="w-full">
                            <DeleteButton onClick={() => removeImage(image.id)} />
                            <Row justify="center"><img src={image.preview} className="max-w-lg mb-2" /></Row>
                            <SuperLine>{image.file.name}</SuperLine>
                            <Row className="w-full">
                                <Select
                                    className="w-full"
                                    mode="tags"
                                    placeholder={t("Tags ...")}
                                    value={tags[image.id] ?? []}
                                    onSelect={tag => selectTag(image.id, tag)}
                                    onDeselect={tag => deselectTag(image.id, tag)}
                                    options={tagOptions.map(value => ({label: value, value}))}
                            />
                            </Row>
                        </Col>
                    </Row>
                </Card>)}
            </Col>
        </Row>}
    </>
}