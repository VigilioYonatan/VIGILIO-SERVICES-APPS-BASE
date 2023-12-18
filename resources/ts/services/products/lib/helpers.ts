import { ImagesSchema, printFileWithDimension } from "~/lib/upload";
export type ProductImagesQualities = 300 | 500;

export function printImagesProduct(
    images: ImagesSchema[],
    quality: ProductImagesQualities = 500
) {
    return printFileWithDimension(images, "products", quality);
}
