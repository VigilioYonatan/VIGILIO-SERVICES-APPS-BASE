import useCartStore from "../store/cart.store.tsx";
import { printImagesProduct } from "@/products/lib/helpers";
import { formatMoneyVigilio } from "~/lib/helpers";
import Hr from "@/web/components/Hr.tsx";
import { subtotal } from "../libs/helpers.ts";
import { CartProduct } from "../schemas/cart.schema.ts";

interface ProductCartProps {
    product: CartProduct;
}
function ProductCart({ product }: ProductCartProps) {
    const { methods } = useCartStore();

    return (
        <>
            <div class="flex gap-2 items-center justify-center h-[100px] w-full">
                <img
                    width="100"
                    height="100"
                    class="h-full w-[120px] object-cover ml-2"
                    src={printImagesProduct(product.images, 500)[0]}
                    alt={product.name}
                />
                <div class="flex flex-col gap-2 justify-between w-full">
                    <div class="flex justify-between w-full">
                        <span class="text-primary font-semibold text-center line-clamp-3">
                            {product.name}
                        </span>
                        <button
                            class="mr-2"
                            type="button"
                            onClick={() =>
                                methods.onRemoveProductToCart(product)
                            }
                        >
                            <i class="fas fa-trash dark:text-white" />
                        </button>
                    </div>

                    <div class="flex gap-3 items-center justify-between">
                        {!product.enabled || product.stock! <= 0 ? (
                            <span class="dark:text-secondary-light text-sm text-center">
                                Este producto está agotado
                            </span>
                        ) : (
                            <>
                                <div class="flex flex-col gap-1">
                                    {product.ilimit ? (
                                        <span class="text-xs text-primary whitespace-nowrap">
                                            En Stock
                                        </span>
                                    ) : (
                                        <span class="text-xs text-primary whitespace-nowrap">
                                            {product.stock === 1
                                                ? "1 unidad "
                                                : `${product.stock} unidades`}
                                        </span>
                                    )}

                                    <span class="text-sm dark:text-secondary-light font-normal text-secondary-dark">
                                        {formatMoneyVigilio(
                                            subtotal(
                                                Number(product.price),
                                                Number(product.discount)
                                            )
                                        )}
                                    </span>
                                </div>
                                <div class="flex gap-3 items-center justify-between mr-2">
                                    <button
                                        aria-label="to increment to cart"
                                        type="button"
                                        class="w-[25px] h-[25px] dark:bg-white bg-black rounded-sm dark:text-black text-white font-bold text-xl hover:bg-opacity-80"
                                        onClick={() =>
                                            methods.onIncrementProductToCart(
                                                product
                                            )
                                        }
                                    >
                                        +
                                    </button>
                                    <span class="font-bold dark:text-white">
                                        {product.quantity}
                                    </span>
                                    <button
                                        onClick={() =>
                                            // product.quantity <= 1
                                            //     ? onRemoveProductToCart(product)
                                            methods.onDecrementProductToCart(
                                                product
                                            )
                                        }
                                        aria-label="to decrement to cart"
                                        type="button"
                                        class="w-[25px] h-[25px] dark:bg-white bg-black rounded-sm dark:text-black text-white font-bold text-xl hover:bg-opacity-80"
                                    >
                                        -
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Hr />
        </>
    );
}

export default ProductCart;
