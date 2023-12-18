import enviroments from "~/config";
import {
    type UseQuery,
    useQuery,
    type OptionsQuery,
} from "@vigilio/preact-fetching";

export type InformationIndexApiMethod = UseQuery<InformationIndexAPI, unknown>;

export function informationIndexApi(
    options?: OptionsQuery<InformationIndexAPI, unknown>
): InformationIndexApiMethod {
    return useQuery(
        "/information",
        async function (url) {
            const response = await fetch(`${enviroments.VITE_URL}/api${url}`);
            const result: InformationIndexAPI = await response.json();
            if (!result.success) throw result;
            return result;
        },
        options
    );
}

export interface InformationIndexAPI {
    success: boolean;
    data: Information[];
}

export interface Information {
    id: number;
    name: string;
    email: string;
    mapa: string;
    telephone: string[];
    logo: Logo[];
    about: string;
    updatedAt: string;
    createdAt: string;
    google: string;
    tiktok: string;
    instagram: string;
    twitter: string;
    youtube: string;
    facebook: string;
}

export interface Logo {
    dimension: number;
    file: string;
}
