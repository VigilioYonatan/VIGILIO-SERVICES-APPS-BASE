import { type Input, omitAsync } from "valibot";
import { usersSchema } from "../schemas/users.schema";

export const usersUpdateDto = omitAsync(usersSchema, ["id"]);
export type UsersUpdateDto = Input<typeof usersUpdateDto>;
