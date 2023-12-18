import { usersSchema } from "@/users/schemas/users.schema";
import {
    Input,
    object,
    string,
    minLength,
    mergeAsync,
    pickAsync,
    getPipeIssues,
    getOutput,
} from "valibot";

export const authRegisterDto = mergeAsync(
    [
        pickAsync(usersSchema, ["name", "email", "password"]),
        object({
            repeat_password: string([
                minLength(1, "Este campo es obligatorio"),
            ]),
        }),
    ],
    [
        (input) => {
            if (input.repeat_password !== input.password) {
                return getPipeIssues(
                    "repeat_password",
                    "Contraseñas no similares",
                    input
                );
            }
            return getOutput(input);
        },
    ]
);
export type AuthRegisterDto = Input<typeof authRegisterDto>;
