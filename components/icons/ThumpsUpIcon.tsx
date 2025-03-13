import { Image, StyleSheet } from "react-native";

export function ThumpsUpIcon() {
  return (
    <Image
      style={styles.image}
      source={require("@/assets/icons/thumbs-up-Icon.png")}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 17,
    height: 17,
  },
});
