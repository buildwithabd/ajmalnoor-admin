import { Text } from "@/components/typography/Text";
import { TextInput } from "@/components/typography/TextInput";
import { useCart } from "@/context/CartContext";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, ScrollView, View } from "react-native";

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
          ITEMS <Text className="text-gray-400 font-dm">({cart.length})</Text>
        </Text>
        {cart.map((item) => (
          <View
            key={item.id}
            className="gap-3 px-[14px] py-[10px] border-t-[0.2px] border-t-gray-400"
          >
            <View className="flex-row justify-between">
              <Text className="text-base text-black">{item.name}</Text>
              <Text className="text-base text-black">
                {"\u20A6"}
                {(item.price * item.qty).toLocaleString()}
              </Text>
            </View>
            {item.specs && (
              <View className="bg-[#f5f4ed] rounded-lg p-[10px] gap-[2px]">
                {item.specs?.sn && (
                  <View className="flex-row gap-1">
                    <Text className="w-[55px] text-sm text-[#1d1d1c]">SN</Text>
                    <Text className="text-sm text-[#1b1b1a]">
                      {item.specs?.sn}
                    </Text>
                  </View>
                )}

                {item.specs?.ram && (
                  <View className="flex-row gap-1">
                    <Text className="w-[55px] text-sm text-[#1d1d1c]">RAM</Text>
                    <Text className="text-sm text-[#1b1b1a]">
                      {item.specs?.ram}
                    </Text>
                  </View>
                )}

                {item.specs?.rom && (
                  <View className="flex-row gap-1">
                    <Text className="w-[55px] text-sm text-[#1d1d1c]">ROM</Text>
                    <Text className="text-sm text-[#1b1b1a]">
                      {item.specs?.rom}
                    </Text>
                  </View>
                )}

                {item.specs?.touchscreen && (
                  <View className="flex-row gap-1">
                    <Text className="w-[55px] text-sm text-[#1d1d1c]">
                      Touch
                    </Text>
                    <Text className="text-sm text-[#1b1b1a]">TouchScreen</Text>
                  </View>
                )}
              </View>
            )}
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Pressable
                  className="w-[40px] h-[30px] items-center justify-center rounded-xl border border-[#ccc]"
                  onPress={() => updateQty(item.id, -1)}
                >
                  <Feather name="minus" size={12} color="black" />
                </Pressable>
                <TextInput
                  className="w-[55px] h-[40px] text-center text-lg text-black"
                  value={item.qty.toString()}
                  keyboardType="numeric"
                />
                <Pressable
                  className="w-[40px] h-[30px] items-center justify-center rounded-xl border border-[#ccc]"
                  onPress={() => updateQty(item.id, +1)}
                >
                  <Feather name="plus" size={12} color="black" />
                </Pressable>
                <View className="flex-col ml-[10px]">
                  <Text className="text-sm text-gray-500">
                    @{"\u20A6"}
                    {item.price.toLocaleString()}
                  </Text>
                  <Text className="text-sm text-gray-500">each</Text>
                </View>
              </View>

              <Pressable
                className="w-[60px] h-[50px] items-center justify-center rounded-xl border border-[#ccc]"
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
        <View className="items-center justify-center">
          <Text className="text-base text-gray-400">No items in cart</Text>
        </View>
      )}

      <Pressable
        className="flex-row w-full py-[10px] bg-transparent rounded-xl border-[0.5px] border-[#ccc] items-center justify-center gap-2"
        onPress={() => router.back()}
      >
        <Feather name="plus" size={16} color="black" />
        <Text className="text-lg text-black">Add another item</Text>
      </Pressable>

      <View className="w-full bg-white rounded-2xl border-[0.5px] border-[#87878a] overflow-hidden">
        <View className="flex-row justify-between items-center px-[14px] h-[45px]">
          <Text className="text-base text-gray-500">Subtotal</Text>
          <Text className="text-base text-black">
            ₦{subtotal.toLocaleString()}
          </Text>
        </View>
        <View className="flex-row justify-between items-center px-[14px] h-[45px] border-t-[0.5px] border-t-[#ccc]">
          <Text className="text-base text-black">Total</Text>
          <Text className="text-base font-dmSemi text-green-600">
            ₦{subtotal.toLocaleString()}
          </Text>
        </View>
      </View>

      <View className="w-full bg-white rounded-2xl border-[0.5px] border-[#87878a] overflow-hidden">
        <Text className="text-base font-dmSemi text-black px-[14px] py-[10px]">
          PAYMENT METHOD
        </Text>
        <View className="flex-row gap-3 px-[14px] pb-3">
          <Pressable
            className={`flex-1 h-[40px] border rounded-xl items-center justify-center ${
              paymentMethod === "transfer"
                ? "bg-[#f0f0f0] border-[#494946]"
                : "border-[#ccc]"
            }`}
            onPress={() => setPaymentMethod("transfer")}
          >
            <Text className="text-lg text-black">Transfer</Text>
          </Pressable>
          <Pressable
            className={`flex-1 h-[40px] border rounded-xl items-center justify-center ${
              paymentMethod === "cash"
                ? "bg-[#f0f0f0] border-[#494946]"
                : "border-[#ccc]"
            }`}
            onPress={() => setPaymentMethod("cash")}
          >
            <Text className="text-lg text-black">Cash</Text>
          </Pressable>
        </View>
      </View>

      <Pressable
        className={`flex-row w-full py-[10px] bg-transparent rounded-xl border-[0.5px] border-[#494946] items-center justify-center gap-2 ${
          cart.length === 0 ? "opacity-40" : ""
        }`}
        disabled={cart.length === 0}
        onPress={() => router.push("/new-sale/receipt-preview")}
      >
        <Feather name="arrow-up-right" size={16} color="black" />
        <Text className="text-xl text-black">Preview receipt</Text>
        <Feather name="arrow-up-right" size={16} color="black" />
      </Pressable>
    </ScrollView>
  );
}
