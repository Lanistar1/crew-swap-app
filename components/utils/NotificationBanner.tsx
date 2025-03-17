import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Notification } from "@/context/NotificationContext";
import { theme } from "@/constants/theme";
import { AlertCircleIcon } from "../icons/AlertCircleIcon";
import { CheckIcon } from "../icons/CheckIcon";

interface NotificationBannerProps {
  notification: Notification;
  hideNotification: () => void;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({
  notification,
  hideNotification,
}) => {
  if (!notification.visible) return null;

  const isSuccess = notification.type === "success";
  const isWarning = notification.type === "warning";

  return (
    <View
      style={[
        styles.banner,
        isSuccess
          ? styles.successBackground
          : isWarning
          ? styles.warningBackground
          : styles.failureBackground,
      ]}
    >
      <View style={styles.parent}>
        <View style={styles.content}>
          <View style={styles.errorTitle}>
            {isSuccess ? <CheckIcon /> : <AlertCircleIcon />}
            <Text style={styles.title}>{notification.title}</Text>
          </View>
          {notification.tryAgain && (
            <TouchableOpacity onPress={notification.tryAgain}>
              <Text style={styles.tryAgainText}>Try Again</Text>
            </TouchableOpacity>
          )}
        </View>
        {!notification.tryAgain && (
          <TouchableOpacity
            onPress={hideNotification}
            style={styles.closeButton}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {notification.description && (
        <Text style={styles.description}>{notification.description}</Text>
      )}
    </View>
  );
};

export default NotificationBanner;

const styles = StyleSheet.create({
  banner: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
  },
  parent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  successBackground: {
    backgroundColor: "#28a745",
  },
  failureBackground: {
    backgroundColor: theme.colors.warning.warning,
  },
  warningBackground: {
    backgroundColor: theme.colors.warning.warning,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  errorTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    color: "#fff",
    fontSize: 14,
    // fontFamily: theme.fonts.BWModelicaSS01[700],
  },
  description: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
    paddingHorizontal: 25,
  },
  tryAgainText: {
    textDecorationLine: "underline",
    fontSize: 10,
    // fontFamily: theme.fonts.BWModelicaSS01[600],
    color: theme.colors.base.baseWhite,
  },
  closeButton: {
    marginLeft: 10,
  },
  closeText: {
    color: "#fff",
    fontSize: 18,
  },
});
