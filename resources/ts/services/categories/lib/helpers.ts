import { ImagesSchema, printFileWithDimension } from "~/lib/upload";
export type CategoriesImageQualities = 300 | 500;

export function printImagesCategories(
    images: ImagesSchema[],
    quality: CategoriesImageQualities = 500
) {
    return printFileWithDimension(images, "categories", quality);
}
