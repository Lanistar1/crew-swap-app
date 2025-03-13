import { Image, StyleSheet } from "react-native";

export function QuestionIcon() {
  return (
    <Image
      style={styles.image}
      source={require("@/assets/icons/questionIcon.png")}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 17,
    height: 17,
  },
});
