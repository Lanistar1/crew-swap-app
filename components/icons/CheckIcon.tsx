import { Image, StyleSheet } from "react-native";

export function CheckIcon() {
  return (
    <Image style={styles.image} source={require("@/assets/icons/check.png")} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 16,
    height: 16,
  },
});
