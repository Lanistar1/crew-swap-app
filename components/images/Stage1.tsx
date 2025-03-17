import { Image, StyleSheet } from "react-native";

export function Stage1() {
  return (
    <Image
      style={styles.image}
      source={require("@/assets/images/stage1.png")}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 330,
    height: 60,
  },
});
