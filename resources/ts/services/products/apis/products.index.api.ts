import enviroments from "~/config";
import { type UseQuery, useQuery } from "@vigilio/preact-fetching";
import { ProductsSchemaFromServe } from "../schemas/products.schema";

export type ProductsIndexApiMethod = UseQuery<ProductsIndexAPI, unknown>;

export function productsIndexApi(): ProductsIndexApiMethod {
    return useQuery("/products", async function (url) {
        const response = await fetch(`${enviroments.VITE_URL}/api${url}`);
        const result = await response.json();
        if (!result.success) throw result;
        return result;
    });
}

export interface ProductsIndexAPI {
    success: boolean;
    data: ProductsSchemaFromServe[];
}
