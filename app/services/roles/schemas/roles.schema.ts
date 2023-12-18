import { number, minLength, Input, stringAsync, objectAsync } from "valibot";

export const rolesSchema = objectAsync({
    id: number(),
    name: stringAsync([
        minLength(1, "Este campo es obligatorio"),
        minLength(3, "Este campo requiere como minímo 3 carácteres"),
    ]),
    slug: stringAsync([
        minLength(1, "Este campo es obligatorio"),
        minLength(3, "Este campo requiere como minímo 3 carácteres"),
    ]),
});

export type RolesSchema = Input<typeof rolesSchema> & {
    createdAt: Date;
    updatedAt: Date;
};
export type RolesEntitySchema = Omit<
    RolesSchema,
    "id" | "createdAt" | "updatedAt"
>;
