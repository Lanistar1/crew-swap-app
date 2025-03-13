import { Image, StyleSheet } from "react-native";

export function AlertCircleIcon() {
  return (
    <Image
      style={styles.image}
      source={require("@/assets/icons/alert-circle.png")}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 23,
    height: 23,
  },
});
