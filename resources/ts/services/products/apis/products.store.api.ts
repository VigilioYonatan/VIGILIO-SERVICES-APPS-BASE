import { ProductsStoreDto } from "../dtos/products.store.dto";
import { useMutation } from "@vigilio/preact-fetching";
import { ProductsSchemaFromServe } from "../schemas/products.schema";
import enviroments from "~/config";

export const storeUploadImages = "/uploads/products/images";

export function productsStoreApi() {
    return useMutation<
        ProductsStoreAPI,
        ProductsStoreDto,
        ProductsStoreErrorAPI
    >("/products", async function (url, body) {
        const formData = new FormData();
        formData.append("name", body.name);
        for (const file of body.images) {
            formData.append("file", file);
        }
        const responseImage = await fetch(
            `${enviroments.VITE_URL}/api${storeUploadImages}`,
            {
                method: "POST",
                body: formData,
            }
        );
        const resultImage = await responseImage.json();

        if (!resultImage.success) throw resultImage;

        const response = await fetch(`${enviroments.VITE_URL}/api${url}`, {
            body: JSON.stringify({
                ...body,
                images: resultImage.images,
            }),
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
        });
        const result = await response.json();

        if (!result.success) throw result;
        return result;
    });
}

export interface ProductsStoreAPI {
    success: boolean;
    product: ProductsSchemaFromServe;
}

export interface ProductsStoreErrorAPI {
    success: boolean;
    message: string;
    body: string;
}
