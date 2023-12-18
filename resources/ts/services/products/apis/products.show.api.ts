import enviroments from "~/config";
import { UseQuery, useQuery } from "@vigilio/preact-fetching";
import { ProductsSchemaFromServe } from "../schemas/products.schema";

export function productsShowApi(
    id: number | string
): UseQuery<ProductsShowAPI, ProductsShowErrorAPI> {
    return useQuery(`/products/${id}`, async function (url) {
        const response = await fetch(`${enviroments.VITE_URL}/api${url}`);
        const result = await response.json();
        if (!result.success) throw result;
        return result;
    });
}

export interface ProductsShowAPI {
    success: boolean;
    product: ProductsSchemaFromServe;
}

export interface ProductsShowErrorAPI {
    success: boolean;
    message: string;
}
