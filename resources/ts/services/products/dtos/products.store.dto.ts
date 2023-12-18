import { Input, array, instance, merge, object, omit } from "valibot";
import validFileValibot from "~/lib/valibot";
import { productsSchema } from "../schemas/products.schema";

export const productsStoreDto = merge([
    omit(productsSchema, ["id", "images"]),
    object({
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
    }),
]);

export type ProductsStoreDto = Input<typeof productsStoreDto>;
