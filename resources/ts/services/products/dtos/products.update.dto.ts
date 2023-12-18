import { Input, array, instance, object, omit } from "valibot";
import { productsSchema } from "../schemas/products.schema";
import validFileValibot from "~/lib/valibot";

export const productsUpdateDto = omit(productsSchema, ["id", "images"]);
export const productsUpdateImagesDto = object({
    images: array(instance(File), [
        validFileValibot({
            required: true,
            min: 1,
            max: 12,
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
export type ProductsUpdateDto = Input<typeof productsUpdateDto>;
export type ProductsUpdateImagesDto = Input<typeof productsUpdateImagesDto>;
