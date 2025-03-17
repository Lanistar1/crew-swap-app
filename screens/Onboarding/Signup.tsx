import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import CustomInputField from "@/components/forms/CustomInputField";
import DropdownModal from "@/components/forms/DropdownModal";
import CustomCalendar from "@/components/forms/CustomCalendar";
import CheckBox from "expo-checkbox";
import { theme } from "@/constants/theme";
import { useRouter } from "expo-router";
import { AppLogo } from "@/components/images/AppLogo";
import { globalStyles } from "@/constants/globalStyles";
import { Stage1 } from "@/components/images/Stage1";
import { Stage2 } from "@/components/images/Stage2";
import { Stage3 } from "@/components/images/Stage3";

const Signup = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1); // Track the current step

  // Step 1: Sign Up fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  // Step 2: Profile fields
  const [displayName, setDisplayName] = useState("");
  const [baseAirport, setBaseAirport] = useState("");
  const [airline, setAirline] = useState("");
  const [role, setRole] = useState("");
  const [isDisplayNameValid, setIsDisplayNameValid] = useState(true);
  const [isBaseAirportValid, setIsBaseAirportValid] = useState(true);
  const [isAirlineValid, setIsAirlineValid] = useState(true);
  const [isRoleValid, setIsRoleValid] = useState(true);

  // Step 3: Preferences and Dates fields
  const [preferences, setPreferences] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  // Email validation resolver
  const emailResolver = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  // Password validation
  const passwordResolver = (value: string) => value.length >= 8;

  // Display Name validation (not empty)
  const displayNameResolver = (value: string) => value.trim().length > 0;

  // Dropdown validation (must select an option)
  const dropdownResolver = (value: string) => value !== "";

  // Step 1: Handle moving to the Profile step
  const handleStep1Next = () => {
    const emailValid = emailResolver(email);
    const passwordValid = passwordResolver(password);

    setIsEmailValid(emailValid);
    setIsPasswordValid(passwordValid);

    if (emailValid && passwordValid) {
      console.log("Step 1 completed:", { email, password });
      setCurrentStep(2);
    }
  };

  // Step 2: Handle moving to the Connect Flica step
  const handleStep2Next = () => {
    const displayNameValid = displayNameResolver(displayName);
    const baseAirportValid = dropdownResolver(baseAirport);
    const airlineValid = dropdownResolver(airline);
    const roleValid = dropdownResolver(role);

    setIsDisplayNameValid(displayNameValid);
    setIsBaseAirportValid(baseAirportValid);
    setIsAirlineValid(airlineValid);
    setIsRoleValid(roleValid);

    if (displayNameValid && baseAirportValid && airlineValid && roleValid) {
      console.log("Step 2 completed:", {
        displayName,
        baseAirport,
        airline,
        role,
      });
      setCurrentStep(3);
    }
  };

  // Step 3: Handle moving to the next step
  const handleStep3Next = () => {
    if (preferences.length > 0 || selectedDates.length > 0) {
      console.log("Step 3 completed:", { preferences, selectedDates });
      setCurrentStep(4);
    } else {
      alert("Please select at least one preference or date.");
    }
  };

  // Handle moving to the previous step
  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Sample dropdown options
  const baseAirports = [
    { label: "JFK - John F. Kennedy International", value: "JFK" },
    { label: "LAX - Los Angeles International", value: "LAX" },
    { label: "ORD - Chicago O'Hare International", value: "ORD" },
  ];

  const airlines = [
    { label: "JetBlue Airways", value: "JetBlue Airways" },
    { label: "Mesa Airlines", value: "Mesa Airlines" },
    { label: "Hawaiin Airlines", value: "Hawaiin Airlines" },
    { label: "Spirit Airlines", value: "Spirit Airlines" },
    { label: "Frontier Airlines", value: "Frontier Airlines" },
    { label: "WestJet", value: "WestJet" },
    { label: "PSA Airlines", value: "PSA Airlines" },
  ];

  const roles = [
    { label: "Pilot", value: "Pilot" },
    { label: "Flight Attendant", value: "Flight Attendant" },
  ];

  // Preferences options paired for mutual exclusivity
  const preferencePairs = [
    {
      left: "Weekends off",
      right: "Not important",
      leftValue: "weekends_off",
      rightValue: "not_important",
    },
    {
      left: "Less sits",
      right: "Long sits at home",
      leftValue: "less_sits",
      rightValue: "long_sits_home",
    },
    {
      left: "30+ hours",
      right: "More efficient",
      leftValue: "30_plus_hours",
      rightValue: "more_efficient",
    },
    {
      left: "More credit $",
      right: "Less credit",
      leftValue: "more_credit",
      rightValue: "less_credit",
    },
    {
      left: "Commutable",
      right: "Not important",
      leftValue: "commutable",
      rightValue: "not_important_2",
    },
    {
      left: "Late check-in",
      right: "Early check-in",
      leftValue: "late_checkin",
      rightValue: "early_checkin",
    },
    {
      left: "Early check-out",
      right: "Not important",
      leftValue: "early_checkout",
      rightValue: "not_important_3",
    },
    {
      left: "Mexi-NO",
      right: "Mexi-Can",
      leftValue: "mexi_no",
      rightValue: "mexi_can",
    },
  ];

  const handlePreferenceChange = (selectedValue: string, isLeft: boolean) => {
    const pair = preferencePairs.find(
      (p) => p.leftValue === selectedValue || p.rightValue === selectedValue
    );
    if (pair) {
      setPreferences((prev) => {
        const newPrefs = [...prev];
        if (isLeft) {
          newPrefs.push(selectedValue);
          if (newPrefs.includes(pair.rightValue))
            newPrefs.splice(newPrefs.indexOf(pair.rightValue), 1);
        } else {
          newPrefs.push(selectedValue);
          if (newPrefs.includes(pair.leftValue))
            newPrefs.splice(newPrefs.indexOf(pair.leftValue), 1);
        }
        return newPrefs.filter(
          (val, index, self) => self.indexOf(val) === index
        ); // Remove duplicates
      });
    }
  };

  const handleConnectFlica = () => {
    console.log("Flica connected");
    router.push("/(auth)/auth-completed");
    // other logic
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <AppLogo />

        {/* Placeholder for Progress Bar Image */}
        <View style={styles.progressImageContainer}>
          {currentStep === 1 && <Stage1 />}
          {currentStep === 2 && <Stage2 />}
          {currentStep === 3 && <Stage2 />}
          {currentStep === 4 && <Stage3 />}
        </View>

        {/* Back Arrow and Title */}
        <View style={styles.headerRow}>
          {currentStep > 1 && (
            <Pressable onPress={handleStepBack} style={styles.backButton}>
              <Text style={styles.backArrow}>←</Text>
            </Pressable>
          )}
          {currentStep === 1 && <View style={styles.backSpacer} />}
          {currentStep === 2 && <Text style={styles.title}>Profile</Text>}
          {currentStep === 3 && <Text style={styles.title}>Preferences</Text>}
          {currentStep === 4 && <Text style={styles.title}></Text>}
        </View>

        {/* Step 1: Sign Up */}
        {currentStep === 1 && (
          <>
            <CustomInputField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoComplete="email"
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
              autoComplete="password"
              resolver={passwordResolver}
              resolverCalledWhileTyping={true}
              isValid={isPasswordValid}
              setIsValid={setIsPasswordValid}
              error={
                !isPasswordValid
                  ? "Password must be at least 8 characters"
                  : undefined
              }
            />

            <Pressable
              style={[
                globalStyles.button,
                {
                  backgroundColor: theme.colors.primary.primary,
                },
              ]}
              onPress={handleStep1Next}
            >
              <Text
                style={[
                  globalStyles.buttonText,
                  {
                    color: theme.colors.base.baseWhite,
                  },
                ]}
              >
                Confirm Email
              </Text>
            </Pressable>

            <Pressable onPress={() => router.back()} style={styles.loginLink}>
              <Text style={styles.loginText}>
                Already have an account?{" "}
                <Text style={styles.loginHighlight}>Login</Text>
              </Text>
            </Pressable>
          </>
        )}

        {/* Step 2: Profile */}
        {currentStep === 2 && (
          <>
            <CustomInputField
              label="Display Name"
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Enter your display name"
              type="text"
              resolver={displayNameResolver}
              resolverCalledWhileTyping={true}
              isValid={isDisplayNameValid}
              setIsValid={setIsDisplayNameValid}
              error={
                !isDisplayNameValid ? "Display name cannot be empty" : undefined
              }
            />

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldTitle}>Base airport</Text>
              <DropdownModal
                data={baseAirports}
                title="Base Airport"
                value={baseAirport}
                setValue={setBaseAirport}
                isValid={isBaseAirportValid}
                setIsValid={setIsBaseAirportValid}
                error={
                  !isBaseAirportValid
                    ? "Please select a base airport"
                    : undefined
                }
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldTitle}>Airline</Text>
              <DropdownModal
                data={airlines}
                title="Airline"
                value={airline}
                setValue={setAirline}
                isValid={isAirlineValid}
                setIsValid={setIsAirlineValid}
                error={!isAirlineValid ? "Please select an airline" : undefined}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text style={styles.fieldTitle}>Pilot or Flight Attendant</Text>
              <DropdownModal
                data={roles}
                title="Pilot or Flight Attendant"
                value={role}
                setValue={setRole}
                isValid={isRoleValid}
                setIsValid={setIsRoleValid}
                error={!isRoleValid ? "Please select a role" : undefined}
              />
            </View>

            <Pressable
              style={[
                globalStyles.button,
                {
                  backgroundColor: theme.colors.primary.primary,
                },
              ]}
              onPress={handleStep2Next}
            >
              <Text
                style={[
                  globalStyles.buttonText,
                  {
                    color: theme.colors.base.baseWhite,
                  },
                ]}
              >
                Next Page
              </Text>
            </Pressable>
          </>
        )}

        {/* Step 3: Connect Flica */}
        {currentStep === 3 && (
          <>
            <Text style={styles.sectionTitle}>Preferences</Text>
            {preferencePairs.map((pair, index) => (
              <View key={index} style={styles.preferenceRow}>
                <View style={styles.checkboxPair}>
                  <CheckBox
                    value={preferences.includes(pair.leftValue)}
                    onValueChange={(newValue) =>
                      handlePreferenceChange(pair.leftValue, true)
                    }
                    color={
                      preferences.includes(pair.leftValue)
                        ? theme.colors.primary.primary
                        : undefined
                    }
                  />
                  <Text style={styles.checkboxLabel}>{pair.left}</Text>
                </View>
                <View style={styles.checkboxPair}>
                  <CheckBox
                    value={preferences.includes(pair.rightValue)}
                    onValueChange={(newValue) =>
                      handlePreferenceChange(pair.rightValue, false)
                    }
                    color={
                      preferences.includes(pair.rightValue)
                        ? theme.colors.primary.primary
                        : undefined
                    }
                  />
                  <Text style={styles.checkboxLabel}>{pair.right}</Text>
                </View>
              </View>
            ))}

            <Text style={styles.sectionTitle}>Specific Dates Off</Text>
            <CustomCalendar
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
            />

            <Pressable
              style={[
                globalStyles.button,
                {
                  backgroundColor: theme.colors.primary.primary,
                },
              ]}
              onPress={handleStep3Next}
            >
              <Text
                style={[
                  globalStyles.buttonText,
                  {
                    color: theme.colors.base.baseWhite,
                  },
                ]}
              >
                Next Page
              </Text>
            </Pressable>
          </>
        )}

        {/* Placeholder for other steps */}
        {currentStep === 4 && (
          <>
            <Pressable
              style={[
                globalStyles.button,
                {
                  backgroundColor: theme.colors.primary.primary,
                },
              ]}
              onPress={handleConnectFlica}
            >
              <Text
                style={[
                  globalStyles.buttonText,
                  {
                    color: theme.colors.base.baseWhite,
                  },
                ]}
              >
                Connect Flica
              </Text>
            </Pressable>
            <View>
              <Text style={styles.subtitle}>
                Why connect your Flica account?
              </Text>
              <Text>
                To provide you with the best scheduling experience, our app
                requires you to connect your Flica account first. By linking
                your account we can show you your up-to-date schedule and
                organize it for easier viewing using our in-app browser.
              </Text>
            </View>
          </>
        )}
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
    width: "100%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  subtitle: {
    fontSize: 24,
    color: theme.colors.neutrals?.neutral900 || "#000000",
    marginVertical: 20,
  },
  progressImageContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  progressImage: {
    // Placeholder for your progress bar image
    // Replace this View with your image component (e.g., <Image source={require('@/assets/progress-step-1.png')} />)
    width: 300, // Adjust width as needed
    height: 20, // Adjust height as needed
    backgroundColor: "#E0E0E0", // Temporary placeholder color
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backArrow: {
    fontSize: 24,
    color: theme.colors.primary.primary,
  },
  backSpacer: {
    width: 40, // Match the space taken by the back button
  },
  title: {
    fontSize: 24,
    color: theme.colors.neutrals.neutral900,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  loginLink: {
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: theme.colors.neutrals?.neutral900 || "#000000",
  },
  loginHighlight: {
    color: theme.colors.primary?.primary,
  },
  fieldTitle: {
    fontSize: 15,
    color: theme.colors.neutrals.neutral900,
    marginBottom: 5,
  },
  fieldContainer: {
    width: "100%",
  },
  sectionTitle: {
    fontSize: 18,
    color: theme.colors.neutrals.neutral900,
    marginVertical: 10,
    fontWeight: "bold",
  },
  preferenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 5,
  },
  checkboxPair: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
    color: theme.colors.neutrals.neutral900,
  },
});

export default Signup;
