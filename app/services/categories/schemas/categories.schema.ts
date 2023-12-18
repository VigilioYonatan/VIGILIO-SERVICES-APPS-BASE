import { imagesSchema } from "@/uploads/schemas/uploads.schema";
import {
    minLength,
    Input,
    stringAsync,
    objectAsync,
    number,
    array,
    string,
    startsWith,
} from "valibot";

export const categoriesSchema = objectAsync({
    id: number(),
    name: stringAsync("Este campo es obligatorio", [
        minLength(1, "Este campo es obligatorio"),
        minLength(3, "Mínimo 3 caracterés"),
    ]),
    icon: string("Este campo es obligatorio", [
        minLength(1, "Este campo es obligatorio"),
        startsWith("<i class=", "Icono inválido"),
    ]),
    image: array(imagesSchema()),
    slug: stringAsync("Este campo es obligatorio", [
        minLength(1, "Este campo es obligatorio"),
        minLength(3, "Mínimo 3 caracterés"),
    ]),
});

export type CategoriesSchema = Input<typeof categoriesSchema> & {
    createdAt: Date;
    updatedAt: Date;
};
export type CategoriesEntitySchema = Omit<
    CategoriesSchema,
    "id" | "createdAt" | "updatedAt"
>;
