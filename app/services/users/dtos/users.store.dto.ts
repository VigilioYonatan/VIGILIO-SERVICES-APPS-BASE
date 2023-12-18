import { type Input, omitAsync, getOutput, getPipeIssues } from "valibot";
import { Users } from "../entities/users.entity";
import { UsersSchema, usersSchema } from "../schemas/users.schema";
import { Roles } from "@/roles/entities/roles.entity";

export const usersStoreDto = omitAsync(
    usersSchema,
    ["id"],
    [
        async (input) => {
            const [byEmail, byDni, bySlug, byRole] = await Promise.all([
                Users.findOne({
                    where: {
                        email: input.email,
                    },
                    raw: true,
                }),
                Users.findOne({
                    where: {
                        dni: input.dni,
                    },
                    raw: true,
                }),
                Users.findOne({
                    where: {
                        slug: input.slug,
                    },
                    raw: true,
                }),
                Roles.findByPk(input.role_id, { raw: true }),
            ]);

            if (byEmail) {
                return getPipeIssues(
                    "email" as keyof UsersSchema,
                    `Ya existe un usuario con el email: ${input.email}`,
                    input
                );
            }
            if (byDni) {
                return getPipeIssues(
                    "dni" as keyof UsersSchema,
                    `Ya existe un usuario con el dni: ${input.dni}`,
                    input
                );
            }
            if (bySlug) {
                return getPipeIssues(
                    "slug" as keyof UsersSchema,
                    `Ya existe un usuario con el slug: ${input.slug}`,
                    input
                );
            }
            if (!byRole) {
                return getPipeIssues(
                    "role_id" as keyof UsersSchema,
                    `No se encontró el rol con el id: ${input.role_id}`,
                    input
                );
            }
            return getOutput(input);
        },
    ]
);

export type UsersStoreDto = Input<typeof usersStoreDto>;
