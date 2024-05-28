import {Image} from "@/components/gallery/GalleryContextProvider";
import {cloudStorage} from "@/lib/firebase/firebase";
import {ref, getBlob} from "@firebase/storage";
import {parseFile} from "@/components/upload/processImageFile";

export const downloadImage = async (image: Image) => {
    const anchor = document.createElement("a");

    const imageRef = ref(cloudStorage, image.fullSizePath);
    const file = await getBlob(imageRef);

    anchor.href = await parseFile(file as File);
    anchor.download = `${image.uploaderName}-${image.createdAt.toDate().toLocaleDateString()}.${image.fileExtension}`;

    anchor.click();
}