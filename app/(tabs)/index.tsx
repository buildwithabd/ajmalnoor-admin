import { StyleSheet, View } from "react-native";

import { Text } from "@/components/typography/Text";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text>Dashboard</Text>
      <View style={styles.separator} />

      <View style={{ padding: 20, gap: 10 }}>
        <Text style={{ fontFamily: "DMSans-Regular", fontSize: 18 }}>
          Regular — The quick brown fox
        </Text>
        <Text style={{ fontFamily: "DMSans-Medium", fontSize: 18 }}>
          Medium — The quick brown fox
        </Text>
        <Text style={{ fontFamily: "DMSans-SemiBold", fontSize: 18 }}>
          SemiBold — The quick brown fox
        </Text>
        <Text style={{ fontFamily: "DMSans-Bold", fontSize: 18 }}>
          Bold — The quick brown fox
        </Text>
        <Text className="font-dm text-lg">Bold — The quick brown fox</Text>
        <Text className="font-dmMedium text-lg">
          Medium — The quick brown fox
        </Text>
        <Text className="font-dmSemi text-3xl text-cyan-600 ">
          SemiBold — The quick brown foxg
        </Text>

        <Text className="text-red-500 text-3xl bg-green-700">Test listing</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
