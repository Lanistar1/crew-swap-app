import { Image, StyleSheet } from "react-native";

export function SwapFilledIcon() {
  return (
    <Image
      style={styles.image}
      source={require("@/assets/icons/swap-filled-icon.png")}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 17,
    height: 17,
  },
});
