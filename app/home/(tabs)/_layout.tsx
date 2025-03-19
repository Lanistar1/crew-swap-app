import { globalStyles } from "@/constants/globalStyles";
import { theme } from "@/constants/theme";
import { Tabs, useRouter } from "expo-router";
import { Image, Text, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { QuestionIcon } from "@/components/icons/QuestionIcon";
import { AlertCircleIcon } from "@/components/icons/AlertCircleIcon";
import { AppLogo } from "@/components/images/AppLogo";

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary.primary,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: "#0F172A",
          shadowColor: "transparent",
          borderWidth: 0,
          elevation: 0,
          borderTopWidth: 0,
          shadowOpacity: 0,
          shadowRadius: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          color: "#BFDBFE",
          // fontFamily: theme.fonts.BWModelicaSS01[500],
          marginTop: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Schedule",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/icons/schedule-filled-icon.png")
                  : require("@/assets/icons/schedule-outline-icon.png")
              }
              style={{ width: 24, height: 24 }}
            />
          ),
          headerShown: false, // Hides the header completely
        }}
      />

      <Tabs.Screen
        name="swap"
        options={() => ({
          title: "Swap",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/icons/swap-filled-icon.png")
                  : require("@/assets/icons/swap-outline-icon.png")
              }
              style={{ width: 24, height: 24 }}
            />
          ),
          headerBackVisible: false,
          headerShadowVisible: false,
          headerLeft: () => <AppLogo />,
          headerTitle: "",
          headerRight: () => <QuestionIcon />,
          headerStyle: {
            backgroundColor: theme.colors.neutrals.neutrals150,
          },
        })}
      />

      <Tabs.Screen
        name="messages"
        options={() => ({
          title: "Messages",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/icons/message-filled-icon.png")
                  : require("@/assets/icons/message-outline-Icon.png")
              }
              style={{ width: 24, height: 24 }}
            />
          ),
          headerBackVisible: false,
          headerShadowVisible: false,
          headerLeft: () => <AppLogo />,
          headerTitle: "",
          headerRight: () => <Text></Text>,
          headerStyle: {
            backgroundColor: theme.colors.neutrals.neutrals150,
          },
        })}
      />

      <Tabs.Screen
        name="settings"
        options={() => ({
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require("@/assets/icons/setting-filled-icon.png")
                  : require("@/assets/icons/setting-outline-icon.png")
              }
              style={{ width: 24, height: 24 }}
            />
          ),
          headerBackVisible: false,
          headerShadowVisible: false,
          headerLeft: () => <AppLogo />,
          headerTitle: "",
          headerRight: () => <Text></Text>,
          headerStyle: {
            backgroundColor: theme.colors.neutrals.neutrals150,
          },
        })}
      />
    </Tabs>
  );
}
