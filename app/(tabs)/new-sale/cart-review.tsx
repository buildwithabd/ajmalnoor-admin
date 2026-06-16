import { Text } from "@/components/typography/Text";
import { TextInput } from "@/components/typography/TextInput";
import { useCart } from "@/context/CartContext";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

export default function CartReviewScreen() {
  const {
    customerName,
    cart,
    removeItem,
    updateQty,
    paymentMethod,
    setPaymentMethod,
  } = useCart();

  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => (
        <View>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>Cart review</Text>
          <Text style={{ fontSize: 12, color: "grey" }}>
            Customer: {customerName}
          </Text>
        </View>
      ),
    });
  }, [customerName]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <ScrollView
      className="flex-1 bg-[#faf9f5]"
      contentContainerClassName="items-center p-[14px] pb-10 gap-3"
    >
      <View className="w-full bg-white rounded-2xl border-[0.5px] border-[#dfdede] overflow-hidden">
        <Text className="text-base px-3.5 py-2.5">
          ITEMS{" "}
          <Text className="text-gray-400 font-['DMSans-Regular']">
            ({cart.length})
          </Text>
        </Text>
        {cart.map((item) => (
          <View
            key={item.id}
            className="gap-3 px-[14px] py-[10px] border-t-[0.2px] border-t-gray-400"
          >
            <View className="flex-row justify-between">
              <Text className="text-base font-['DMSans-Medium'] text-black">
                {item.name}
              </Text>
              <Text className="text-base font-['DMSans-Medium'] text-black">
                {"\u20A6"}
                {(item.price * item.qty).toLocaleString()}
              </Text>
            </View>
            {item.specs && (
              <View className="bg-[#f5f4ed] rounded-lg p-[10px] gap-[2px]">
                {item.specs?.sn && (
                  <View className="flex-row gap-1">
                    <Text className="w-[55px] text-sm text-[#1d1d1c]">SN</Text>
                    <Text className="text-sm font-['DMSans-Medium'] text-[#1b1b1a]">
                      {item.specs?.sn}
                    </Text>
                  </View>
                )}

                {item.specs?.ram && (
                  <View className="flex-row gap-1">
                    <Text className="w-[55px] text-sm text-[#1d1d1c]">RAM</Text>
                    <Text className="text-sm font-['DMSans-Medium'] text-[#1b1b1a]">
                      {item.specs?.ram}
                    </Text>
                  </View>
                )}

                {item.specs?.rom && (
                  <View className="flex-row gap-1">
                    <Text className="w-[55px] text-sm text-[#1d1d1c]">ROM</Text>
                    <Text className="text-sm font-['DMSans-Medium'] text-[#1b1b1a]">
                      {item.specs?.rom}
                    </Text>
                  </View>
                )}

                {item.specs?.touchscreen && (
                  <View className="flex-row gap-1">
                    <Text className="w-[55px] text-sm text-[#1d1d1c]">
                      Touch
                    </Text>
                    <Text className="text-sm font-['DMSans-Medium'] text-[#1b1b1a]">
                      TouchScreen
                    </Text>
                  </View>
                )}
              </View>
            )}
            <View style={styles.actionContainer}>
              <View style={styles.qtyInputContainer}>
                <Pressable
                  style={styles.qtyInputButton}
                  onPress={() => updateQty(item.id, -1)}
                >
                  <Feather name="minus" size={12} color="black" />
                </Pressable>
                <TextInput
                  style={styles.qtyInput}
                  value={item.qty.toString()}
                  keyboardType="numeric"
                />
                <Pressable
                  style={styles.qtyInputButton}
                  onPress={() => updateQty(item.id, +1)}
                >
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

              <Pressable
                style={styles.deleteBtn}
                onPress={() => removeItem(item.id)}
              >
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

      {cart.length === 0 && (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyCartText}>No items in cart</Text>
        </View>
      )}

      <Pressable style={styles.addMoreBtn} onPress={() => router.back()}>
        <Feather name="plus" size={16} color="black" />
        <Text style={styles.addMoreBtnText}>Add another item</Text>
      </Pressable>

      <View className="w-full bg-white rounded-2xl border-[0.5px] border-[#dfdede] overflow-hidden">
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

      <View className="w-full bg-white rounded-2xl border-[0.5px] border-[#dfdede] overflow-hidden">
        <Text className="text-base px-3.5 py-2.5">PAYMENT METHOD</Text>
        <View style={styles.paymentOptions}>
          <Pressable
            style={[
              styles.paymentOption,
              paymentMethod === "transfer" && styles.paymentOptionSelected,
            ]}
            onPress={() => setPaymentMethod("transfer")}
          >
            <Text style={styles.paymentText}>Transfer</Text>
          </Pressable>
          <Pressable
            style={[
              styles.paymentOption,
              paymentMethod === "cash" && styles.paymentOptionSelected,
            ]}
            onPress={() => setPaymentMethod("cash")}
          >
            <Text style={styles.paymentText}>Cash</Text>
          </Pressable>
        </View>
      </View>

      <Pressable
        style={[
          styles.previewBtn,
          cart.length === 0 && styles.previewBtnDisabled,
        ]}
        disabled={cart.length === 0}
        onPress={() => router.push("/new-sale/receipt-preview")}
      >
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

  emptyCart: {
    justifyContent: "center",
    alignItems: "center",
  },

  emptyCartText: {
    fontSize: 16,
    color: "grey",
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
    fontSize: 16,
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

  paymentOptionSelected: {
    backgroundColor: "#f0f0f0",
    borderColor: "#494946",
    borderWidth: 1,
  },

  paymentText: {
    textAlign: "center",
    fontSize: 18,
    color: "black",
    fontWeight: 400,
  },

  addMoreBtn: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "transparent",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  addMoreBtnText: {
    fontSize: 16,
    color: "black",
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

  previewBtnDisabled: {
    opacity: 0.4,
  },

  previewBtnText: {
    fontSize: 16,
    fontWeight: "medium",
    color: "black",
  },
});
