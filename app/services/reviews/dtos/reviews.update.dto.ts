import { Input, omitAsync } from "valibot";
import { reviewsSchema } from "../schemas/reviews.schema";

export const reviewsUpdateDto = omitAsync(reviewsSchema, ["id"]);

export type ReviewsUpdateDto = Input<typeof reviewsUpdateDto>;
