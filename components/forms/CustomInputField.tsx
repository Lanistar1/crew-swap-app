// components/forms/CustomInputField.tsx
import React, { useState, useEffect } from "react";
import { TextInput, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { theme } from "@/constants/theme";
// import { NullIcon } from "../icons/NullIcon";
// import { CheckSuccessIcon } from "../icons/CheckSuccessIcon";
// import { CheckNullIcon } from "../icons/CheckNullIcon";

interface Criteria {
  id: string;
  text: string;
  satisfied: boolean;
}

interface CustomInputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  autoComplete?:
    | "off"
    | "username"
    | "password"
    | "email"
    | "name"
    | "tel"
    | "street-address"
    | undefined; // Align with TextInputProps
  error?: string;
  resolver?: (value: string) => boolean;
  resolverCalledWhileTyping?: boolean;
  isValid?: boolean;
  setIsValid?: (value: boolean) => void;
  criteria?: Criteria[];
  disableTrailingSpaces?: boolean;
  lowercaseOnly?: boolean;
  maxLength?: number;
  disablePasswordCriteria?: boolean;
  type?: "text" | "password" | "number" | "phone";
  countryCode?: string;
}

const CustomInputField: React.FC<CustomInputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder = "",
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  autoComplete = "off",
  error,
  resolver,
  resolverCalledWhileTyping = false,
  isValid = true,
  setIsValid,
  criteria = [],
  disableTrailingSpaces = false,
  lowercaseOnly = false,
  maxLength,
  disablePasswordCriteria = false,
  type = "text",
  countryCode = "+234",
}) => {
  const [secureText, setSecureText] = useState(type === "password" && secureTextEntry);
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
    if (resolver && resolverCalledWhileTyping) {
      if (value.length <= 0) {
        setIsValid?.(true);
      } else {
        setIsValid?.(resolver(value));
      }
    }
  }, [value, resolver, resolverCalledWhileTyping, setIsValid]);

  const handleBlur = () => {
    let modifiedValue = internalValue;
    if (disableTrailingSpaces) modifiedValue = modifiedValue.trimEnd();
    if (lowercaseOnly) modifiedValue = modifiedValue.toLowerCase();
    onChangeText(modifiedValue);
    if (!resolverCalledWhileTyping && resolver) {
      setIsValid?.(resolver(modifiedValue));
    }
  };

  const handleChange = (text: string) => {
    let modifiedText = text;
    if (disableTrailingSpaces) modifiedText = modifiedText.replace(/\s+$/, "");
    if (maxLength && modifiedText.length > maxLength) modifiedText = modifiedText.slice(0, maxLength);
    setInternalValue(modifiedText);
    onChangeText(modifiedText);
  };

  const toggleSecureText = () => setSecureText(!secureText);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          !isValid && type !== "password" && styles.inputError,
          isValid && value.length > 0 && styles.inputSuccess,
        ]}
      >
        {type === "phone" && <Text style={styles.countryCode}>{countryCode}</Text>}
        <TextInput
          style={[styles.input, type === "phone" && styles.phoneInput]}
          value={internalValue}
          onChangeText={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          secureTextEntry={type === "password" && secureText}
          keyboardType={type === "number" || type === "phone" ? "numeric" : keyboardType}
          autoCapitalize={lowercaseOnly ? "none" : autoCapitalize}
          autoComplete={autoComplete}
          placeholderTextColor={theme.colors.neutrals.neutral600}
        />
        {type === "password" && (
          <TouchableOpacity onPress={toggleSecureText} style={styles.toggleButton}>
            <Text style={styles.toggleText}>{secureText ? "Show" : "Hide"}</Text>
          </TouchableOpacity>
        )}
        {/* {!isValid && type !== "password" && <NullIcon />} */}
      </View>
      {!isValid && type !== "password" && error && <Text style={styles.errorMessage}>{error}</Text>}
      {type === "password" && !disablePasswordCriteria && criteria.length > 0 && (
        <View style={styles.criteriaContainer}>
          {criteria.map((item) => (
            <View key={item.id} style={styles.criteria}>
              {/* {item.satisfied ? <CheckSuccessIcon /> : <CheckNullIcon />} */}
              <Text style={styles.criteriaText}>{item.text}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  label: {
    fontFamily: theme.fonts.InterSS01?.["400"] || "sans-serif",
    fontSize: 16,
    color: theme.colors.neutrals.neutral800,
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.neutrals.neutral800,
    borderRadius: 5,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.base.baseWhite,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    fontFamily: theme.fonts.InterSS01?.["400"] || "sans-serif",
    color: theme.colors.neutrals.neutral1000,
  },
  phoneInput: {
    marginLeft: 5,
  },
  countryCode: {
    color: theme.colors.neutrals.neutral800,
    fontSize: 16,
    fontFamily: theme.fonts.InterSS01?.["400"] || "sans-serif",
    marginRight: 5,
  },
  inputError: {
    borderColor: theme.colors.error.error200,
  },
  inputSuccess: {
    borderColor: theme.colors.success.success,
  },
  toggleButton: {
    marginLeft: 10,
  },
  toggleText: {
    color: theme.colors.neutrals.neutral800,
    fontSize: 12,
    fontFamily: theme.fonts.InterSS01?.["400"] || "sans-serif",
  },
  errorMessage: {
    fontFamily: theme.fonts.InterSS01?.["400"] || "sans-serif",
    fontSize: 12,
    color: theme.colors.error.error200,
    marginTop: 5,
  },
  criteriaContainer: {
    marginTop: 5,
  },
  criteria: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 4,
  },
  criteriaText: {
    fontSize: 10,
    color: theme.colors.neutrals.neutral600,
    fontFamily: theme.fonts.InterSS01?.["400"] || "sans-serif",
  },
});

export default CustomInputField;