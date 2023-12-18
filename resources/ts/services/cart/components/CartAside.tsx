import useCartStore from "@/cart/store/cart.store";
import ProductCart from "./ProductCart";
import { formatMoneyVigilio } from "~/lib/helpers";
import { useEffect } from "preact/hooks";
import enviroments from "~/config";

interface ButtonCartProps {
    dropdownOpen: boolean;
    onClose: (time?: number) => void;
}
const CartAside = ({ dropdownOpen, onClose }: ButtonCartProps) => {
    const { state, methods, computed } = useCartStore();

    useEffect(() => {
        //actualiza el carrito - puede que ya se haya acabado stock o desabilitado
        methods.onInitial();
    }, []);

    return (
        <div
            class={`${
                dropdownOpen ? "translate-x-0" : "translate-x-full"
            } relative w-full sm:w-[350px] h-full p-4   bg-background-light dark:bg-background-dark delay-custom-1`}
            onClick={(e) => e.stopPropagation()}
        >
            <button
                class="absolute right-0 top-0 m-3 text-2xl dark:text-secondary-light text-secondary-dark"
                onClick={() => onClose()}
                type="button"
                aria-label="close to cart aside"
            >
                <i class="fas fa-times" />
            </button>
            <div class="mb-4">
                <div class="flex flex-col gap-1 justify-center items-center">
                    <span class="flex justify-center text-primary font-bold uppercase">
                        Tu carrito
                    </span>
                </div>
            </div>
            <div class="flex flex-col gap-2 overflow-auto h-full w-full ">
                {computed.showCartLength ? (
                    <>
                        {" "}
                        {state.cart.map((product) => (
                            <ProductCart product={product} key={product.id} />
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
                            <i class="fa-solid fa-cart-shopping  mr-2" /> Ir a
                            menú
                        </a>
                    </div>
                )}
            </div>
            {computed.showCartLength ? (
                <div class="absolute bottom-0 w-full right-0 dark:bg-background-dark bg-background-light flex flex-col gap-1 justify-center items-center p-2">
                    <span class="dark:text-secondary-light">
                        Total:{" "}
                        <b>{formatMoneyVigilio(methods.getTotal() || 0)}</b>
                    </span>
                    <a
                        href={`${enviroments.VITE_URL}/cart`}
                        class="text-primary py-2 text-white border-2 border-primary hover:bg-transparent hover:text-primary w-full text-center font-bold bg-primary "
                    >
                        <i class="fad fa-credit-card mr-1" /> Pagar
                    </a>
                </div>
            ) : null}
        </div>
    );
};

export default CartAside;
