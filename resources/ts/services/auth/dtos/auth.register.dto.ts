import { usersSchema } from "@/users/schemas/users.schema";
import { pick, Input, merge, object, string, minLength } from "valibot";

export const authRegisterDto = merge([
    pick(usersSchema, ["name", "email", "password"]),
    object({
        repeat_password: string([minLength(1, "Este campo es obligatorio")]),
    }),
]);
export type AuthRegisterDto = Input<typeof authRegisterDto>;
