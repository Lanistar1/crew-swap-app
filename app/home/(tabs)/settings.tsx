import { theme } from "@/constants/theme";
// import { Home } from "@/screens/Home/Index";
import { View, Text, StyleSheet } from "react-native";

export default function Tab() {
  return (
    <View style={styles.container}>
      {/* <Home /> */}
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
