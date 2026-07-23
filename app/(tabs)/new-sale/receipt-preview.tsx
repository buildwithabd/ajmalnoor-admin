import "../../../global.css";

import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import * as Print from "expo-print";
import { useNavigation, useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import { ArrowUpRight, Printer } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Alert, Pressable, ScrollView, Share, View } from "react-native";
import QRCode from "react-native-qrcode-svg";

import { Text } from "@/components/typography/Text";
import { TextMono } from "@/components/typography/TextMono";
import { useCart } from "@/context/CartContext";

export default function ReceiptPreviewScreen() {
  const { cart, customerName, paymentMethod, clearCart } = useCart();
  const router = useRouter();
  const navigation = useNavigation();

  // Use a sequential matching fallback string from your visual mockup
  const receiptNumber = useRef("00149").current;

  const now = new Date();
  const date = "07/06/2026"; // Hardcoded values from your custom layout mockup
  const time = "09:58";

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const [qrBase64, setQrBase64] = useState<string | null>(null);
  let qrRef = useRef<any>(null);

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

  const handleQRRef = (c: any) => {
    if (c && !qrBase64) {
      qrRef.current = c;
      qrRef.current.toDataURL((data: string) => {
        setQrBase64(data);
      });
    }
  };

  // Helper macro helper to inject layout dynamic item arrays directly into standard HTML structures safely
  const generateHTMLTemplate = () => {
    const itemsRows = cart
      .map(
        (item) => `
      <div>
        <div style="display: flex; justify-content: space-between; font-size: 15px; font-weight: bold;">
          <span style="flex: 1; text-align: left;">${item.name}</span>
          <span style="width: 40px; text-align: center;">${item.qty}</span>
          <span style="width: 90px; text-align: right;">${(item.price * item.qty).toLocaleString(undefined, { minimumFractionDigits: 0 })}</span>
        </div>
        ${
          item.specs
            ? `
          <div style="background-color: #f5f4ed; border-radius: 6px; padding: 6px 10px; margin-top: 4px; font-size: 12px; color: #1d1d1c; display: flex; flex-direction: column; gap: 2px;">
            ${item.specs.sn ? `<div><span style="display: inline-block; width: 45px; color: #666;">S/N</span> <span>${item.specs.sn}</span></div>` : ""}
            ${item.specs.ram ? `<div><span style="display: inline-block; width: 45px; color: #666;">RAM</span> <span>${item.specs.ram}</span></div>` : ""}
            ${item.specs.rom ? `<div><span style="display: inline-block; width: 45px; color: #666;">ROM</span> <span>${item.specs.rom}</span></div>` : ""}
            ${item.specs.touchscreen ? `<div><span style="display: inline-block; width: 45px; color: #666;">Touch</span> <span>Touchscreen</span></div>` : ""}
          </div>
        `
            : ""
        }
      </div>
    `,
      )
      .join("");

    const qrImageSrc = qrBase64
      ? `data:image/png;base64,${qrBase64}`
      : `https://qrserver.com{receiptNumber}`;

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <style>
            @page { size: 80mm auto; margin: 0; }


            body {
              font-family: 'Courier New', Courier, monospace;
              color: #000000;
              background-color: #ffffff;
              margin: 0;
              padding: 0;
              font-size: 15px;
            }
            .container {
              width: 100%;
              max-width: 280px;
              margin: 0 auto;
              padding: 0 10px;
              box-sizing: border-box;
            }
            .header {
              text-align: center;
              padding: 16px 0 12px;
              border-bottom: 0.25px solid #000000;
              margin-bottom: 10px;
            }
            .company-name {
              font-size: 18px;
              font-weight: bold;
              margin: 0 0 4px 0;
              letter-spacing: 1px;
            }
            .company-meta {
              font-size: 13px;
              margin: 2px 0;
              color: #333;
            }
            .meta-section {
              font-size: 12px;
              padding: 8px 10px;
              display: flex;
              flex-direction: column;
              gap: 3px;
            }
              
            .row-justify {
              display: flex;
              justify-content: space-between;
            }
            .customer-banner {
              font-size: 12px;
              padding: 10px;
              border-top: 0.5px dashed #9ca3af;
              border-bottom: 0.5px dashed #9ca3af;
            }

            .table-header {
              display: flex;
              font-size: 11px;
              font-weight: bold;
              padding: 8px 0;
              margin: 0 10px;
              border-bottom: 0.25px solid #c4c4c4;
              letter-spacing: 0.3px;
            }
            .items-container {
              border-bottom: 0.25px solid #c4c4c4;
              padding: 15px 10px;
            }

            .totals-section {
              font-size: 12px;
              display: flex;
              flex-direction: column;
              gap: 5px;
              padding: 12px 10px;
              border-bottom: 0.5px dashed #9ca3af;
            }
            .divider {
              border-top: 0.5px solid #c4c4c4;
            }
            .dashed-divider {
              border-bottom: 0.5px dashed #9ca3af;
            }
            .subtotal-row {
              font-size: 14px;
              font-weight: medium;
            }
            .total-row {
              font-size: 16px;
              font-weight: bold;
            }

            .payment-section {
              font-size: 12px;
              display: flex;
              flex-direction: column;
              gap: 3px;
              padding: 10px;
              border-bottom: 0.5px dashed #9ca3af;
            }
            
            .qr-section {
              text-align: center;
              padding: 10px 0;
              border-bottom: 0.5px dashed #9ca3af;
              margin-bottom: 10px;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 6px;
            }
            .qr-label {
              font-size: 11px;
              color: #555;
            }
            .qr-url {
              font-size: 10px;
              color: #333;
            }
            .footer-banner {
              text-align: center;
              font-size: 11px;
              padding: 8px 10px;
              display: flex;
              flex-direction: column;
              gap: 8px;
              color: #333;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="company-name">AJMAL NOOR</h1>
              <p class="company-meta">123 Tech Street, Lagos</p>
              <p class="company-meta">Tel: +234 800 000 0000</p>
            </div>
            
            <div class="meta-section">
              <div class="row-justify">
                <div>
                  <span>Date: </span><span>${date}</span>
                </div>
                <div><span>Time: </span><span>${time}</span></div>
              </div>
              <div><span>Receipt #</span><span>${receiptNumber}</span></div>
            </div>

            <div class="customer-banner">
              Customer: ${customerName}
            </div>

            <div class="table-header">
              <span style="flex: 1;">Item</span>
              <span style="width: 40px;text-align: center;">Qty</span>
              <span style="width: 90px; text-align: right;">Total</span>
            </div>

            <div class="items-container">
              ${itemsRows}
            </div>

            <div class="totals-section">
              <div class="row-justify subtotal-row">
                <span>Subtotal</span>
                <span>&#8358;${subtotal.toLocaleString(undefined, { minimumFractionDigits: 0 })}</span>
              </div>
              <div class="divider"></div>
              <div class="row-justify total-row">
                <span>TOTAL</span>
                <span>&#8358;${subtotal.toLocaleString(undefined, { minimumFractionDigits: 0 })}</span>
              </div>
            </div>

            <div class="payment-section">
              <div class="row-justify">
                <span>Payment</span>
                <span>${paymentMethod === "cash" ? "Cash" : "Transfer"}</span>
              </div>
            </div>

            <div class="qr-section">
              <span class="qr-label">Scan to verify this receipt</span>
              <img 
                src="${qrImageSrc}" 
                width="80" 
                height="80"
              />
              <span class="qr-url">ajmalnoor.com/verify-receipt/${receiptNumber}</span>
            </div>

            <div class="footer-banner">
              <div>Thank you for your purchase!</div>
              <div class="dashed-divider"></div>
              <div>7-day return &nbsp;|&nbsp; 3-month warranty</div>
              <div>Keep this receipt as proof of purchase</div>
            </div>
          </div>
        </body>
      </html>
    `;
  };

  // CTA Native Implementations
  const handleConfirmAndPrint = async () => {
    try {
      const html = generateHTMLTemplate();
      await Print.printAsync({
        html,
        width: 150,
      });
    } catch (error) {
      Alert.alert("Print Error", "Could not complete printing operation.");
    }
  };

  const handleShareViaWhatsApp = async () => {
    try {
      const inlineItems = cart
        .map(
          (i) =>
            `_x${i.qty}_ *${i.name}* - ₦${(i.price * i.qty).toLocaleString()}`,
        )
        .join("\n");
      const textMessage = `*AJMAL NOOR RECEIPT*\n---------------------------\n*Date:* ${date}\n*Receipt #:* ${receiptNumber}\n*Customer:* ${customerName || "John Adebayo"}\n\n*Items Ordered:*\n${inlineItems}\n\n---------------------------\n*TOTAL: ₦${subtotal.toLocaleString()}*\n\nVerify order path at: https://ajmalnoor.com/verify-receipt/${receiptNumber}`;

      await Share.share({
        message: textMessage,
      });
    } catch (error) {
      Alert.alert(
        "Share Error",
        "Failed to open native application sharing drawer.",
      );
    }
  };

  const handleSaveAsPDF = async () => {
    try {
      const html = generateHTMLTemplate();
      const { uri } = await Print.printToFileAsync({ html });

      await Sharing.shareAsync(uri, {
        mimeType: "application/pdf",
        dialogTitle: `Receipt-${receiptNumber}`,
        UTI: "com.adobe.pdf",
      });
    } catch (error) {
      Alert.alert(
        "PDF Storage Error",
        "Failed to parse receipt layout elements into local file storage context.",
      );
    }
  };

  const handleDoneHistory = () => {
    clearCart();
    router.dismissAll();
    router.replace("/history");
  };

  return (
    <ScrollView
      className="flex-1 bg-[#faf9f5]"
      contentContainerClassName="items-center p-[14px] pb-10 gap-3"
    >
      {/* Hidden layout utility rendering the QR matrix engine safely completely off-screen */}
      <View
        style={{ position: "absolute", top: -1000, left: -1000, opacity: 0 }}
      >
        <QRCode
          value={`https://ajmalnoor.com/verify-receipt/${receiptNumber}`}
          size={100}
          getRef={(c) => {
            if (c && !qrBase64) {
              qrRef.current = c;
              // Minor timeout threshold prevents iOS and Android background canvas rendering race conditions
              setTimeout(() => {
                qrRef.current?.toDataURL((data: string) => {
                  setQrBase64(data);
                });
              }, 150);
            }
          }}
        />
      </View>

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
          <TextMono className="text-sm">
            ajmalnoor.com/verify-receipt/00149
          </TextMono>
        </View>

        <View className="px-[14px] pt-4 pb-3 gap-3 items-center">
          <TextMono className="text-sm">Thank you for your purchase!</TextMono>
          <View className="h-[0.25px] border-t-[0.25px] border-dashed border-gray-600" />
          <View className="items-center gap-2">
            <TextMono className="text-sm">
              7-day return &nbsp;|&nbsp; 3-month warranty
            </TextMono>
            <TextMono className="text-sm">
              Keep this receipt as proof of purchase
            </TextMono>
          </View>
        </View>
      </View>

      <View className="gap-3">
        <Pressable
          onPress={handleConfirmAndPrint}
          className="flex-row items-center justify-center gap-3"
          style={{
            borderColor: "grey",
            borderWidth: 1,
            borderRadius: 10,
            height: 44,
          }}
        >
          <Printer size={20} />
          <Text className="text-[16px]">Confirm & Print</Text>
        </Pressable>

        <View className="w-full flex-row justify-between items-center gap-3">
          <Pressable
            onPress={handleShareViaWhatsApp}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 20,
              borderColor: "grey",
              borderWidth: 1,
              borderRadius: 10,
              height: 64,
            }}
          >
            <FontAwesome5 name="whatsapp" size={20} />
            <Text
              className="text-[16px]"
              style={{
                width: 80,
              }}
            >
              Share via WhatsApp
            </Text>
          </Pressable>
          <Pressable
            onPress={handleSaveAsPDF}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              borderColor: "grey",
              borderWidth: 1,
              borderRadius: 10,
              height: 64,
              paddingHorizontal: 20,
            }}
          >
            <FontAwesome6 name="file-pdf" size={20} />
            <Text className="text-[16px]">Save PDF</Text>
          </Pressable>
        </View>

        <Pressable
          onPress={handleDoneHistory}
          className="flex-row items-center justify-center gap-2"
          style={{
            borderColor: "grey",
            borderWidth: 1,
            borderRadius: 10,
            height: 44,
          }}
        >
          <Text className="text-[16px]">Done — view in history</Text>
          <ArrowUpRight size={20} />
        </Pressable>
      </View>
    </ScrollView>
  );
}
