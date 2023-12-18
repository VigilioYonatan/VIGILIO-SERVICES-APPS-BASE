import {
    type Input,
    instance,
    merge,
    object,
    omit,
    array,
    optional,
} from "valibot";
import { reviewsSchema } from "../schemas/reviews.schema";
import validFileValibot from "~/lib/valibot";

export const reviewsStoreDto = merge([
    omit(reviewsSchema, ["id", "foto"]),
    object({
        foto: optional(
            array(instance(File), [
                validFileValibot({
                    required: false,
                    min: 1,
                    max: 1,
                }),
            ])
        ),
    }),
]);

export type ReviewsStoreDto = Input<typeof reviewsStoreDto>;
