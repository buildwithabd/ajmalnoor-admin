import { CartProvider } from "@/context/CartContext";
import { Stack } from "expo-router";

export default function NewSaleLayout() {
  return (
    <CartProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "New Sale",
          }}
        />
        <Stack.Screen name="cart-review" options={{}} />
        <Stack.Screen name="receipt-preview" options={{}} />
      </Stack>
    </CartProvider>
  );
}
