import validFileValibot from "~/lib/valibot";
import { categoriesSchema } from "../schemas/categories.schema";
import { type Input, omit, object, array, instance } from "valibot";

export const categoriesUpdateDto = omit(categoriesSchema, ["id", "image"]);
export const categoriesUpdateImageDto = object({
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
});
export type CategoriesUpdateDto = Input<typeof categoriesUpdateDto>;
export type CategoriesUpdateImageDto = Input<typeof categoriesUpdateImageDto>;
