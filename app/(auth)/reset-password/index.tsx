// import CallPage from "@/screens/Tasks/CallPage";
import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native"

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Good</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutrals.neutrals150,
  },
});
