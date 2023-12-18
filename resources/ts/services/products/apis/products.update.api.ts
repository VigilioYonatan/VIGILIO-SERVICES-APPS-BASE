import enviroments from "~/config";
import { useMutation } from "@vigilio/preact-fetching";
import { storeUploadImages } from "./products.store.api";
import {
    type ProductsUpdateDto,
    type ProductsUpdateImagesDto,
} from "../dtos/products.update.dto";
import { type ProductsSchemaFromServe } from "../schemas/products.schema";

export function productsUpdateApi(slug: string | number) {
    return useMutation<
        ProductsUpdateAPI,
        ProductsUpdateDto,
        ProductsUpdateErrorAPI
    >(`/products/${slug}`, async function (url, body) {
        console.log(body);

        const response = await fetch(`${enviroments.VITE_URL}/api/${url}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json",
            },
        });
        const result = await response.json();
        if (!result.success) throw result;
        return result;
    });
}

export function productsUpdateImagesApi(slug: string | number) {
    return useMutation<
        ProductsUpdateImagesAPI,
        ProductsUpdateImagesDto & { name: string },
        ProductsUpdateErrorAPI
    >(`${storeUploadImages}/${slug}`, async function (url, body) {
        const formData = new FormData();
        formData.append("name", body.name);
        for (const file of body.images) {
            formData.append("file", file);
        }
        const response = await fetch(`${enviroments.VITE_URL}/api${url}`, {
            method: "PATCH",
            body: formData,
        });
        const result = await response.json();
        if (!result.success) throw result;
        return result;
    });
}
export interface ProductsUpdateImagesAPI {
    success: boolean;
    message: string;
}

export interface ProductsUpdateAPI {
    success: boolean;
    product: ProductsSchemaFromServe;
}
export interface ProductsUpdateErrorAPI {
    success: boolean;
    message: string;
    body: string;
}
