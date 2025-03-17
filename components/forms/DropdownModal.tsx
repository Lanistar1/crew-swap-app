import { theme } from "@/constants/theme";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Pressable,
  Animated,
} from "react-native";
import RadioGroup from "react-native-radio-buttons-group";
import Icon from "react-native-vector-icons/MaterialIcons";

type Option = {
  label: string;
  value: string;
};

type DropdownModalProps = {
  data: Option[];
  title: string;
  value: string | null;
  setValue: (value: string) => void;
  isValid: boolean;
  setIsValid: (value: boolean) => void;
  error?: string;
};

const DropdownModal = ({
  data,
  title,
  value,
  setValue,
  isValid,
  setIsValid,
  error,
}: DropdownModalProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(value);
  const [slideAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    setSelectedValue(value);
    setIsValid(!!value && value !== ""); // Validate based on selection
  }, [value, setIsValid]);

  const handleOpenModal = () => {
    setIsModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleCloseModal = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsModalVisible(false));
  };

  const renderOption = ({ item }: { item: Option }) => (
    <TouchableOpacity
      onPress={() => {
        setValue(item.value);
        setSelectedValue(item.value);
        setIsValid(true); // Mark as valid when an option is selected
        handleCloseModal();
      }}
      style={styles.option}
    >
      <View style={styles.optionContainer}>
        <Text style={styles.optionText}>{item.label}</Text>
        <RadioGroup
          radioButtons={[
            {
              id: item.value,
              label: "",
              value: item.value,
            },
          ]}
          onPress={() => {
            setValue(item.value);
            setSelectedValue(item.value);
            setIsValid(true);
            handleCloseModal();
          }}
          selectedId={selectedValue === item.value ? item.value : undefined}
          layout="row"
          containerStyle={styles.radioButton}
        />
      </View>
    </TouchableOpacity>
  );

  const modalTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleOpenModal}
        style={[
          styles.dropdown,
          !isValid && styles.inputError,
        ]}
      >
        <Text
          style={[
            styles.dropdownText,
            { color: selectedValue || value ? "#000" : "#666666" },
          ]}
        >
          {selectedValue
            ? data.find((item) => item.value === selectedValue)?.label
            : title}
        </Text>
        <Icon name="keyboard-arrow-down" size={24} color="#666666" />
      </TouchableOpacity>
      {!isValid && error && <Text style={styles.errorMessage}>{error}</Text>}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [{ translateY: modalTranslateY }],
              },
            ]}
          >
            <Text style={styles.modalTitle}>{title}</Text>
            <FlatList
              data={data}
              renderItem={renderOption}
              keyExtractor={(item) => item.value}
            />
            <Pressable onPress={handleCloseModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.neutrals.neutral800,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#FFF",
  },
  dropdownText: {
    fontSize: 16,
  },
  inputError: {
    borderColor: theme.colors.error.error200,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    padding: 20,
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    color: "#000",
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
  radioButton: {
    padding: 0,
    margin: 0,
  },
  closeButton: {
    paddingVertical: 12,
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#000",
  },
  errorMessage: {
    fontSize: 12,
    color: theme.colors.error.error200,
    marginTop: 5,
  },
});

export default DropdownModal;