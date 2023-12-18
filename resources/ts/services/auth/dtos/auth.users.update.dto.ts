import { usersSchema } from "@/users/schemas/users.schema";
import { Input, pick } from "valibot";

export const authUsersUpdateDto = pick(usersSchema, [
    "name",
    "father_lastname",
    "mother_lastname",
    "address",
    "birthday",
    "telephone",
    "password",
]);

export type AuthUsersUpdateDto = Input<typeof authUsersUpdateDto>;
