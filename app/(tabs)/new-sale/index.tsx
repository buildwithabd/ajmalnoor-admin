import { Pressable, ScrollView, Switch, View } from "react-native";

import { Text } from "@/components/typography/Text";
import { TextInput } from "@/components/typography/TextInput";
import { useCart } from "@/context/CartContext";
import { CartItem, FormErrors, ItemForm } from "@/types";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

const initialItemForm: ItemForm = {
  name: "",
  type: "laptop",
  sn: "",
  ram: "",
  rom: "",
  touchscreen: false,
  qty: 1,
  price: "",
};

const initialErrors: FormErrors = {
  customer: false,
  name: false,
  sn: false,
  ram: false,
  rom: false,
  price: false,
};

export default function NewSaleScreen() {
  const { customerName, setCustomerName, cart, addItem } = useCart();
  const [itemForm, setItemForm] = useState<ItemForm>(initialItemForm);
  const [errors, setErrors] = useState<FormErrors>(initialErrors);

  const router = useRouter();

  const types = ["laptop", "phone", "accessory"];

  const minQty = 1;
  const maxQty = 9999;

  const qtyIncrement = () => {
    if (itemForm.qty < maxQty) {
      setItemForm((prev) => ({ ...prev, qty: prev.qty + 1 }));
    }
  };

  const qtyDecrement = () => {
    if (itemForm.qty > minQty) {
      setItemForm((prev) => ({ ...prev, qty: prev.qty - 1 }));
    }
  };

  const handleAddToCart = () => {
    const isSpecsRequired =
      itemForm.type === "laptop" || itemForm.type === "phone";

    const newErrors: FormErrors = {
      customer: customerName.trim() === "",
      name: itemForm.name.trim() === "",
      price: itemForm.price.trim() === "" || parseFloat(itemForm.price) <= 0,
      sn: isSpecsRequired && itemForm.sn.trim() === "",
      ram: isSpecsRequired && itemForm.ram.trim() === "",
      rom: isSpecsRequired && itemForm.rom.trim() === "",
    };

    const hasErrors = Object.values(newErrors).some(Boolean);

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    const newItem: CartItem = {
      id: Date.now().toString(),
      name: itemForm.name.trim(),
      type: itemForm.type,
      qty: itemForm.qty,
      price: parseFloat(itemForm.price),
      specs: isSpecsRequired
        ? {
            sn: itemForm.sn.trim(),
            ram: itemForm.ram.trim(),
            rom: itemForm.rom.trim(),
            ...(itemForm.type === "laptop" && {
              touchscreen: itemForm.touchscreen,
            }),
          }
        : undefined,
    };

    addItem(newItem);
    setItemForm(initialItemForm);
    setErrors(initialErrors);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleProceedToCartReview = () => {
    if (cart.length === 0) return;
    router.push("/new-sale/cart-review");
  };

  return (
    <ScrollView
      className="flex-1 bg-[#faf9f5]"
      contentContainerClassName="items-center p-[14px] pb-10 gap-3"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Customer */}
      <View className="w-full bg-white rounded-2xl border-[0.5px] border-[#dfdede] overflow-hidden">
        <Text className="text-base font-['DMSans-SemiBold'] text-black pt-[14px] pb-2 px-[14px]">
          CUSTOMER
        </Text>
        <View className="h-20 border-t-[0.5px] border-t-[#ccc] flex-row items-center px-[14px]">
          <Text className="w-[70px] text-lg text-[#494946]">Name</Text>
          <TextInput
            className={`flex-1 border rounded-md px-[10px] ${
              errors.customer ? "border-[#E24B4A]" : "border-[#ccc]"
            }`}
            value={customerName}
            onChangeText={(text) => {
              setCustomerName(text);
              if (errors.customer)
                setErrors((prev) => ({ ...prev, customer: false }));
            }}
            placeholder="e.g Agboola Tomiwa"
          />
        </View>
      </View>

      {/* Item Details */}
      <View className="w-full bg-white rounded-2xl border-[0.5px] border-[#dfdede] overflow-hidden">
        <Text className="text-base font-['DMSans-SemiBold'] text-black pt-[14px] pb-2 px-[14px]">
          ITEM DETAILS
        </Text>

        {/* Name */}
        <View className="h-20 border-t-[0.5px] border-t-[#ccc] flex-row items-center px-[14px]">
          <Text className="w-[70px] text-lg text-[#494946]">Name</Text>
          <TextInput
            className={`flex-1 border rounded-md px-[10px] ${
              errors.name ? "border-[#E24B4A]" : "border-[#ccc]"
            }`}
            value={itemForm.name}
            onChangeText={(text) => {
              setItemForm((prev) => ({ ...prev, name: text }));
              if (errors.name) setErrors((prev) => ({ ...prev, name: false }));
            }}
            placeholder="Enter name"
          />
        </View>

        {/* Type */}
        <View className="border-t-[0.5px] border-t-[#ccc] pt-1 px-[14px]">
          <Text className="text-lg text-[#60605e]">Type</Text>
          <View className="h-[68px] flex-row items-center justify-center gap-[10px]">
            {types.map((type, index) => {
              const isSelected = itemForm.type === type;
              return (
                <Pressable
                  key={index}
                  onPress={() => setItemForm((prev) => ({ ...prev, type }))}
                  className={`flex-1 h-10 rounded-md border items-center justify-center ${
                    isSelected
                      ? "bg-[#f0f0f0] border-[#494946]"
                      : "border-[#ccc]"
                  }`}
                >
                  <Text className="text-lg text-black">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Specs — laptop or phone only */}
        {(itemForm.type === "laptop" || itemForm.type === "phone") && (
          <>
            <View className="h-20 border-t-[0.5px] border-t-[#ccc] flex-row items-center px-[14px]">
              <Text className="w-[70px] text-lg text-[#494946]">S/N</Text>
              <TextInput
                className={`flex-1 text-2xl border rounded-md px-[10px] ${
                  errors.sn ? "border-[#E24B4A]" : "border-[#ccc]"
                }`}
                value={itemForm.sn}
                onChangeText={(text) => {
                  setItemForm((prev) => ({ ...prev, sn: text }));
                  if (errors.sn) setErrors((prev) => ({ ...prev, sn: false }));
                }}
                placeholder="Serial number"
              />
            </View>

            <View className="h-20 border-t-[0.5px] border-t-[#ccc] flex-row items-center px-[14px]">
              <Text className="w-[70px] text-lg text-[#494946]">RAM</Text>
              <TextInput
                className={`flex-1 border rounded-md px-[10px] ${
                  errors.ram ? "border-[#E24B4A]" : "border-[#ccc]"
                }`}
                value={itemForm.ram}
                onChangeText={(text) => {
                  setItemForm((prev) => ({ ...prev, ram: text }));
                  if (errors.ram)
                    setErrors((prev) => ({ ...prev, ram: false }));
                }}
                placeholder="e.g 8GB DDR4"
              />
            </View>

            <View className="h-20 border-t-[0.5px] border-t-[#ccc] flex-row items-center px-[14px]">
              <Text className="w-[70px] text-lg text-[#494946]">ROM</Text>
              <TextInput
                className={`flex-1 border rounded-md px-[10px] ${
                  errors.rom ? "border-[#E24B4A]" : "border-[#ccc]"
                }`}
                value={itemForm.rom}
                onChangeText={(text) => {
                  setItemForm((prev) => ({ ...prev, rom: text }));
                  if (errors.rom)
                    setErrors((prev) => ({ ...prev, rom: false }));
                }}
                placeholder="e.g 512GB SSD"
              />
            </View>
          </>
        )}

        {/* Touchscreen — laptop only */}
        {itemForm.type === "laptop" && (
          <View className="border-t-[0.5px] border-t-[#ccc] flex-row items-center justify-between px-[14px]">
            <Text className="text-lg text-[#494946]">Touchscreen</Text>
            <Switch
              value={itemForm.touchscreen}
              onValueChange={(newValue) =>
                setItemForm((prev) => ({ ...prev, touchscreen: newValue }))
              }
              trackColor={{ true: "#1D9E75", false: "#ccc" }}
              thumbColor={itemForm.touchscreen ? "#fff" : "#fff"}
              style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
            />
          </View>
        )}

        {/* Qty + Price */}
        <View className="border-t-[0.5px] border-t-[#ccc] flex-row items-center justify-between px-[14px] py-3">
          {/* Qty */}
          <View className="flex-row items-center gap-2">
            <Text className="text-lg text-[#494946]">Qty</Text>
            <View className="flex-row items-center">
              <Pressable
                className="w-[30px] h-[25px] items-center justify-center rounded-md border border-[#ccc]"
                onPress={qtyDecrement}
              >
                <Feather name="minus" size={12} color="black" />
              </Pressable>
              <TextInput
                className="w-[55px] h-[50px] text-center text-[#494946]"
                value={itemForm.qty.toString()}
                onChangeText={(text) => {
                  const parsed = parseInt(text);
                  if (!isNaN(parsed) && parsed >= minQty && parsed <= maxQty) {
                    setItemForm((prev) => ({ ...prev, qty: parsed }));
                  }
                }}
                onBlur={() => {
                  if (!itemForm.qty || itemForm.qty < minQty) {
                    setItemForm((prev) => ({ ...prev, qty: minQty }));
                  }
                }}
                keyboardType="numeric"
              />
              <Pressable
                className="w-[30px] h-[25px] items-center justify-center rounded-md border border-[#ccc]"
                onPress={qtyIncrement}
              >
                <Feather name="plus" size={12} color="black" />
              </Pressable>
            </View>
          </View>

          {/* Price */}
          <View className="flex-row items-center gap-2">
            <View className="flex-col items-start">
              <Text className="text-lg text-[#494946] leading-4">Price</Text>
              <Text className="text-lg text-[#494946] leading-4">(₦)</Text>
            </View>
            <TextInput
              className={`w-[120px] border rounded-md text-center text-[#494946] ${
                errors.price ? "border-[#E24B4A]" : "border-[#ccc]"
              }`}
              value={itemForm.price}
              onChangeText={(number) => {
                setItemForm((prev) => ({ ...prev, price: number }));
                if (errors.price)
                  setErrors((prev) => ({ ...prev, price: false }));
              }}
              placeholder="0.00"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>

      {/* Add to cart button */}
      <Pressable
        className="flex-row w-full py-[10px] bg-transparent rounded-xl border-[0.5px] border-[#494946] items-center justify-center gap-2"
        onPress={handleAddToCart}
      >
        <Feather name="shopping-cart" size={16} color="black" />
        <Text className="text-xl text-black">Add to cart</Text>
      </Pressable>

      {/* Cart */}
      <View className="w-full bg-white rounded-2xl border-[0.5px] border-[#dfdede] overflow-hidden">
        <Text className="text-base font-DMSans-SemiBold text-black m-[14px]">
          CART{" "}
          <Text className="text-base text-[#494946]">
            ({cart.length} ITEMS)
          </Text>
        </Text>

        <View className="gap-[1px]">
          {cart.map((item) => (
            <View
              key={item.id}
              className="px-[14px] flex-row items-center justify-between py-3 border-b-[0.5px] border-b-black"
            >
              <View className="flex-col items-start">
                <Text className="text-base font-['DMSans-Bold'] text-black">
                  {item.name}
                </Text>
                <Text className="text-sm text-[#494946]">
                  Qty {item.qty} · {item.type}
                </Text>
              </View>
              <Text className="text-base font-['DMSans-Bold'] text-black">
                ₦{(item.price * item.qty).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        <View className="flex-row items-center justify-between px-[14px] py-3">
          {cart.length > 0 ? (
            <>
              <Text className="text-lg font-['DMSans-SemiBold'] text-black">
                Subtotal
              </Text>
              <Text className="text-lg font-['DMSans-SemiBold'] text-black">
                ₦{subtotal.toLocaleString()}
              </Text>
            </>
          ) : (
            <Text className="flex-1 text-base text-[#494946] text-center">
              No items yet
            </Text>
          )}
        </View>
      </View>

      {/* Proceed button */}
      <Pressable
        className="flex-row w-full py-[10px] bg-transparent rounded-xl border-[0.5px] border-[#494946] items-center justify-center gap-2"
        onPress={handleProceedToCartReview}
      >
        <Text className="text-xl text-black">Proceed to cart review</Text>
        <Feather name="arrow-up-right" size={16} color="black" />
      </Pressable>
    </ScrollView>
  );
}
