import { useEffect } from "preact/hooks";
import useCartStore from "../store/cart.store";
import { formatMoneyVigilio } from "~/lib/helpers";
import enviroments from "~/config";
import Hr from "@/web/components/Hr";
import { printImagesProduct } from "@/products/lib/helpers";
import { subtotal } from "../libs/helpers";

function Cart() {
    const { state, methods, computed } = useCartStore();

    useEffect(() => {
        //actualiza el carrito - puede que ya se haya acabado stock o desabilitado
        methods.onInitial();
    }, []);
    return (
        <div class="max-w-6xl mx-auto flex gap-6 px-2 flex-col lg:flex-row">
            <div class="flex w-full flex-col dark:bg-paper-dark bg-background-light p-2 sm:p-6 min-h-[500px]">
                <div class="mb-4">
                    <div class="flex flex-col gap-1 justify-center items-center">
                        <h1 class="flex justify-center text-primary font-bold uppercase text-2xl">
                            Tu carrito
                        </h1>
                    </div>
                </div>
                <div class="flex flex-col gap-2 overflow-auto h-full w-full ">
                    {computed.showCartLength ? (
                        <>
                            {state.cart.map((product) => (
                                <>
                                    <div class="flex gap-4">
                                        <div>
                                            <img
                                                width={100}
                                                height={100}
                                                src={
                                                    printImagesProduct(
                                                        product.images,
                                                        500
                                                    )[0]
                                                }
                                                class="hidden md:block"
                                                alt={product.name}
                                            />
                                        </div>
                                        <div class="flex justify-between w-full items-center gap-4">
                                            <div class="flex flex-col gap-2 w-[170px] sm:w-[200px]">
                                                <span class="text-primary text-xs col-span-3">
                                                    {product.categories.name}
                                                </span>
                                                <span class="text-sm text-secondary-dark dark:text-secondary-light">
                                                    {product.name}
                                                </span>
                                                <span class="text-sm text-secondary-dark dark:text-secondary-light font-normal">
                                                    {formatMoneyVigilio(
                                                        subtotal(
                                                            Number(
                                                                product.price
                                                            ),
                                                            Number(
                                                                product.discount
                                                            )
                                                        )
                                                    )}
                                                </span>
                                            </div>
                                            <span class="text-sm text-secondary-dark dark:text-secondary-light  flex-1 justify-center flex items-center text-center ">
                                                {product.quantity > 1
                                                    ? `${product.quantity} cantidades`
                                                    : "1 cantidad"}
                                            </span>
                                            <div class="  flex-1 justify-center flex items-center">
                                                <p class=" text-lg dark:text-primary font-bold">
                                                    {formatMoneyVigilio(
                                                        subtotal(
                                                            Number(
                                                                product.price
                                                            ),
                                                            Number(
                                                                product.discount
                                                            )
                                                        ) * product.quantity
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <Hr />
                                </>
                            ))}
                        </>
                    ) : (
                        <div className="flex justify-center items-center flex-col">
                            <span class="dark:text-secondary-light">
                                No se agregó ningún producto
                            </span>
                            <a
                                class="text-primary text-sm lowercase mt-2  hover:underline"
                                href={`${enviroments.VITE_URL}/menu`}
                            >
                                <i class="fa-solid fa-cart-shopping  mr-2" /> Ir
                                a menú
                            </a>
                        </div>
                    )}
                </div>
            </div>

            <div class="w-full lg:w-[400px] self-baseline dark:bg-paper-dark bg-background-light flex flex-col gap-1 justify-center items-center p-2">
                <span class="dark:text-secondary-light">
                    Total: <b>{formatMoneyVigilio(methods.getTotal() || 0)}</b>
                </span>
                <a
                    href={`${enviroments.VITE_URL}/cart`}
                    class="text-primary py-2 text-white border-2 border-primary hover:bg-transparent hover:text-primary w-full text-center font-bold bg-primary "
                >
                    <i class="fad fa-credit-card mr-1" /> Pagar
                </a>
            </div>
        </div>
    );
}

export default Cart;
