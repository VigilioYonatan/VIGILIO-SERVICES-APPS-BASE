import { useMutation } from "@vigilio/preact-fetching";
import { AuthLoginDto } from "../dtos/auth.login.dto";
import enviroments from "~/config";

export function authLoginApi() {
    return useMutation<AuthLoginAPI, AuthLoginDto, AuthLoginErrorAPI>(
        "/auth/login",
        async (url, body) => {
            const response = await fetch(`${enviroments.VITE_URL}/api${url}`, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "content-type": "application/json",
                },
            });
            const result: AuthLoginAPI = await response.json();
            if (!result.success) throw result;
            return result;
        }
    );
}

export interface AuthLoginAPI {
    success: boolean;
    user: User;
}

export interface User {
    name: string;
    email: string;
}
export interface AuthLoginErrorAPI {
    message: string;
}
