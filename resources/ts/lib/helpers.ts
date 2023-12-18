import { formatMoney } from "@vigilio/express-core/helpers";
import cookie from "js-cookie";
import dayjs from "dayjs";

export function formatDateTwo(
    date: string | Date | number,
    format = "DD-MM-YYYY"
): string | Date {
    return dayjs(date).format(format);
}

export function formatMoneyVigilio(value: number) {
    const money: "USD" | "PEN" =
        (cookie.get("money") as "USD" | "PEN") ?? "PEN";
    let converted = 1;
    if (money === "USD") {
        converted = 0.26774035;
    }
    const price = value * converted;
    return formatMoney(price, money);
}
