import { Image, StyleSheet } from "react-native";

export function AppLogo2() {
  return (
    <Image
      style={styles.image}
      source={require("@/assets/icons/appLogo.png")}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 50,
  },
});
