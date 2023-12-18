import useCartStore from "@/cart/store/cart.store";

interface ButtonCartProps {
    onOpen: () => void;
}
const ButtonCart = ({ onOpen }: ButtonCartProps) => {
    const { computed } = useCartStore();
    return (
        <div class="flex-1 flex justify-center items-center text-white flex-col gap-1">
            <button
                type="button"
                class=" flex justify-center items-center text-white flex-col gap-1 relative "
                onClick={onOpen}
            >
                <i class="fa-solid fa-cart-shopping  text-2xl lg:text-xl" />
                <span class="text-[10px] font-semibold uppercase  lg:text-xs lg:hidden">
                    Carrito
                </span>
                <span class="absolute right-[-8px] top-[-10px] text-white bg-primary text-xs px-2 rounded-full font-bold w-[20px] h-[20px] flex justify-center items-center">
                    {computed.showCartLength}
                </span>
            </button>
        </div>
    );
};

export default ButtonCart;
