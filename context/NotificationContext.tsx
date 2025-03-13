import NotificationBanner from "@/components/utils/NotificationBanner";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";

type NotificationType = "success" | "failure" | "warning";

export interface Notification {
  title: string;
  description: string;
  type: NotificationType;
  visible: boolean;
  tryAgain?: () => void;
}

interface NotificationContextType {
  notification: Notification;
  showNotification: (
    title: string,
    description: string,
    type?: NotificationType,
    tryAgain?: () => void,
    timeout?: number
  ) => void;
  hideNotification: () => void;
}

const defaultNotification: Notification = {
  title: "",
  description: "",
  type: "success",
  visible: false,
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] =
    useState<Notification>(defaultNotification);
  const fadeValue = useSharedValue(0);

  const showNotification = (
    title: string,
    description: string,
    type: NotificationType = "success",
    tryAgain?: () => void,
    timeout: number = 2000
  ) => {
    setNotification({ title, description, type, visible: true, tryAgain });
    fadeValue.value = withTiming(1, { duration: 300 });

    setTimeout(() => {
      hideNotification();
    }, timeout);
  };

  const hideNotification = () => {
    fadeValue.value = withTiming(0, { duration: 300 });
    setTimeout(() => {
      setNotification({ ...notification, visible: false });
    }, 300);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeValue.value,
  }));

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, hideNotification }}
    >
      {children}
      {notification.visible && (
        <View style={StyleSheet.absoluteFill}>
          <View style={styles.container}>
            <Animated.View style={[styles.notification, animatedStyle]}>
              <NotificationBanner
                notification={notification}
                hideNotification={hideNotification}
              />
            </Animated.View>
          </View>
        </View>
      )}
    </NotificationContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1000,
  },
  notification: {
    width: "90%",
  },
});

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};
