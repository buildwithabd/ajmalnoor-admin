import { ScrollView, Text, View } from "react-native";
import "../../../global.css";

import { useCart } from "@/context/CartContext";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useRef } from "react";

export default function ReceiptPreviewScreen() {
  const { cart, customerName, paymentMethod, clearCart } = useCart();
  const router = useRouter();
  const navigation = useNavigation();

  const receiptNumber = useRef("RCP" + Date.now().toString().slice(-6)).current;

  const now = new Date();
  const date = now.toLocaleDateString("en-GB");
  const time = now.toLocaleDateString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            Receipt preview
          </Text>
        </View>
      ),
    });
  }, []);

  return (
    <ScrollView>
      <View>
        <Text className="text-red-400">Yes</Text>
      </View>
    </ScrollView>
  );
}
