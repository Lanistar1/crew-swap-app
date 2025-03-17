import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList } from "react-native";
import { theme } from "@/constants/theme";

// Define the prop types for CustomCalendar
interface CustomCalendarProps {
  selectedDates: string[];
  setSelectedDates: (dates: string[]) => void;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({ selectedDates, setSelectedDates }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2)); // Default to March 2025

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 0 = Sunday, 6 = Saturday
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Generate the calendar grid (6x7 = 42 cells)
  const calendarDays = Array.from({ length: 42 }, (_, index) => {
    const dayOfMonth = index - firstDayOfMonth + 1;
    if (dayOfMonth >= 1 && dayOfMonth <= daysInMonth) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayOfMonth);
      const dateStr = date.toISOString().split("T")[0];
      return {
        day: dayOfMonth,
        dateStr,
        isSelected: selectedDates.includes(dateStr),
      };
    }
    return { day: null, dateStr: null, isSelected: false };
  });

  const handleDateSelect = (day: number | null, dateStr: string | null) => {
    if (day && dateStr) {
      setSelectedDates(
        selectedDates.includes(dateStr)
          ? selectedDates.filter((d) => d !== dateStr)
          : [...selectedDates, dateStr]
      );
    }
  };

  const changeMonth = (increment: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
  };

  const changeYear = (increment: number) => {
    setCurrentDate(new Date(currentDate.getFullYear() + increment, currentDate.getMonth(), 1));
  };

  const renderDay = ({ item }: { item: { day: number | null; dateStr: string | null; isSelected: boolean } }) => (
    <TouchableOpacity
      style={[styles.day, item.isSelected && styles.selectedDay]}
      onPress={() => handleDateSelect(item.day, item.dateStr)}
      disabled={!item.day}
    >
      <Text style={[styles.dayText, item.isSelected && styles.selectedDayText]}>
        {item.day || ""}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeYear(-1)}>
          <Text style={styles.navText}>«</Text>
        </TouchableOpacity>
        <Text style={styles.yearText}>{currentDate.getFullYear()}</Text>
        <TouchableOpacity onPress={() => changeYear(1)}>
          <Text style={styles.navText}>»</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Text style={styles.navText}>«</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{monthNames[currentDate.getMonth()]}</Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Text style={styles.navText}>»</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.weekDays}>
        {weekDays.map((day) => (
          <Text key={day} style={styles.weekDayText}>
            {day}
          </Text>
        ))}
      </View>
      <FlatList
        data={calendarDays}
        renderItem={renderDay}
        keyExtractor={(item, index) => index.toString()}
        numColumns={7}
        style={styles.daysGrid}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.gridContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: "100%", // Use full width of the parent container
    alignSelf: "center", // Center the container
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  monthText: {
    fontSize: 18,
    color: theme.colors.neutrals.neutral900,
    flex: 1,
    textAlign: "center",
  },
  yearText: {
    fontSize: 18,
    color: theme.colors.neutrals.neutral900,
    flex: 1,
    textAlign: "center",
  },
  navText: {
    fontSize: 18,
    color: theme.colors.primary.primary,
    paddingHorizontal: 10,
  },
  weekDays: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    width: "100%",
  },
  weekDayText: {
    fontSize: 14,
    color: theme.colors.neutrals.neutral600,
    width: (Dimensions.get("window").width * 0.9 - 20) / 7, // Account for 90% parent width and 10px padding on each side
    textAlign: "center",
  },
  daysGrid: {
    width: "100%", // Ensure FlatList uses full width
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%", // Ensure each row uses full width
  },
  gridContainer: {
    width: "100%", // Ensure the grid content uses full width
  },
  day: {
    width: (Dimensions.get("window").width * 0.9 - 20) / 7, // Match weekDayText width
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedDay: {
    backgroundColor: theme.colors.primary.primary,
    borderRadius: 100,
  },
  dayText: {
    fontSize: 14,
    color: theme.colors.neutrals.neutral900,
  },
  selectedDayText: {
    color: theme.colors.base.baseWhite,
  },
});

export default CustomCalendar;