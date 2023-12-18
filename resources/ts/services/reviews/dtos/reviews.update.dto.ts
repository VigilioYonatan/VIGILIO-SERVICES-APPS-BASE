import validFileValibot from "~/lib/valibot";
import { reviewsSchema } from "../schemas/reviews.schema";
import { type Input, omit, object, array, instance } from "valibot";

export const reviewsUpdateDto = omit(reviewsSchema, ["id", "foto"]);
export const reviewsUpdateImageDto = object({
    foto: array(instance(File), [
        validFileValibot({
            required: true,
            min: 1,
            max: 1,
            types: [
                "image/webp",
                "image/jpg",
                "image/jpeg",
                "image/png",
                "image/gif",
            ],
        }),
    ]),
});
export type ReviewsUpdateDto = Input<typeof reviewsUpdateDto>;
export type ReviewsUpdateImageDto = Input<typeof reviewsUpdateImageDto>;
