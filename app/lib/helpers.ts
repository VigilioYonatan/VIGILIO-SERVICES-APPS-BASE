export function holiday() {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1;
    switch (mesActual) {
        case 1:
            return "new-year";
        case 7:
            return "independencia";
        case 10:
            return "halloween";
        case 12:
            return "christmas";
        default:
            return null;
    }
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
