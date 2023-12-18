import { NoProfileImage } from "~/config/settings";
import { printFileWithDimension } from "~/lib/upload";
import { ImagesSchema } from "~/lib/upload";

export type UsersFotoQualities = 100 | 300;

export function icoRole(role: number): string {
    const roles: Record<number, string> = {
        1: "fa-user-tie",
        2: "fa-user-gear",
        3: "fa-user",
        4: "fa-user-tag",
    };
    return roles[role] || "fa-user";
}
export function icoRoleColor(role: number): string {
    const roles: Record<number, string> = {
        1: "bg-black",
        2: "bg-danger",
        3: "bg-blue-600",
        4: "bg-success",
    };
    return roles[role] || "bg-blue-600";
}

export function printFileUser(
    foto?: ImagesSchema[] | null,
    quality: UsersFotoQualities = 300
) {
    let images = [NoProfileImage()];
    if (foto) {
        images = printFileWithDimension(foto, "users", quality);
    }

    return images;
}
export function numberPhoneFormated(telephone: string) {
    const numeroComoCadena = telephone.toString().split("").reverse().join("");

    const numeroFormateado = numeroComoCadena
        .replace(/(\d{3})/g, "$1-")
        .slice(0, -1)
        .split("")
        .reverse()
        .join("");
    return numeroFormateado;
}
