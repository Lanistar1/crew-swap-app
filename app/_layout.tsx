import { theme } from "@/constants/theme";
import { LoadingProvider } from "@/context/LoadingContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NotificationProvider } from "@/context/NotificationContext";
import "react-native-reanimated";
import { ScrollView, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter18Black: require("../assets/fonts/inter/Inter_18pt-Black.ttf"),
    Inter18BlackItalic: require("../assets/fonts/inter/Inter_18pt-BlackItalic.ttf"),
    Inter18Bold: require("../assets/fonts/inter/Inter_18pt-Bold.ttf"),
    Inter18Light: require("../assets/fonts/inter/Inter_18pt-Light.ttf"),
    Inter18Medium: require("../assets/fonts/inter/Inter_18pt-Medium.ttf"),
    Inter18Regular: require("../assets/fonts/inter/Inter_18pt-Regular.ttf"),
    Inter18SemiBold: require("../assets/fonts/inter/Inter_18pt-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <GestureHandlerRootView>
        <StatusBar
          backgroundColor={theme.colors.neutrals.neutrals150}
          style={"dark"}
        />

        <LoadingProvider>
          <NotificationProvider>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
          </NotificationProvider>
        </LoadingProvider>
      </GestureHandlerRootView>
    </ScrollView>
  );
}
