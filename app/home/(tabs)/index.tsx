import { theme } from "@/constants/theme";
import { View, Text, StyleSheet } from "react-native";
import Schedule from "@/screens/Home/Schedule";

export default function Tab() {
  return (
    <View style={styles.container}>
      <Schedule />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.neutrals.neutrals150,
  },
});
