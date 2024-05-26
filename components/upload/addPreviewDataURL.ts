import { v4 } from "uuid";

export type ManagedFile = {
    id: string;
    file: File;
    preview: string;
}

/**
 * adds a base64 data URL to an UploadFile in memory
 * @param file
 */
export const addPreviewDataURL = async (file: File): Promise<ManagedFile> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve({ id: v4(), file, preview: reader.result as string });
        reader.onerror = (error) => reject(error);
    });