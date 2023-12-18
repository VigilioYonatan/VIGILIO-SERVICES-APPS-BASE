import { imagesSchema } from "@/uploads/schemas/uploads.schema";
import {
    minLength,
    Input,
    number,
    string,
    optional,
    array,
    maxLength,
    objectAsync,
    numberAsync,
    minValue,
    stringAsync,
    boolean,
    maxValue,
} from "valibot";

export const productsSchema = objectAsync({
    id: number(),
    name: stringAsync("Este campo es obligatorio", [
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
    slug: stringAsync("Este campo es obligatorio", [
        minLength(1, "Este campo es obligatorio"),
        minLength(3, "Este campo permite como minimo 3 carácteres"),
        maxLength(200, "Este campo permite como máximo 200 carácteres"),
    ]),
    category_id: numberAsync("Este campo es obligatorio", [
        minValue(1, "categoria no válida"),
    ]),
});
export type ProductsSchema = Input<typeof productsSchema> & {
    createdAt: Date;
    updatedAt: Date;
};
export type ProductsEntitySchema = Omit<
    ProductsSchema,
    "id" | "createdAt" | "updatedAt"
>;
