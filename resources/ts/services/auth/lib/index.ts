import enviroments from "~/config";

// auth
export function facebookUrl() {
    return `${enviroments.VITE_URL}/auth/facebook/callback`;
}
export function googleUrl() {
    return `${enviroments.VITE_URL}/auth/google/callback`;
}
export function logoutUrl() {
    return `${enviroments.VITE_URL}/auth/logout`;
}
