import { ImagesSchema, printFileWithDimension } from "~/lib/upload";
export type InformationLogoQualities = 100 | 300;

export function printLogoInformation(
    images: ImagesSchema[],
    quality: InformationLogoQualities = 300
) {
    return printFileWithDimension(images, "information", quality);
}
