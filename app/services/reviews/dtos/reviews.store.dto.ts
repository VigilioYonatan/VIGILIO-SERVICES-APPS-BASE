import { Input, getOutput, getPipeIssues, omitAsync } from "valibot";
import { ReviewsSchema, reviewsSchema } from "../schemas/reviews.schema";
import { Users } from "@/users/entities/users.entity";

export const reviewsStoreDto = omitAsync(
    reviewsSchema,
    ["id"],
    [
        async (input) => {
            // validar si se envia user_id
            if (input.user_id) {
                const [byUserId] = await Promise.all([
                    Users.findOne({
                        where: {
                            id: input.user_id,
                        },
                    }),
                ]);

                if (byUserId) {
                    return getPipeIssues(
                        "user_id" as keyof ReviewsSchema,
                        `Ya existe una reseña de: ${byUserId.name} ${
                            byUserId.father_lastname ?? ""
                        }`,
                        input
                    );
                }
            }

            return getOutput(input);
        },
    ]
);
export type ReviewsStoreDto = Input<typeof reviewsStoreDto>;
