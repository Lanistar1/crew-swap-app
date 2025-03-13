// app/index.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import CustomInputField from "@/components/forms/CustomInputField";
import { theme } from "@/constants/theme";
import { useRouter } from "expo-router";
import { AppLogo } from "@/components/images/AppLogo";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { AppleIcon } from "@/components/icons/AppleIcon";
import { globalStyles } from "@/constants/globalStyles";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleLogin = () => {
    console.log("Login attempted with:", { email, password });
    // Add login logic here
  };

  const handleGoogleLogin = () => {
    console.log("Google login attempted");
    // Add Google login logic here
  };

  const handleAppleLogin = () => {
    console.log("Apple login attempted");
    // Add Apple login logic here
  };

  // Email validation resolver
  const emailResolver = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  // Password criteria based on password state
  // const passwordCriteria = [
  //   { id: "1", text: "At least 8 characters", satisfied: password.length >= 8 },
  //   { id: "2", text: "One uppercase letter", satisfied: /[A-Z]/.test(password) },
  //   { id: "3", text: "One number", satisfied: /\d/.test(password) },
  // ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <AppLogo />
        <Text style={styles.subtitle}>Login</Text>

        <CustomInputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoComplete="email" // Updated to match TextInputProps
          resolver={emailResolver}
          resolverCalledWhileTyping={true}
          isValid={isEmailValid}
          setIsValid={setIsEmailValid}
          error={!isEmailValid ? "Please enter a valid email" : undefined}
          type="text"
        />
        <CustomInputField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          type="password"
          autoComplete="password" // Updated to match TextInputProps
          isValid={isPasswordValid}
          setIsValid={setIsPasswordValid}
          error={
            !isPasswordValid ? "Password does not meet criteria" : undefined
          }
        />

        <Pressable
          onPress={() => router.push("/reset-password")}
          style={styles.forgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </Pressable>

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
            Login
          </Text>
        </Pressable>

        <Text style={styles.orText}>OR</Text>

        <Pressable
          style={[
            globalStyles.button,
            styles.buttonStyle,
            {
              borderColor: theme.colors.tertiary.tertiary,
            },
          ]}
          onPress={handleGoogleLogin}
        >
          <View style={styles.buttonContainer}>
            <GoogleIcon />
            <Text
              style={[
                globalStyles.buttonText,
                {
                  color: theme.colors.base.baseBlack,
                },
              ]}
            >
              Continue with Google
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={[
            globalStyles.button,
            styles.buttonStyle,
            {
              borderColor: theme.colors.tertiary.tertiary,
            },
          ]}
          onPress={handleAppleLogin}
        >
          <View style={styles.buttonContainer}>
            <AppleIcon />
            <Text
              style={[
                globalStyles.buttonText,
                {
                  color: theme.colors.base.baseBlack,
                },
              ]}
            >
              Continue with Apple
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => router.replace("./signup")}
          style={styles.signUpLink}
        >
          <Text style={styles.signUpText}>
            You don’t have an account?{" "}
            <Text style={styles.signUpHighlight}>Sign Up</Text>
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  container: {
    width: "90%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontFamily: theme.fonts.InterSS01[600],
    fontSize: 40,
    color: theme.colors.neutrals?.neutral900 || "#000000",
  },
  titleHighlight: {
    color: theme.colors.error?.error200 || "#FF8955",
  },
  subtitle: {
    fontFamily: theme.fonts.InterSS01[600],
    fontSize: 24,
    color: theme.colors.neutrals?.neutral900 || "#000000",
    marginVertical: 20,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    fontFamily: theme.fonts.InterSS01[400],
    fontSize: 14,
    color: theme.colors.primary?.primary,
  },
  orText: {
    fontFamily: theme.fonts.InterSS01[400],
    fontSize: 16,
    color: theme.colors.neutrals?.neutral900 || "#000000",
    marginVertical: 10,
  },
  signUpLink: {
    marginTop: 20,
  },
  signUpText: {
    fontFamily: theme.fonts.InterSS01[400],
    fontSize: 14,
    color: theme.colors.neutrals?.neutral900 || "#000000",
  },
  signUpHighlight: {
    color: theme.colors.primary?.primary,
  },
  buttonStyle: {
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
});

export default Login;
