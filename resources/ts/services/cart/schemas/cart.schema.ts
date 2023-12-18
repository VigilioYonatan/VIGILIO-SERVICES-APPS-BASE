import { ProductsSchema } from "@/products/schemas/products.schema";

export type CartProduct = Pick<
    ProductsSchema,
    | "id"
    | "name"
    | "price"
    | "stock"
    | "images"
    | "discount"
    | "ilimit"
    | "enabled"
> & {
    quantity: number;
    subtotal: number;
    categories: { id: number; name: string };
};
