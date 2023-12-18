import { imagesSchema } from "@/uploads/schemas/uploads.schema";
import {
    minLength,
    Input,
    objectAsync,
    number,
    string,
    maxLength,
    numberAsync,
    nullable,
    array,
    optional,
    optionalAsync,
} from "valibot";

export const reviewsSchema = objectAsync({
    id: number(),
    name: string([
        minLength(1, "Este campo es obligatorio"),
        minLength(3, "Este campo permite máximo 3 carácteres"),
        maxLength(20, "Este campo permite máximo 20 carácteres"),
    ]),
    lastname: optional(
        string([
            minLength(3, "Este campo permite máximo 3 carácteres"),
            maxLength(20, "Este campo permite máximo 20 carácteres"),
        ])
    ),
    review: string("Este campo es obligatorio", [
        minLength(1, "Este campo es obligatorio"),
        minLength(4, "Este campo permite mínimo 4 carácteres"),
        maxLength(255, "Este campo permite máximo 255 carácteres"),
    ]),
    foto: optional(nullable(array(imagesSchema()))),
    star: number(),
    user_id: optionalAsync(numberAsync()),
});

export type ReviewsSchema = Input<typeof reviewsSchema> & {
    createdAt: Date;
    updatedAt: Date;
};
export type ReviewsEntitySchema = Omit<
    ReviewsSchema,
    "id" | "createdAt" | "updatedAt"
>;
