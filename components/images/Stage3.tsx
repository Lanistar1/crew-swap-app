import { Image, StyleSheet } from "react-native";

export function Stage3() {
  return (
    <Image
      style={styles.image}
      source={require("@/assets/images/stage3.png")}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 330,
    height: 60,
  },
});
