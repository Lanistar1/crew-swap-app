import { Image, StyleSheet } from "react-native";

export function ScheduleFilledIcon() {
  return (
    <Image
      style={styles.image}
      source={require("@/assets/icons/schedule-filled-icon.png")}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 17,
    height: 17,
  },
});
