import { View, Text, SafeAreaView, StyleSheet, Pressable } from "react-native";
import React from "react";
import { AppLogo } from "@/components/images/AppLogo";
import { ThumpsUpIcon } from "@/components/icons/ThumpsUpIcon";
import { globalStyles } from "@/constants/globalStyles";
import { theme } from "@/constants/theme";

const CompletedScreen = () => {
  const handleCompleted = () => {
    console.log("Navigate to home page");
    // other logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppLogo />
      <View style={styles.content}>
        <ThumpsUpIcon />
        <Text>You have successfully signed up for CrewSwap</Text>

        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: theme.colors.primary.primary,
            },
          ]}
          onPress={handleCompleted}
        >
          <Text
            style={[
              globalStyles.buttonText,
              {
                color: theme.colors.base.baseWhite,
              },
            ]}
          >
            See Schedule
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingTop: 30,
  },
  content: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginTop: 40,
  },
  button: {
    alignSelf: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: "60%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
export default CompletedScreen;
