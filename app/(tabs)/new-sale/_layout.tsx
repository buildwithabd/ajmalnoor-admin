import { Stack } from "expo-router";

export default function NewSaleLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="cart-review" options={{ headerShown: false }} />
    </Stack>
  );
}
