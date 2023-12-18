import { Input, array, instance, object, omit, optional } from "valibot";
import { usersSchema } from "../schemas/users.schema";
import validFileValibot from "~/lib/valibot";

export const usersUpdateDto = omit(usersSchema, ["id", "foto"]);
export const usersUpdateFotoDto = object({
    foto: optional(
        array(instance(File), [
            validFileValibot({
                required: true,
                min: 1,
                max: 1,
                types: ["image/webp", "image/jpg", "image/jpeg", "image/png"],
            }),
        ])
    ),
});

export type UsersUpdateDto = Input<typeof usersUpdateDto>;
export type UsersUpdateFotoDto = Input<typeof usersUpdateFotoDto>;
