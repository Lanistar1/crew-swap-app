import { Image, StyleSheet } from "react-native";

export function MessageOutlineIcon() {
  return (
    <Image
      style={styles.image}
      source={require("@/assets/icons/message-outline-Icon.png")}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 17,
    height: 17,
  },
});
