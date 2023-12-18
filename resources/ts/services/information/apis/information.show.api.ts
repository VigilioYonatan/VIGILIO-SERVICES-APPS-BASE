import enviroments from "~/config";
import { UseQuery, useQuery } from "@vigilio/preact-fetching";
import { InformationSchema } from "../schemas/information.schema";

export function informationShowApi(
    id: number | string
): UseQuery<InformationShowAPI, InformationShowErrorAPI> {
    return useQuery(`/information/${id}`, async function (url) {
        const response = await fetch(`${enviroments.VITE_URL}/api${url}`);
        const result: InformationShowAPI = await response.json();
        if (!result.success) throw result;
        return result;
    });
}

export interface InformationShowAPI {
    success: boolean;
    information: InformationSchema & { createdAt: Date; updatedAt: Date };
}

export interface InformationShowErrorAPI {
    success: boolean;
    message: string;
}
