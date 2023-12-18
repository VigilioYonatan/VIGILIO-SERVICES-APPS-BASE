import { type ProductsSchemaFromServe } from "@/products/schemas/products.schema";
import { computed, signal } from "@preact/signals";
import cookie from "js-cookie";
import { subtotal } from "../libs/helpers";
import { CartProduct } from "../schemas/cart.schema";
import enviroments from "~/config";
import { ProductsShowAPI } from "@/products/apis/products.show.api";
// lazy
// const CartProductAlert = lazy(() => import("../components/CartProductAlert"));

interface State {
    cart: CartProduct[];
}
// state

const state = signal<State>({
    cart: JSON.parse(cookie.get("cart") || "[]"),
});
export function useCartStore() {
    async function onInitial() {
        const cartInitial = await Promise.all(
            state.value.cart.map(async (prod) => {
                const response = await fetch(
                    `${enviroments.VITE_URL}/api/products/${prod.id}`
                );
                const result: ProductsShowAPI = await response.json();
                if (result.product.stock! < prod.quantity) {
                    prod.quantity = result.product.stock!;
                }

                return { ...prod, ...result.product };
            })
        );
        state.value = { ...state.value, cart: cartInitial };
    }
    function onInsertProduct(product: ProductsSchemaFromServe) {
        const { category_id, description, ...rest } = product;

        if (isAlreadyExistProductToCart(product.id)) return;
        const productCart: CartProduct = {
            ...rest,
            subtotal: rest.price,
            quantity: 1,
        };
        state.value = {
            ...state.value,
            cart: [...state.value.cart, productCart],
        };
        cookie.set("cart", JSON.stringify(state.value.cart));

        // react component
        // sweetAlert({
        //     html: reactComponent(<CartProductAlert product={productCart} />),
        //     height: 200,
        //     timer: 2,
        //     showCloseButton: true,
        //     position: "bottom:80px;right:20px",
        //     colorAnimation: "var(--primary)",
        //     width: useMediaQueryNoReactive("(min-width:400px)")
        //         ? undefined
        //         : 300,
        // });
    }
    function onIncrementProductToCart(product: CartProduct) {
        if (!isAlreadyExistProductToCart(product.id)) return;
        const incrementProductToCart = state.value.cart.map((prod) => {
            if (prod.id === product.id) {
                if (prod.quantity >= product.stock! && !product.ilimit)
                    return prod;
                prod.quantity++;

                return prod;
            }
            return prod;
        });
        state.value = { ...state.value, cart: incrementProductToCart };
        cookie.set("cart", JSON.stringify(state.value.cart));
    }
    function onDecrementProductToCart(product: CartProduct) {
        if (!isAlreadyExistProductToCart(product.id)) return;
        const decrementProductToCart = state.value.cart.map((prod) => {
            if (prod.id === product.id) {
                if (prod.quantity <= 1) return prod;
                prod.quantity--;
                return prod;
            }
            return prod;
        });
        state.value = { ...state.value, cart: decrementProductToCart };
        cookie.set("cart", JSON.stringify(state.value.cart));
    }

    function onRemoveProductToCart(product: CartProduct) {
        if (!isAlreadyExistProductToCart(product.id)) return;
        const removeProductToCart = state.value.cart.filter(
            (prod) => prod.id !== product.id
        );
        state.value = { ...state.value, cart: removeProductToCart };
        cookie.set("cart", JSON.stringify(state.value.cart));
    }

    function isAlreadyExistProductToCart(id: number) {
        const exist = state.value.cart.find((prod) => prod.id === id);
        return exist;
    }

    const showCartLength = computed(() => {
        return state.value.cart.length || 0;
    });

    function getTotal() {
        // filtramos a los que no tienen ningun producto y los que no esán habilitado
        const total = state.value.cart
            .filter((prod) => prod.enabled && prod.stock! >= 1)
            .reduce((ins, prod) => {
                return (
                    ins +
                    subtotal(Number(prod.price), Number(prod.discount)) *
                        prod!.quantity
                );
            }, 0);

        return total;
    }

    return {
        state: state.value,
        methods: {
            onInsertProduct,
            onIncrementProductToCart,
            onDecrementProductToCart,
            onRemoveProductToCart,
            isAlreadyExistProductToCart,
            getTotal,
            onInitial,
        },
        computed: {
            showCartLength: showCartLength.value,
        },
    };
}
export default useCartStore;
