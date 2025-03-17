import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CompletedScreen from "@/screens/Onboarding/CompletedScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <CompletedScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.neutrals.neutrals150,
  },
});
