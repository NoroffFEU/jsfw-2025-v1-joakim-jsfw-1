import { create } from "zustand";

export type Product = {
  id: string;
  title: string;
  price: number;
  image: {
    url: string;
    alt: string;
  };
};

export type CartItem = Product & { quantity: number };

type ShoppingcartStore = {
  items: CartItem[];
  getItemQuantity: (id: string) => number;
  addToCart: (product: Product) => void;
  increaseCartQuantity: (product: Product) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const useShoppingCart = create<ShoppingcartStore>((set, get) => ({
  items: [],

  getItemQuantity: (id) => get().items.find((i) => i.id === id)?.quantity ?? 0,

  addToCart: (product) => get().increaseCartQuantity(product),

  increaseCartQuantity: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }
      return { items: [...state.items, { ...product, quantity: 1 }] };
    }),

  decreaseCartQuantity: (id) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === id);
      if (!existing) return { items: state.items };
      if (existing.quantity === 1) {
        return { items: state.items.filter((i) => i.id !== id) };
      }
      return {
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
        ),
      };
    }),

  removeFromCart: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

  clearCart: () => set({ items: [] }),
}));

export default useShoppingCart;
