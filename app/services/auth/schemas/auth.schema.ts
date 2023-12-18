import { UsersSchema } from "@/users/schemas/users.schema";

export type AuthLoginUser = Omit<UsersSchema, "password">;
