import { CartItem } from "@/types";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type PaymentMethod = "transfer" | "cash";

export default function CartReviewScreen() {
  const { cart: cartRaw, customerName } = useLocalSearchParams<{
    cart: string;
    customerName: string;
  }>();

  const cartString = Array.isArray(cartRaw) ? cartRaw[0] : cartRaw;
  const [cart, setCart] = useState<CartItem[]>(() => JSON.parse(cartString));

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>
          ITEMS <Text style={styles.fontGrey}>({cart.length})</Text>
        </Text>
        {cart.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <View style={styles.itemNameContainer}>
              <Text style={styles.fontBlack}>{item.name}</Text>
              <Text style={styles.fontBlack}>
                {"\u20A6"}
                {(item.price * item.qty).toLocaleString()}
              </Text>
            </View>
            {item.specs && (
              <View style={styles.specsContainer}>
                {item.specs?.sn && (
                  <View style={styles.specContainer}>
                    <Text style={styles.specName}>SN</Text>
                    <Text style={styles.specValue}>{item.specs?.sn}</Text>
                  </View>
                )}

                {item.specs?.ram && (
                  <View style={styles.specContainer}>
                    <Text style={styles.specName}>RAM</Text>
                    <Text style={styles.specValue}>{item.specs?.ram}</Text>
                  </View>
                )}

                {item.specs?.rom && (
                  <View style={styles.specContainer}>
                    <Text style={styles.specName}>ROM</Text>
                    <Text style={styles.specValue}>{item.specs?.rom}</Text>
                  </View>
                )}

                {item.specs?.touchscreen && (
                  <View style={styles.specContainer}>
                    <Text style={styles.specName}>Touch</Text>
                    <Text style={styles.specValue}>TouchScreen</Text>
                  </View>
                )}
              </View>
            )}
            <View style={styles.actionContainer}>
              <View style={styles.qtyInputContainer}>
                <Pressable style={styles.qtyInputButton}>
                  <Feather name="minus" size={12} color="black" />
                </Pressable>
                <TextInput
                  style={styles.qtyInput}
                  value={item.qty.toString()}
                  keyboardType="numeric"
                />
                <Pressable style={styles.qtyInputButton}>
                  <Feather name="plus" size={12} color="black" />
                </Pressable>
                <View style={styles.priceInfo}>
                  <Text>
                    @{"\u20A6"}
                    {item.price.toLocaleString()}
                  </Text>
                  <Text>each</Text>
                </View>
              </View>

              <Pressable style={styles.deleteBtn}>
                <MaterialIcons
                  name="delete-outline"
                  size={24}
                  color={"black"}
                />
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.row}>
          <Text style={styles.subtotal}>Subtotal</Text>
          <Text style={styles.fontBlack}>
            {"\u20A6"}
            {subtotal.toLocaleString()}
          </Text>
        </View>
        <View style={[styles.row, styles.total]}>
          <Text style={styles.fontBlack}>Total</Text>
          <Text style={styles.totalAmount}>
            {"\u20A6"}
            {subtotal.toLocaleString()}
          </Text>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>PAYMENT METHOD</Text>
        <View style={styles.paymentOptions}>
          <Pressable style={styles.paymentOption}>
            <Text style={styles.paymentText}>Transfer</Text>
          </Pressable>
          <Pressable style={styles.paymentOption}>
            <Text style={styles.paymentText}>Cash</Text>
          </Pressable>
        </View>
      </View>

      <Pressable style={styles.previewBtn}>
        <Feather name="arrow-up-right" size={16} color="black" />
        <Text style={styles.previewBtnText}>Preview receipt</Text>
        <Feather name="arrow-up-right" size={16} color="black" />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fontBlack: {
    fontSize: 16,
    color: "black",
    fontWeight: "500",
  },

  fontGrey: {
    color: "grey",
  },

  scrollView: {
    flex: 1,
    backgroundColor: "#faf9f5",
  },

  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    paddingBottom: 40,
    gap: 12,
  },

  sectionContainer: {
    overflow: "hidden",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "#87878a",
  },

  sectionTitle: {
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontWeight: "500",
  },

  itemContainer: {
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 0.2,
    borderTopColor: "grey",
  },

  itemNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  specsContainer: {
    backgroundColor: "#f5f4ed",
    borderRadius: 8,
    padding: 10,
  },

  specContainer: {
    flexDirection: "row",
    gap: 4,
  },

  specName: {
    width: 55,
    color: "#1d1d1c",
    fontWeight: 400,
  },

  specValue: {
    fontWeight: 500,
    color: "#1b1b1a",
  },

  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  qtyInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyInput: {
    width: 55,
    height: 40,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 18,
    fontWeight: 500,
    color: "black",
  },
  qtyInputButton: {
    width: 40,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  priceInfo: {
    flexDirection: "column",
    marginLeft: 10,
  },

  deleteBtn: {
    width: 60,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    height: 45,
  },

  total: {
    borderTopColor: "#ccc",
    borderTopWidth: 0.5,
  },

  rowText: {
    fontSize: 16,
    color: "black",
    fontWeight: 500,
  },

  subtotal: {
    fontSize: 16,
  },

  totalAmount: {
    color: "green",
    fontWeight: 500,
  },

  paymentOptions: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  paymentOption: {
    flex: 1,
    height: 40,
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  paymentText: {
    textAlign: "center",
    fontSize: 18,
    color: "black",
    fontWeight: 400,
  },

  previewBtn: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "transparent",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#494946",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  previewBtnText: {
    fontSize: 16,
    fontWeight: "medium",
    color: "black",
  },
});
