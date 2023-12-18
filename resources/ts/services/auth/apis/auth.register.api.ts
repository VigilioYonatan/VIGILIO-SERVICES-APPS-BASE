import { useMutation } from "@vigilio/preact-fetching";
import { AuthRegisterDto } from "../dtos/auth.register.dto";
import enviroments from "~/config";

export function authRegisterApi() {
    return useMutation<AuthRegisterAPI, AuthRegisterDto, AuthRegisterErrorAPI>(
        "/auth/register",
        async (url, body) => {
            const response = await fetch(`${enviroments.VITE_URL}/api${url}`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "content-type": "application/json",
                },
            });
            const result: AuthRegisterAPI = await response.json();
            if (!result.success) throw result;
            return result;
        }
    );
}

export interface AuthRegisterAPI {
    success: boolean;
    user: User;
}

export interface User {
    name: string;
    email: string;
}
export interface AuthRegisterErrorAPI {
    success: boolean;
    message: string;
    body: string;
}
