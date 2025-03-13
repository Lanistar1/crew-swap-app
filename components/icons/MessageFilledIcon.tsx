import { Image, StyleSheet } from "react-native";

export function MessageFilledIcon() {
  return (
    <Image
      style={styles.image}
      source={require("@/assets/icons/message-filled-icon.png")}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 17,
    height: 17,
  },
});
