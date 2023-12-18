import { imagesSchema } from "@/uploads/schemas/uploads.schema";
import {
    number,
    minLength,
    Input,
    stringAsync,
    objectAsync,
    email,
    maxLength,
    startsWith,
    string,
    optional,
    array,
    boolean,
    numberAsync,
    minValue,
    custom,
    date,
    coerce,
    object,
    optionalAsync,
    nullable,
} from "valibot";

export const usersSchema = objectAsync({
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
    email: stringAsync("Este campo es obligatorio", [
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
    dni: optionalAsync(
        stringAsync([
            minLength(8, "Este campo requiere mínimo 8 digitos"),
            maxLength(8, "Este campo requiere máximo 8 digitos"),
            custom(
                (value) => /^[0-9]+$/.test(value),
                "Este campo permite solo números"
            ),
        ])
    ),
    telephone: optional(
        string([
            minLength(9, "Este campo requiere mínimo 9 digitos"),
            maxLength(9, "Este campo requiere máximo 9 digitos"),
            startsWith(
                "9",
                "El numero de telefono debe empezar con el numero 9"
            ),
            custom(
                (value) => /^[0-9]+$/.test(value),
                "Este campo permite solo números"
            ),
        ])
    ),
    google: optional(string()), // id de google
    especialidad: optional(
        string([
            minLength(3, "Este campo require minimo 3 letras"),
            maxLength(20, "Este campo requiere máximo 20 carácteres"),
        ])
    ),
    foto: optional(nullable(array(imagesSchema()))),
    enabled: boolean(
        "Este campo solo permite verdadero y falso y es obligatorio"
    ),
    slug: stringAsync("Este campo es obligatorio", [
        minLength(1, "Este campo es obligatorio"),
        minLength(3, "Este campo requiere mínimo 3 digitos"),
    ]),
    role_id: numberAsync("Este campo es obligatorio", [
        minValue(1, "categoria no válida"),
    ]),
});

export type UsersSchema = Input<typeof usersSchema> & {
    createdAt: Date;
    updatedAt: Date;
};
export type UsersEntitySchema = Omit<
    UsersSchema,
    "id" | "createdAt" | "updatedAt"
>;
