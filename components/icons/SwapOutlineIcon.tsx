import { Image, StyleSheet } from "react-native";

export function SwapOutlineIcon() {
  return (
    <Image
      style={styles.image}
      source={require("@/assets/icons/swap-outline-icon.png")}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 17,
    height: 17,
  },
});
