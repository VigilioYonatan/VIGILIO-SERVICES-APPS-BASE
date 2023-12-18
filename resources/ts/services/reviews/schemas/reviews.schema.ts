import { UsersSchema } from "@/users/schemas/users.schema";
import {
    minLength,
    object,
    number,
    string,
    maxLength,
    array,
    optional,
    Input,
} from "valibot";
import { imagesSchema } from "~/lib/upload";

export const reviewsSchema = object({
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
    foto: optional(array(imagesSchema())),
    star: number(),
    user_id: optional(number()),
});

export type ReviewsSchema = Input<typeof reviewsSchema>;
export type ReviewsSchemaFromServe = ReviewsSchema & {
    user: Pick<UsersSchema, "id" | "name" | "father_lastname" | "foto">;
    createdAt: Date;
    updatedAt: Date;
};
