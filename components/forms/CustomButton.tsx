import React from "react";
import { Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { theme } from "@/constants/theme";

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "social";
  icon?: string; // Base64 or local image path for social buttons
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  variant = "primary",
  icon,
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case "primary":
        return styles.primaryButton;
      case "secondary":
        return styles.secondaryButton;
      case "social":
        return styles.socialButton;
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "primary":
        return styles.primaryButtonText;
      case "secondary":
        return styles.secondaryButtonText;
      case "social":
        return styles.socialButtonText;
      default:
        return styles.primaryButtonText;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      {icon && <Image source={{ uri: icon }} style={styles.icon} />}
      <Text style={[styles.buttonText, getTextStyle()]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: theme.colors.primary.primary,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: theme.colors.neutrals.neutral600,
  },
  socialButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: theme.colors.neutrals.neutral600,
  },
  buttonText: {
    fontFamily: theme.fonts.InterSS01["600"],
    fontSize: 16,
  },
  primaryButtonText: {
    color: theme.colors.base.baseWhite,
  },
  secondaryButtonText: {
    color: theme.colors.neutrals.neutral1000,
  },
  socialButtonText: {
    color: theme.colors.neutrals.neutral1000,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default CustomButton;