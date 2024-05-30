import { v4 } from "uuid";

export type ManagedFile = {
    id: string;
    file: File;
    preview: string;
}

/**
 * Wraps the given file in a ManagedFile, adding a temporary id and a preview data URL
 * @param file
 */
export const processImageFile = async (file: File): Promise<ManagedFile> => {
    const fullSizedDataUrl = URL.createObjectURL(file);

    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.style.maxWidth = "300px";
        img.style.maxHeight = "300px";
        img.style.position = "fixed";
        img.style.bottom = "-301px"; // just out of view

        // need to actually render it to take advantage of auto-scaling while keeping the ratio constant
        document.body.appendChild(img);

        img.addEventListener("load", () => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            canvas.width = img.width; // actually rendered width
            canvas.height = img.height; // actually rendered height

            if(context) {
                context.drawImage(img, 0, 0, canvas.width, canvas.height);

                resolve({id: v4(), file, preview: canvas.toDataURL()});
            } else {
                reject(new Error("Can't render preview"));
            }

            // mischief managed
            img.remove();
        })

        img.src = fullSizedDataUrl; // start rendering, firing "load" event afterwards
    })
};