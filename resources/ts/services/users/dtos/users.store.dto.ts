import { Input, array, instance, merge, object, omit, optional } from "valibot";
import { usersSchema } from "../schemas/users.schema";
import validFileValibot from "~/lib/valibot";

export const usersStoreDto = merge([
    omit(usersSchema, ["id", "foto"]),
    object({
        foto: optional(
            array(instance(File), [
                validFileValibot({
                    required: false,
                    min: 1,
                    max: 1,
                }),
            ])
        ),
    }),
]);

export type UsersStoreDto = Input<typeof usersStoreDto>;
