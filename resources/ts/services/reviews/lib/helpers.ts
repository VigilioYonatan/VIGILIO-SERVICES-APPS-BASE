import { NoProfileImage } from "~/config/settings";
import { ImagesSchema, printFileWithDimension } from "~/lib/upload";
export type ReviewsImageQualities = 100;

export function printFotoReviews(
    foto?: ImagesSchema[] | null,
    quality: ReviewsImageQualities = 100
) {
    let images = [NoProfileImage()];
    if (foto) {
        images = printFileWithDimension(foto, "reviews", quality);
    }

    return images;
}
