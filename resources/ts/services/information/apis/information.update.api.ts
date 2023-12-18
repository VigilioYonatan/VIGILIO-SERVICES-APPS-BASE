import enviroments from "~/config";
import { UseMutation, useMutation } from "@vigilio/preact-fetching";
import { InformationLogoUpdateDto, InformationUpdateDto } from "../dtos/information.update.dto";
import { InformationSchemaFromServe } from "../schemas/information.schema";
import { informationUploadLogo } from "./information.store.api";


export function informationUpdateApi(
    id: string | number
): UseMutation<
    InformationUpdateAPI,
    InformationUpdateDto,
    InformationUpdateErrorAPI
> {
    return useMutation("/information", async (url, body) => {
        const response = await fetch(
            `${enviroments.VITE_URL}/api${url}/${id}`,
            {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    "content-type": "application/json",
                },
            }
        );
        const result = await response.json();
        if (!result.success) throw result;
        return result;
    });
}
export function usersUpdateFotoApi(slug: string | number) {
    return useMutation<
    InformationLogoUpdateAPI,
    InformationLogoUpdateDto & { name: string },
    InformationUpdateErrorAPI
    >(
        `${informationUploadLogo}/${slug}`,
        async function (url, body: InformationLogoUpdateDto & { name: string }) {
            const formData = new FormData();
            formData.append("name", body.name);
            if (body.logo) {
                for (const file of body.logo) {
                    formData.append("file", file);
                }
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

interface InformationUpdateAPI {
    success: true;
    information: InformationSchemaFromServe;
}
interface InformationLogoUpdateAPI {
    success: true;
    message: string;
}
interface InformationUpdateErrorAPI {
    success: false;
    message: string;
    body: keyof InformationUpdateDto;
}
