import { UsersSchema } from "@/users/schemas/users.schema";

export type AuthLogin = Omit<UsersSchema, "role_id" | "password"> & {
    role: {
        id: number;
        name: string;
    };
};
