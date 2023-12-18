import { slug } from "@vigilio/express-core";
import { RolesEntitySchema } from "../schemas/roles.schema";

export const rolesSeeder: RolesEntitySchema[] = [
    { name: "admin", slug: slug("admin") },
    { name: "modificador", slug: slug("modificador") },
    { name: "empleado", slug: slug("empleado") },
    { name: "cliente", slug: slug("cliente") },
];
