import { CartItem } from "@/types";
import { createContext, useContext, useState } from "react";

type PaymentMethod = "transfer" | "cash";

type CartContextType = {
  customerName: string;
  setCustomerName: (name: string) => void;
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, delta: number) => void;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (method: PaymentMethod) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [customerName, setCustomerName] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("transfer");

  const addItem = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newQty = item.qty + delta;
        if (newQty < 1 || newQty > 9999) return item;
        return { ...item, qty: newQty };
      }),
    );
  };

  const clearCart = () => {
    setCart([]);
    setCustomerName("");
  };

  return (
    <CartContext.Provider
      value={{
        customerName,
        setCustomerName,
        cart,
        addItem,
        removeItem,
        updateQty,
        paymentMethod,
        setPaymentMethod,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
