import { type Input, instance, merge, object, omit, array } from "valibot";
import { categoriesSchema } from "../schemas/categories.schema";
import validFileValibot from "~/lib/valibot";

export const categoriesStoreDto = merge([
    omit(categoriesSchema, ["id", "image"]),
    object({
        image: array(instance(File), [
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
    }),
]);

export type CategoriesStoreDto = Input<typeof categoriesStoreDto>;
