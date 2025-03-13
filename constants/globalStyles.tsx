import { StyleSheet } from "react-native";
import { theme } from "./theme";

export const globalStyles = StyleSheet.create({
  button: {
    alignSelf: "center",
    paddingVertical: 15,
    width: "60%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 14,
    // fontFamily: theme.fonts.InterSS01[600],
  },
});
