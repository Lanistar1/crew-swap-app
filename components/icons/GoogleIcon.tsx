import { Image, StyleSheet } from "react-native";

export function GoogleIcon() {
  return (
    <Image
      style={styles.image}
      source={require("@/assets/icons/googleIcon.png")}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 17,
    height: 17,
  },
});
