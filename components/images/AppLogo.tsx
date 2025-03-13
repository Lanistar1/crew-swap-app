import { Image, StyleSheet } from "react-native";

export function AppLogo() {
  return (
    <Image
      style={styles.image}
      source={require("@/assets/icons/appLogo.png")}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 210,
    height: 60,
  },
});
