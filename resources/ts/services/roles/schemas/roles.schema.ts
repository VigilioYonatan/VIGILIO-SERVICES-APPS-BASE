import { number, minLength, Input, object, string } from "valibot";

export const rolesSchema = object({
    id: number(),
    name: string([
        minLength(1, "Este campo es obligatorio"),
        minLength(3, "Este campo requiere como minímo 3 carácteres"),
    ]),
    slug: string([
        minLength(1, "Este campo es obligatorio"),
        minLength(3, "Este campo requiere como minímo 3 carácteres"),
    ]),
});

export type RolesSchema = Input<typeof rolesSchema>;
export type RolesSchemaFromServe = RolesSchema & {
    createdAt: Date;
    updatedAt: Date;
};
