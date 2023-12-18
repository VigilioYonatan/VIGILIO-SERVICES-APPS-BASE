import enviroments from "~/config";
import { UseMutation, useMutation } from "@vigilio/preact-fetching";
import { InformationStoreDto } from "../dtos/information.store.dto";
import {
    InformationSchema,
    InformationSchemaFromServe,
} from "../schemas/information.schema";
import { ImagesSchema } from "~/lib/upload";

export const informationUploadLogo = "/uploads/information/logo";

export function informationStoreApi(): UseMutation<
    InformationStoreAPI,
    InformationStoreDto,
    InformationStoreErrorAPI
> {
    return useMutation("/information", async (url, body) => {
        let images = null;
        if (body.logo) {
            const formData = new FormData();
            formData.append("name", body.name);

            formData.append("file", body.logo[0]);
            const responseImage = await fetch(
                `${enviroments.VITE_URL}/api${informationUploadLogo}`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const resultImage: { success: boolean; images: ImagesSchema[] } =
                await responseImage.json();

            if (!resultImage.success) throw resultImage;
            images = resultImage.images;
        }

        const response = await fetch(`${enviroments.VITE_URL}/api${url}`, {
            method: "POST",
            body: JSON.stringify({
                ...body,
                logo: images,
            } as InformationSchema),
            headers: {
                "content-type": "application/json",
            },
        });
        const result = await response.json();
        if (!result.success) throw result;
        return result;
    });
}

interface InformationStoreAPI {
    success: true;
    information: InformationSchemaFromServe;
}
interface InformationStoreErrorAPI {
    success: false;
    message: string;
    body: keyof InformationStoreDto;
}
