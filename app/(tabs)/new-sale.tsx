import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";

import { Feather } from "@expo/vector-icons";
import { useState } from "react";

type ItemForm = {
  name: string;
  type: string | null;
  sn: string;
  ram: string;
  rom: string;
  touchscreen: boolean;
  qty: number;
  price: string;
};

export default function NewSaleScreen() {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const types = ["laptop", "phone", "accessory"];
  const initialItemForm: ItemForm = {
    name: "",
    type: null,
    sn: "",
    ram: "",
    rom: "",
    touchscreen: false,
    qty: 1,
    price: "",
  };

  const [customerName, setCustomerName] = useState("");
  const [itemForm, setItemForm] = useState<ItemForm>(initialItemForm);

  const minQty = 1;
  const maxQty = 9999;

  const qtyIncrement = () => {
    if (itemForm.qty < maxQty) {
      setItemForm((prev) => ({ ...prev, qty: itemForm.qty + 1 }));
    }
  };

  const qtyDecrement = () => {
    if (itemForm.qty > minQty) {
      setItemForm((prev) => ({ ...prev, qty: itemForm.qty - 1 }));
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>CUSTOMER</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            value={customerName}
            onChangeText={(text) => setCustomerName(text)}
            placeholder="e.g Agboola Tomiwa"
          />
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionLabel}>ITEM DETAILS</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            value={itemForm.name}
            onChangeText={(text) =>
              setItemForm((prev) => ({ ...prev, name: text }))
            }
            placeholder="Enter name"
          />
        </View>

        <View style={styles.typeContainer}>
          <Text style={styles.typeLabel}>Type</Text>
          <View style={styles.typeButtonsContainer}>
            {types.map((type, index) => {
              const isSelected = selectedType === type;
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    setSelectedType(type);
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

        {(selectedType === "laptop" || selectedType === "phone") && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>S/N</Text>
              <TextInput
                style={styles.input}
                value={itemForm.sn}
                onChangeText={(text) =>
                  setItemForm((prev) => ({ ...prev, sn: text }))
                }
                placeholder="Serial number"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>RAM</Text>
              <TextInput
                style={styles.input}
                value={itemForm.ram}
                onChangeText={(text) =>
                  setItemForm((prev) => ({ ...prev, ram: text }))
                }
                placeholder="e.g 8GB DDR4"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>ROM</Text>
              <TextInput
                style={styles.input}
                value={itemForm.rom}
                onChangeText={(text) =>
                  setItemForm((prev) => ({ ...prev, rom: text }))
                }
                placeholder="e.g 512GB SSD"
              />
            </View>
          </>
        )}

        {selectedType === "laptop" && (
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
                  setItemForm((prev) => ({
                    ...prev,
                    qty: isNaN(parsed) ? 1 : parsed,
                  }));
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
              style={styles.priceInput}
              value={itemForm.price}
              onChangeText={(number) =>
                setItemForm((prev) => ({ ...prev, price: number }))
              }
              placeholder="0.00"
            />
          </View>
        </View>
      </View>

      <Pressable style={styles.cartBtn}>
        <Feather name="shopping-cart" size={16} color="black" />
        <Text style={styles.cartBtnText}>Add to cart</Text>
      </Pressable>

      <View style={styles.cartContainer}>
        <Text style={styles.cartTitle}>
          CART <Text style={styles.cartTitleCount}>(0 ITEMS)</Text>
        </Text>

        <View style={styles.cartItemContainer}>
          <View style={styles.cartItem}>
            <View style={styles.cartItemDetails}>
              <Text style={styles.cartItemTitle}>iPhone 15 Pro Max</Text>
              <Text>Qty 1 {"\u00B7"} Phone</Text>
            </View>
            <Text style={styles.cartItemPrice}>{"\u20A6"}1,400,000.00</Text>
          </View>

          <View style={styles.cartItem}>
            <View style={styles.cartItemDetails}>
              <Text style={styles.cartItemTitle}>Dell Latitude 5480</Text>
              <Text>Qty 2 {"\u00B7"} Laptop</Text>
            </View>
            <Text style={styles.cartItemPrice}>{"\u20A6"}450,000.00</Text>
          </View>
        </View>

        <View style={styles.cartSubTotalContainer}>
          <Text style={styles.cartSubTotalTitle}>Subtotal</Text>
          <Text style={styles.cartSubTotalPrice}>{"\u20A6"}1,850,000.00</Text>
        </View>
      </View>

      <Pressable style={styles.cartBtn}>
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
    fontSize: 14,
    fontWeight: "500",
    color: "#4e4e4b",
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
