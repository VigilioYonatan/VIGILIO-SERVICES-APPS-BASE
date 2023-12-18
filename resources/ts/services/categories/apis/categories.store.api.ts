import { CategoriesSchemaFromServe } from "../schemas/categories.schema";
import { CategoriesStoreDto } from "../dtos/categories.store.dto";
import { UseMutation, useMutation } from "@vigilio/preact-fetching";
import enviroments from "~/config";

export const categoriesStoreUploadImage = "/uploads/categories/image";

export function categoriesStoreApi(): UseMutation<
    CategoriesStoreAPI,
    CategoriesStoreDto,
    CategoriesStoreErrorAPI
> {
    return useMutation("/categories", async function (url, body) {
        const formData = new FormData();
        formData.append("name", body.name);
        for (const file of body.image) {
            formData.append("file", file);
        }
        const responseImage = await fetch(
            `${enviroments.VITE_URL}/api${categoriesStoreUploadImage}`,
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
                image: resultImage.images,
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
export interface CategoriesStoreErrorAPI {
    body: keyof CategoriesStoreDto;
    message: string;
    success: false;
}

export interface CategoriesStoreAPI {
    success: boolean;
    category: CategoriesSchemaFromServe;
}

export interface Image {
    dimension: number;
    file: string;
}
