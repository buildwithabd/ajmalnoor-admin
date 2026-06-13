import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  View,
} from "react-native";

import { Text } from "@/components/typography/Text";
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
      type: itemForm.type!,
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
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.sectionContainer}>
        <Text
          style={styles.sectionLabel}
          className="text-green-400 font-inter-medium"
        >
          CUSTOMER
        </Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={[styles.input, errors.customer && styles.inputError]}
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

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>ITEM DETAILS</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            value={itemForm.name}
            onChangeText={(text) => {
              setItemForm((prev) => ({ ...prev, name: text }));
              if (errors.name) setErrors((prev) => ({ ...prev, name: false }));
            }}
            placeholder="Enter name"
          />
        </View>

        <View style={styles.typeContainer}>
          <Text style={styles.typeLabel}>Type</Text>
          <View style={styles.typeButtonsContainer}>
            {types.map((type, index) => {
              const isSelected = itemForm.type === type;
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    setItemForm((prev) => ({ ...prev, type: type }));
                  }}
                  style={[
                    styles.typeButton,
                    isSelected && styles.selectedTypeButton,
                  ]}
                >
                  <Text style={styles.typeButtonText}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {(itemForm.type === "laptop" || itemForm.type === "phone") && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>S/N</Text>
              <TextInput
                style={[styles.input, errors.sn && styles.inputError]}
                value={itemForm.sn}
                onChangeText={(text) => {
                  setItemForm((prev) => ({ ...prev, sn: text }));
                  if (errors.sn) setErrors((prev) => ({ ...prev, sn: false }));
                }}
                placeholder="Serial number"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>RAM</Text>
              <TextInput
                style={[styles.input, errors.ram && styles.inputError]}
                value={itemForm.ram}
                onChangeText={(text) => {
                  setItemForm((prev) => ({ ...prev, ram: text }));
                  if (errors.ram)
                    setErrors((prev) => ({ ...prev, ram: false }));
                }}
                placeholder="e.g 8GB DDR4"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>ROM</Text>
              <TextInput
                style={[styles.input, errors.rom && styles.inputError]}
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

        {itemForm.type === "laptop" && (
          <View style={styles.touchscreenContainer}>
            <Text style={styles.touchscreenLabel}>Touchscreen</Text>
            <Switch
              value={itemForm.touchscreen}
              onValueChange={(newValue) => {
                setItemForm((prev) => ({
                  ...prev,
                  touchscreen: newValue,
                }));
              }}
              trackColor={{ true: "#494946", false: "#ccc" }}
              thumbColor={itemForm.touchscreen ? "#494946" : "#fff"}
              style={styles.touchscreenSwitch}
            />
          </View>
        )}

        <View style={styles.numberInputContainer}>
          <View style={styles.qtyContainer}>
            <Text style={styles.qtyLabel}>Qty</Text>
            <View style={styles.qtyInputContainer}>
              <Pressable style={styles.qtyInputButton} onPress={qtyDecrement}>
                <Feather name="minus" size={12} color="black" />
              </Pressable>
              <TextInput
                style={styles.qtyInput}
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
              <Pressable style={styles.qtyInputButton} onPress={qtyIncrement}>
                <Feather name="plus" size={12} color="black" />
              </Pressable>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <View style={styles.priceLabelContainer}>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.priceLabel}>({"\u20A6"})</Text>
            </View>
            <TextInput
              style={[styles.priceInput, errors.price && styles.inputError]}
              value={itemForm.price}
              onChangeText={(number) => {
                setItemForm((prev) => ({ ...prev, price: number }));
                if (errors.price)
                  setErrors((prev) => ({ ...prev, price: false }));
              }}
              placeholder="0.00"
            />
          </View>
        </View>
      </View>

      <Pressable style={styles.cartBtn} onPress={handleAddToCart}>
        <Feather name="shopping-cart" size={16} color="black" />
        <Text style={styles.cartBtnText}>Add to cart</Text>
      </Pressable>

      <View style={styles.cartContainer}>
        <Text style={styles.cartTitle}>
          CART <Text style={styles.cartTitleCount}>({cart.length} ITEMS)</Text>
        </Text>

        <View style={styles.cartItemContainer}>
          {cart.map((item) => (
            <View style={styles.cartItem} key={item.id}>
              <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemTitle}>{item.name}</Text>
                <Text>
                  Qty {item.qty} {"\u00B7"} {item.type}
                </Text>
              </View>
              <Text style={styles.cartItemPrice}>
                {"\u20A6"}
                {(item.price * item.qty).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.cartSubTotalContainer}>
          {cart.length > 0 ? (
            <>
              <Text style={styles.cartSubTotalTitle}>Subtotal</Text>
              <Text style={styles.cartSubTotalPrice}>
                {"\u20A6"}
                {subtotal.toLocaleString()}
              </Text>
            </>
          ) : (
            <Text style={styles.cartNoItem}>No items yet</Text>
          )}
        </View>
      </View>

      <Pressable style={styles.cartBtn} onPress={handleProceedToCartReview}>
        <Text style={styles.cartBtnText}>Proceed to cart review</Text>
        <Feather name="arrow-up-right" size={16} color="black" />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    borderColor: "#dfdede",
  },
  sectionLabel: {
    fontSize: 34,
    fontWeight: "500",
    paddingTop: 14,
    paddingBottom: 8,
    paddingHorizontal: 14,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  inputContainer: {
    height: 64,
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
  },
  inputLabel: {
    width: 70,
    fontSize: 16,
    fontWeight: "medium",
    color: "#494946",
  },
  input: {
    flex: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  inputError: {
    borderColor: "#E24B4A",
    borderWidth: 1,
  },
  typeContainer: {
    paddingTop: 4,
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  typeLabel: {
    width: 70,
    fontSize: 16,
    fontWeight: "medium",
    color: "#60605e",
  },
  typeButtonsContainer: {
    height: 68,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  typeButton: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: "medium",
    color: "black",
  },
  selectedTypeButton: {
    backgroundColor: "#f0f0f0",
    color: "#fff",
  },
  touchscreenContainer: {
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
  },
  touchscreenLabel: {
    fontSize: 16,
    fontWeight: "medium",
    color: "#494946",
  },
  touchscreenSwitch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
  numberInputContainer: {
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
  qtyLabel: {
    fontSize: 16,
    fontWeight: "medium",
    color: "#494946",
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
    fontWeight: "medium",
    color: "#494946",
  },
  qtyInputButton: {
    width: 30,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
  },
  priceLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: "medium",
    color: "#494946",
    lineHeight: 16,
  },
  priceInput: {
    width: 120,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "medium",
    color: "#494946",
  },
  cartBtn: {
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
  cartBtnText: {
    fontSize: 16,
    fontWeight: "medium",
    color: "black",
  },
  cartContainer: {
    overflow: "hidden",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: "#dfdede",
  },
  cartTitle: {
    fontSize: 16,
    color: "black",
    margin: 14,
  },
  cartTitleCount: {
    fontSize: 16,
    color: "#494946",
  },
  cartItemContainer: {
    gap: 1,
  },
  cartItem: {
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "black",
  },
  cartItemDetails: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  cartItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  cartSubTotalContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  cartNoItem: {
    flex: 1,
    fontSize: 16,
    color: "#494946",
    textAlign: "center",
  },
  cartSubTotalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  cartSubTotalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});
