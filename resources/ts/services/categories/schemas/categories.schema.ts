import {
    minLength,
    Input,
    number,
    array,
    object,
    string,
    startsWith,
    optional,
} from "valibot";
import { imagesSchema } from "~/lib/upload";

export const categoriesSchema = object({
    id: number(),
    name: string("Este campo es obligatorio", [
        minLength(1, "Este campo es obligatorio"),
        minLength(3, "Mínimo 3 caracterés"),
    ]),
    icon: string("Este campo es obligatorio", [
        minLength(1, "Este campo es obligatorio"),
        startsWith("<i class=", "Icono inválido"),
    ]),
    image: array(imagesSchema()),
    slug: string("Este campo es obligatorio", [
        minLength(1, "Este campo es obligatorio"),
        minLength(3, "Mínimo 3 caracterés"),
    ]),
    createdAt: optional(string()),
    updatedAt: optional(string()),
});

export type CategoriesSchema = Input<typeof categoriesSchema>;
export type CategoriesSchemaFromServe = CategoriesSchema & {
    createdAt: Date;
    updatedAt: Date;
};
