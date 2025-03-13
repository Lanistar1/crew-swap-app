import { Image, StyleSheet } from "react-native";

export function SettingOutlineIcon() {
  return (
    <Image
      style={styles.image}
      source={require("@/assets/icons/setting-outline-icon.png")}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 17,
    height: 17,
  },
});
