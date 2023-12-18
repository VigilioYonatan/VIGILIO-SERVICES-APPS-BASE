import enviroments from "~/config";
import { useMutation } from "@vigilio/preact-fetching";
import { UsersUpdateDto, UsersUpdateFotoDto } from "../dtos/users.update.dto";
import { usersUploadFoto } from "./users.store.api";

export function usersUpdateApi(slug: string | number) {
    return useMutation<UsersUpdateAPI, UsersUpdateDto, UsersUpdateErrorAPI>(
        `/users/${slug}`,
        async function (url, body: UsersUpdateDto) {
            const response = await fetch(`${enviroments.VITE_URL}/api${url}`, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    "content-type": "application/json",
                },
            });
            const result: UsersUpdateAPI = await response.json();
            if (!result.success) throw result;
            return result;
        }
    );
}
export function usersUpdateFotoApi(slug: string | number) {
    return useMutation<
        UsersUpdateAPI,
        UsersUpdateFotoDto & { name: string },
        UsersUpdateErrorAPI
    >(
        `${usersUploadFoto}/${slug}`,
        async function (url, body: UsersUpdateFotoDto & { name: string }) {
            const formData = new FormData();
            formData.append("name", body.name);
            if (body.foto) {
                for (const file of body.foto) {
                    formData.append("file", file);
                }
            }
            const response = await fetch(`${enviroments.VITE_URL}/api${url}`, {
                method: "PATCH",
                body: formData,
            });
            const result: UsersUpdateAPI = await response.json();
            if (!result.success) throw result;
            return result;
        }
    );
}

export interface UsersUpdateAPI {
    success: boolean;
    message: string;
}

export interface UsersUpdateErrorAPI {
    success: boolean;
    message: string;
    body: string;
}
