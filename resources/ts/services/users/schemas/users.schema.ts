import { RolesSchema } from "@/roles/schemas/roles.schema";
import {
    minLength,
    Input,
    number,
    string,
    optional,
    array,
    object,
    maxLength,
    minValue,
    boolean,
    coerce,
    email,
    date,
    custom,
    startsWith,
} from "valibot";
import { imagesSchema } from "~/lib/upload";

export const usersSchema = object({
    id: number(),
    name: string("Este campo es obligatorio", [
        minLength(1, "Este campo es obligatorio"),
        minLength(3, "Este campo requiere mínimo 3 digitos"),
        maxLength(20, "Este campo requiere máximo 20 digitos"),
    ]),
    father_lastname: optional(
        string([
            minLength(3, "Este campo requiere mínimo 3 digitos"),
            maxLength(20, "Este campo requiere máximo 20 digitos"),
        ])
    ),
    mother_lastname: optional(
        string([
            minLength(3, "Este campo requiere mínimo 3 digitos"),
            maxLength(20, "Este campo requiere máximo 20 digitos"),
        ])
    ),
    birthday: optional(coerce(date(), (value) => new Date(value as string))),
    email: string("Este campo es obligatorio", [
        minLength(1, "Este campo es obligatorio"),
        email("Email no válido"),
    ]),
    password: string("Este campo es obligatorio", [
        minLength(1, "Este campo es obligatorio"),
        minLength(6, "Este campo requiere mínimo 6 digitos"),
    ]),
    address: optional(
        string([minLength(10, "Este campo require mínimo 10 dígitos")])
    ),
    map: optional(object({ lng: number(), lat: number() })),
    dni: optional(
        string("Este campo es obligatorio", [
            minLength(8, "Este campo requiere mínimo 8 digitos"),
            maxLength(8, "Este campo requiere máximo 8 digitos"),
            custom((value) => /^[0-9]+$/.test(value), "Solo permite números"),
        ])
    ),
    telephone: optional(
        string("Este campo es obligatorio", [
            minLength(9, "Este campo requiere mínimo 9 digitos"),
            maxLength(9, "Este campo requiere máximo 9 digitos"),
            startsWith(
                "9",
                "El número de teléfono debe empezar con el numero 9"
            ),
            custom((value) => /^[0-9]+$/.test(value), "Solo permite números"),
        ])
    ),
    especialidad: optional(
        string([
            minLength(3, "Este campo require minimo 3 letras"),
            maxLength(20, "Este campo requiere máximo 20 carácteres"),
        ])
    ),
    google: optional(string()),
    foto: optional(array(imagesSchema())),
    enabled: boolean("Este campo solo permite verdadero y falso"),
    slug: string("Este campo es obligatorio", [
        minLength(1, "Este campo es obligatorio"),
        minLength(3, "Este campo requiere mínimo 3 digitos"),
    ]),
    role_id: number("Este campo es obligatorio", [
        minValue(1, "categoria no válida"),
    ]),
});

export type UsersSchema = Input<typeof usersSchema>;
export type UsersSchemaFromServe = UsersSchema & {
    role: Pick<RolesSchema, "id" | "name">;
    createdAt: Date;
    updatedAt: Date;
};
