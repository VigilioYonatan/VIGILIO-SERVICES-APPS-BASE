export function subtotal(price: number, discount: number) {
    return price - ((discount || 0) / 100) * price;
}
