import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product) =>
        set((state) => {
          const exist = state.cartItems.find((item) => item.id === product.id);

          if (exist) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            cartItems: [...state.cartItems, { ...product, quantity: 1 }],
          };
        }),

      increase: (id) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      decrease: (id) =>
        set((state) => ({
          cartItems: state.cartItems
            .map((item) =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        })),

      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ cartItems: [] }),

      getTotalPrice: () =>
        get().cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),

      getTotalCount: () =>
        get().cartItems.reduce((sum, item) => sum + item.quantity, 0),
    }),
    { name: 'cart-storage', version: 2 }
  )
);

export default useCartStore;