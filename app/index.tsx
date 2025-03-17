// import React, { useEffect, useState } from "react";
// import { View, ActivityIndicator } from "react-native";
// // import { Onboarding } from "../screens/Onboarding";
// // import { OnePagerScreen } from "@/screens/OnePagerScreen";
// import Login from "@/screens/Login/Login";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { StyleSheet } from "react-native";
// import { useNotification } from "@/context/NotificationContext";

// export default function App() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [completedOnboarding, setCompletedOnboarding] = useState(false);
//   const [token, setToken] = useState<string | null>(null);
//   const { showNotification } = useNotification();

//   useEffect(() => {
//     const checkAsyncStorage = async () => {
//       try {
//         const onboardingStatus = await AsyncStorage.getItem(
//           "completedOnboarding"
//         );
//         const userToken = await AsyncStorage.getItem("token");

//         setCompletedOnboarding(onboardingStatus === "yes");
//         setToken(userToken);
//       } catch (error) {
//         showNotification("Error accessing details", "", "warning");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     checkAsyncStorage();
//   }, []);

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (token) {
//     // return <OnePagerScreen />;
//   }

//   if (completedOnboarding) {
//     // return <OnePagerScreen />;
//   }

//   return (
//     <View style={styles.container}>
//       <Login />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
// });

import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { globalStyles } from "@/constants/globalStyles";
import { useRouter } from "expo-router";
import { theme } from "@/constants/theme";

const index = () => {
  const router = useRouter();

  const handleLogin = async () => {
    console.log("Login attempted with:");
    router.push("/(auth)/login");
    // Add login logic here
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          globalStyles.button,
          {
            backgroundColor: theme.colors.primary.primary,
          },
        ]}
        onPress={handleLogin}
      >
        <Text
          style={[
            globalStyles.buttonText,
            {
              color: theme.colors.base.baseWhite,
            },
          ]}
        >
          Get started
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
});

export default index;
