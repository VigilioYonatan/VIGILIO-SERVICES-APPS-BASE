import { imagesSchema } from "@/uploads/schemas/uploads.schema";
import {
    number,
    minLength,
    Input,
    array,
    string,
    object,
    optional,
    email,
    startsWith,
    maxLength,
    custom,
    nullable,
    boolean,
} from "valibot";

export const informationSchema = object({
    id: number(),
    name: string([minLength(1, "Este campo es obligatorio")]),
    email: string([email("email no válido")]),
    mapa: string([
        minLength(1, "Este campo es obligatorio"),
        startsWith("https://www.google.com/maps/", "link de mapa no válido"),
    ]),
    telephoneFirst: string([
        minLength(1, "Este campo es obligatorio"),
        minLength(9, "Este campo permite como minímo 9 carácteres"),
        maxLength(9, "Este campo permite como máximo 9 carácteres"),
    ]),
    telephoneSecond: optional(
        string([
            minLength(9, "Este campo permite como minímo 9 carácteres"),
            maxLength(9, "Este campo permite como máximo 9 carácteres"),
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
    telephoneThird: optional(
        string([
            minLength(9, "Este campo permite como minímo 9 carácteres"),
            maxLength(9, "Este campo permite como máximo 9 carácteres"),
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
    logo: optional(nullable(array(imagesSchema()))),
    facebook: optional(
        string([
            startsWith(
                "https://www.facebook.com/",
                "Este campo debe empezar con https://www.facebook.com/"
            ),
        ])
    ),
    tiktok: optional(
        string([
            startsWith(
                "https://www.tiktok.com/",
                "Este campo debe empezar con https://www.tiktok.com/"
            ),
        ])
    ),
    instagram: optional(
        string([
            startsWith(
                "https://www.instagram.com/",
                "Este campo debe empezar con https://www.instagram.com/"
            ),
        ])
    ),
    twitter: optional(
        string([
            startsWith(
                "https://www.twitter.com/",
                "Este campo debe empezar con https://www.twitter.com/"
            ),
        ])
    ),
    youtube: optional(
        string([
            startsWith(
                "https://www.youtube.com/",
                "Este campo debe empezar con https://www.youtube.com/"
            ),
        ])
    ),
    about: string([
        minLength(1, "Este campo es obligatorio"),
        minLength(20, "Este campo permite como minímo 20 carácteres"),
    ]),
    politica: optional(string([minLength(100)])),
    enabled:optional(boolean())
});

export type InformationSchema = Input<typeof informationSchema> & {
    createdAt: Date;
    updatedAt: Date;
};
export type InformationEntitySchema = Omit<
    InformationSchema,
    "id" | "createdAt" | "updatedAt"
>;
