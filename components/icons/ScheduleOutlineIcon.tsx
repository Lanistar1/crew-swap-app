import { Image, StyleSheet } from "react-native";

export function ScheduleOutlineIcon() {
  return (
    <Image
      style={styles.image}
      source={require("@/assets/icons/schedule-outline-icon.png")}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 17,
    height: 17,
  },
});
