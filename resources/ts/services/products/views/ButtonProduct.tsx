import useCartStore from "@/cart/store/cart.store";
import { type ProductsSchemaFromServe } from "../schemas/products.schema";

interface ButtonProductProps {
    product: ProductsSchemaFromServe;
}
function ButtonProduct(props: ButtonProductProps) {
    const { methods } = useCartStore();

    function showProduct() {
      
    }
    function handleInsertProduct() {
        methods.onInsertProduct(props.product);
    }

    return (
        <>
            <button
                onClick={showProduct}
                type="button"
                class="w-[50px] flex justify-center items-center bg-secondary py-3"
            >
                <i class="fa-solid fa-eye text-white" />
            </button>
            {/* si está deshabilitado y no hay productos en stock */}
            {!props.product.enabled || props.product.stock! <= 0 ? (
                <span class="text-white flex gap-2 items-center justify-center w-full bg-secondary border-r border-primary py-1 font-bold">
                    <span> Agotado </span>
                </span>
            ) : (
                <>
                    {/* si está habilitado y hay productos en stocks */}
                    {/* si no se agregó al carrito */}
                    {!methods.isAlreadyExistProductToCart(props.product.id) ? (
                        <button
                            onClick={handleInsertProduct}
                            type="button"
                            class="text-white flex gap-2 items-center justify-center w-full bg-primary py-1"
                            aria-label="button to add cart"
                        >
                            <i class="fa-solid fa-cart-shopping" />
                            <span class="hidden sm:block">
                                Añadir a carrito{" "}
                            </span>
                        </button>
                    ) : (
                        <>
                            {/* si se agregó al carrito */}
                            <span class="text-white flex gap-2 items-center justify-center w-full bg-secondary border-r border-primary py-1 font-bold">
                                <span> Añadido </span>
                            </span>
                        </>
                    )}
                </>
            )}
        </>
    );
}

export default ButtonProduct;
