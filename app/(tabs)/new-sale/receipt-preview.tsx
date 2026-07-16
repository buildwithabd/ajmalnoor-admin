import "../../../global.css";

import { Pressable, ScrollView, View } from "react-native";

import { Text } from "@/components/typography/Text";
import { TextMono } from "@/components/typography/TextMono";
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
          <Text style={{ fontSize: 18, fontWeight: "500" }}>
            Receipt preview
          </Text>
        </View>
      ),
    });
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-[#faf9f5]"
      contentContainerClassName="items-center p-[14px] pb-10 gap-3"
    >
      <View className="w-full bg-white rounded-2xl border-[0.25px] border-gray-700 py-5 overflow-hidden">
        <View className="items-center pb-4 border-b-[0.25px] border-gray-600 gap-[2px]">
          <TextMono className="text-[1.375rem]">AJMAL NOOR</TextMono>
          <TextMono>123 Tech Street, Lagos</TextMono>
          <TextMono>Tel: +234 800 000 0000</TextMono>
        </View>

        <View className="px-[14px] py-[12px]">
          <View className="flex-row justify-between gap-[2px]">
            <TextMono className="bg-white">Date</TextMono>
            <TextMono>07/06/2026</TextMono>
          </View>
          <View className="flex-row justify-between">
            <TextMono>Time</TextMono>
            <TextMono>09:58 AM</TextMono>
          </View>
          <View className="flex-row justify-between">
            <TextMono>Receipt #</TextMono>
            <TextMono>00149</TextMono>
          </View>
        </View>

        <View className="px-[14px] py-2 text-[0.875rem] border-dashed border-[0.25px] border-gray-600">
          <TextMono>Customer: {customerName}</TextMono>
        </View>

        <View className="flex-row px-[14px] py-2 border-b-[0.25px] border-gray-400">
          <TextMono className="flex-1 text-sm">Item</TextMono>
          <TextMono className="w-[36px] text-sm text-center">Qty</TextMono>
          <TextMono className="w-[90px] text-sm text-right">Total</TextMono>
        </View>

        <View className="px-[14px] py-[8px] border-b-[0.25px] border-gray-600">
          {cart.map((item) => (
            <View
              key={item.id}
              className={`py-[10px] ${item.id !== cart[0].id && "border-t-[0.25px] border-dashed border-gray-600"}`}
            >
              <View className="flex-row">
                <TextMono className="flex-1 text-lg">{item.name}</TextMono>
                <TextMono className="w-[36px] text-lg text-center">
                  {item.qty}
                </TextMono>
                <TextMono className="w-[90px] text-lg text-right">
                  {(item.price * item.qty).toLocaleString()}
                </TextMono>
              </View>
              {item.specs && (
                <View className="bg-[#f5f4ed] rounded-lg p-[8px] gap-[2px] mt-2">
                  {item.specs?.sn && (
                    <View className="flex-row gap-1">
                      <TextMono className="w-[55px] text-sm text-[#1d1d1c]">
                        S/N
                      </TextMono>
                      <TextMono className="text-sm text-[#1b1b1a]">
                        {item.specs?.sn}
                      </TextMono>
                    </View>
                  )}

                  {item.specs?.ram && (
                    <View className="flex-row gap-1">
                      <TextMono className="w-[55px] text-sm text-[#1d1d1c]">
                        RAM
                      </TextMono>
                      <TextMono className="text-sm text-[#1b1b1a]">
                        {item.specs?.ram}
                      </TextMono>
                    </View>
                  )}

                  {item.specs?.rom && (
                    <View className="flex-row gap-1">
                      <TextMono className="w-[55px] text-sm text-[#1d1d1c]">
                        ROM
                      </TextMono>
                      <TextMono className="text-sm text-[#1b1b1a]">
                        {item.specs?.rom}
                      </TextMono>
                    </View>
                  )}

                  {item.specs?.touchscreen && (
                    <View className="flex-row gap-1">
                      <TextMono className="w-[55px] text-sm text-[#1d1d1c]">
                        Touch
                      </TextMono>
                      <TextMono className="text-sm text-[#1b1b1a]">
                        Touchscreen
                      </TextMono>
                    </View>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>

        <View className="px-[14px] py-[12px] gap-2">
          <View className="flex-row justify-between">
            <TextMono>Subtotal</TextMono>
            <TextMono>
              {"\u20A6"}
              {subtotal.toLocaleString()}
            </TextMono>
          </View>
          <View className="h-[0.25px] bg-gray-600" />
          <View className="flex-row justify-between">
            <TextMono className="text-lg">TOTAL</TextMono>
            <TextMono className="text-lg">
              {"\u20A6"}
              {subtotal.toLocaleString()}
            </TextMono>
          </View>
        </View>

        <View className="items-center py-5 gap-3 border-dashed border-[0.25px] border-gray-600">
          <TextMono className="text-sm">Scan to verify this receipt</TextMono>
          <TextMono className="text-sm">ajmalnoor.com/verify/00149</TextMono>
        </View>

        <View className="px-[14px] pt-4 pb-3 gap-3 items-center">
          <TextMono className="text-sm">Thank you for your purchase!</TextMono>
          <View className="h-[0.25px] border-t-[0.25px] border-dashed border-gray-600" />
          <View className="items-center gap-2">
            <TextMono className="text-sm">Scan to verify this receipt</TextMono>
            <TextMono className="text-sm">ajmalnoor.com/verify/00149</TextMono>
          </View>
        </View>
      </View>

      <View className="gap-3">
        <Pressable
          className="flex-row items-center justify-center"
          style={{
            borderColor: "grey",
            borderWidth: 1,
            borderRadius: 10,
            height: 44,
          }}
        >
          <Text className="text-[16px]">Confirm & Print</Text>
        </Pressable>

        <View className="w-full flex-row justify-between items-center gap-3">
          <Pressable
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderColor: "grey",
              borderWidth: 1,
              borderRadius: 10,
              height: 64,
              paddingHorizontal: 20,
            }}
          >
            <Text className="text-[16px]">Share via WhatsApp</Text>
          </Pressable>
          <Pressable
            style={{
              flex: 1,
              justifyContent: "center",
              borderColor: "grey",
              borderWidth: 1,
              borderRadius: 10,
              height: 64,
              paddingHorizontal: 20,
            }}
          >
            <Text className="text-[16px]">Save PDF</Text>
          </Pressable>
        </View>

        <Pressable>
          <Text>Done view in history</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
