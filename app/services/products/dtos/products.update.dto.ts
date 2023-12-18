import { Input, omitAsync } from "valibot";
import { productsSchema } from "../schemas/products.schema";

export const productsUpdateDto = omitAsync(productsSchema, ["id", "images"]);
export type ProductsUpdateDto = Input<typeof productsUpdateDto>;
