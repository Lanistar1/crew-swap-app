import Login from "@/screens/Login/Login";

import { theme } from "@/constants/theme";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>what is going on?</Text> */}
      <Login />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutrals.neutrals150,
  },
});
