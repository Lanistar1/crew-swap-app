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
        options={() => ({
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
          headerBackVisible: false,
          headerShadowVisible: false,
          headerLeft: () => <AppLogo />,
          headerTitle: "",
          headerRight: () => (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                gap: 20,
                marginRight: 15,
              }}
            >
              <Pressable>{/* <CartLargeOutlineIcon /> */}</Pressable>
              <Pressable
              // onPress={() => router.push("/home/(pages)/notificaton")}
              >
                <QuestionIcon />
                <Text
                  style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    width: 15,
                    height: 15,
                    backgroundColor: theme.colors.warning.warning,
                    borderRadius: 50,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    // fontFamily: theme.fonts.BWModelicaSS01[500],
                    color: theme.colors.base.baseWhite,
                    paddingLeft: 5,
                  }}
                >
                  0
                </Text>
              </Pressable>
            </View>
          ),
          headerStyle: {
            backgroundColor: theme.colors.neutrals.neutrals150,
          },
        })}
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
          headerRight: () => (
            <Pressable onPress={() => router.push("/login")}>
              <Text
                style={{
                  color: theme.colors.warning.warning,
                  // fontFamily: theme.fonts.BWModelicaSS01[700],
                  fontSize: 12,
                  marginRight: 15,
                }}
              >
                Logout
              </Text>
            </Pressable>
          ),
          headerStyle: {
            backgroundColor: theme.colors.neutrals.neutrals150,
          },
        })}
      />

      <Tabs.Screen
        name="Settings"
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
          headerRight: () => (
            <Pressable onPress={() => router.push("/login")}>
              <Text
                style={{
                  color: theme.colors.warning.warning,
                  // fontFamily: theme.fonts.BWModelicaSS01[700],
                  fontSize: 12,
                  marginRight: 15,
                }}
              >
                Logout
              </Text>
            </Pressable>
          ),
          headerStyle: {
            backgroundColor: "#ffffff",
          },
        })}
      />
    </Tabs>
  );
}
