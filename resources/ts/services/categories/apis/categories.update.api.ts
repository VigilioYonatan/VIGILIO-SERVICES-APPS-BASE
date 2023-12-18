import enviroments from "~/config";
import { UseMutation, useMutation } from "@vigilio/preact-fetching";
import {
    CategoriesUpdateDto,
    CategoriesUpdateImageDto,
} from "../dtos/categories.update.dto";
import { CategoriesSchemaFromServe } from "../schemas/categories.schema";
import { categoriesStoreUploadImage } from "./categories.store.api";

export function categoriesUpdateApi(): UseMutation<
    CategoriesUpdateAPI,
    CategoriesUpdateDto,
    categoriesUpdateErrorAPI
> {
    return useMutation("/categories", async function (url, body) {
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

export function productsUpdateImageApi(
    slug: string | number
): UseMutation<
    ProductsUpdateImageAPI,
    CategoriesUpdateImageDto & { name: string },
    categoriesUpdateErrorAPI
> {
    return useMutation(
        `${categoriesStoreUploadImage}/${slug}`,
        async function (url, body) {
            const formData = new FormData();
            formData.append("name", body.name);
            for (const file of body.image) {
                formData.append("file", file);
            }
            const response = await fetch(`${enviroments.VITE_URL}/api${url}`, {
                method: "PATCH",
                body: formData,
            });
            const result = await response.json();
            if (!result.success) throw result;
            return result;
        }
    );
}
export interface ProductsUpdateImageAPI {
    success: boolean;
    message: string;
}
export interface CategoriesUpdateAPI {
    success: boolean;
    category: CategoriesSchemaFromServe;
}
export interface categoriesUpdateErrorAPI {
    success: boolean;
    message: string;
    body: keyof CategoriesUpdateDto;
}
