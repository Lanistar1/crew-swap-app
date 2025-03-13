import { Image, StyleSheet } from "react-native";

export function AppleIcon() {
  return (
    <Image
      style={styles.image}
      source={require("@/assets/icons/appleIcon.png")}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 17,
    height: 17,
  },
});
