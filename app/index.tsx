// import React, { useEffect, useState } from "react";
// import { View, ActivityIndicator } from "react-native";
// // import { Onboarding } from "../screens/Onboarding";
// // import { OnePagerScreen } from "@/screens/OnePagerScreen";
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
//       {/* <Onboarding /> */}
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

import { View, Text } from "react-native";
import Login from "@/screens/Login/Login";
import React from "react";

const index = () => {
  return (
    <View>
      <Login />
    </View>
  );
};

export default index;
