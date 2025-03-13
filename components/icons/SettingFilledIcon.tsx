import { Image, StyleSheet } from "react-native";

export function SettingFilledIcon() {
  return (
    <Image
      style={styles.image}
      source={require("@/assets/icons/setting-filled-icon.png")}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 17,
    height: 17,
  },
});
