import { Input, omitAsync } from "valibot";
import { categoriesSchema } from "../schemas/categories.schema";

export const categoriesUpdateDto = omitAsync(categoriesSchema, ["id"]);

export type CategoriesUpdateDto = Input<typeof categoriesUpdateDto>;
