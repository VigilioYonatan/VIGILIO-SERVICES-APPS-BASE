import { CategoriesSchema } from "@/categories/schemas/categories.schema";
import {
    Input,
    array,
    boolean,
    maxLength,
    maxValue,
    minLength,
    minValue,
    number,
    object,
    optional,
    string,
} from "valibot";
import { imagesSchema } from "~/lib/upload";

export const productsSchema = object({
    id: number(),
    name: string("Este campo es obligatorio", [
        minLength(1, "Este campo es obligatorio"),
        minLength(3, "Este campo permite como mínimo 3 carácteres"),
        maxLength(200, "Este campo permite como máximo 200 carácteres"),
    ]),
    description: optional(string()),
    price: number("Este campo permite solo numeros", [
        minValue(0, "Minimo S/. 0"),
    ]),
    stock: optional(number("Este campo permite numeros", [minValue(0)])),
    discount: optional(
        number("Este campo permite numeros", [
            minValue(0, "Minimo 0%"),
            maxValue(100, "Máximo 100%"),
        ])
    ),
    ilimit: boolean("Este campo solo permite verdadero y falso"),
    enabled: boolean("Este campo solo permite verdadero y falso"),
    images: array(imagesSchema()),
    slug: string("Este campo es obligatorio", [
        minLength(1, "Este campo es obligatorio"),
        minLength(3, "Este campo permite como minimo 3 carácteres"),
        maxLength(200, "Este campo permite como máximo 200 carácteres"),
    ]),
    category_id: number("Este campo es obligatorio", [
        minValue(1, "categoria no válida"),
    ]),
});
export type ProductsSchema = Input<typeof productsSchema>;
export type ProductsSchemaFromServe = ProductsSchema & {
    categories: Pick<CategoriesSchema, "id" | "name">;
    createdAt: Date;
    updatedAt: Date;
};
