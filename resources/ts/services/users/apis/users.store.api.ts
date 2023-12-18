import { UsersSchema, UsersSchemaFromServe } from "../schemas/users.schema";
import { UsersStoreDto } from "../dtos/users.store.dto";
import { useMutation } from "@vigilio/preact-fetching";
import enviroments from "~/config";

export const usersUploadFoto = "/uploads/users/foto";

export function usersStoreApi() {
    return useMutation<UsersStoreAPI, UsersStoreDto, UsersStoreErrorAPI>(
        "/users",
        async function (url, body) {
            let foto = null;
            if (body.foto) {
                const formData = new FormData();
                formData.append("name", body.name);
                for (const file of body.foto) {
                    formData.append("file", file);
                }
                const responseImage = await fetch(
                    `${enviroments.VITE_URL}/api${usersUploadFoto}`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );
                const resultImage = await responseImage.json();

                if (!resultImage.success) throw resultImage;
                foto = resultImage.images;
            }

            const response = await fetch(`${enviroments.VITE_URL}/api${url}`, {
                body: JSON.stringify({
                    ...body,
                    foto,
                } as UsersSchema),
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
            });
            const result: UsersStoreAPI = await response.json();

            if (!result.success) throw result;
            return result;
        }
    );
}

export interface UsersStoreAPI {
    success: boolean;
    user: UsersSchemaFromServe;
}

export interface UsersStoreErrorAPI {
    success: boolean;
    message: string;
    body: string;
}
