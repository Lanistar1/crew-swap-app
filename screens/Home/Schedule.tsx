import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AppLogo2 } from "@/components/images/AppLogo2";


// Define types for the schedule data
interface FlightDetails {
  flightNumber: string; // e.g., "6129"
  route: string; // e.g., "OKC-IAH"
  routeIdentifier: string; // e.g., "334" or "DH"
  time: string; // e.g., "11:55 - 13:22 = 1:27"
  additionalInfo1?: string; // e.g., "86:33 in 100"
  additionalInfo2?: string; // e.g., "1003:02 in 365"
  depArrInfo?: string; // e.g., "DEP B3 ARR C31"
  reportTime: string; // e.g., "Report: 11:10"
  crew: { name: string; role: string }[]; // e.g., [{ name: "Ryan Hin", role: "CA" }]
}

interface ScheduleItem {
  date: string; // e.g., "MO 01"
  type: "flight" | "status" | "callHotel"; // Type of entry
  status?: string; // e.g., "OKC", "VAC", "SIC"
  flightDetails?: FlightDetails[]; // Array of flight legs
  sitTime?: string; // e.g., "Sit: 3:09" (for separating flight legs or after the last leg)
}

const Schedule = () => {
  const [selectedMonth] = useState<string>("December");
  const [summaryStats] = useState({
    credit: "74:50",
    block: "70:29",
    ytd: "360:00",
    off: ":15",
  });
  const [expandedCrew, setExpandedCrew] = useState<string | null>(null); // State to track which crew list is expanded
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // State to track the selected date

  // Updated schedule data based on the image and requirements
  const scheduleData: ScheduleItem[] = [
    {
      date: "MO 01",
      type: "status",
      status: "OKC",
      flightDetails: [
        {
          flightNumber: "6129",
          route: "OKC-IAH",
          routeIdentifier: "334",
          time: "11:55 - 13:22 = 1:27",
          additionalInfo1: "86:33 in 100",
          additionalInfo2: "1003:02 in 365",
          depArrInfo: "DEP B3 ARR C31",
          reportTime: "Report: 11:10",
          crew: [
            { name: "Ryan Hin", role: "CA" },
            { name: "Kyle Down", role: "FO" },
            { name: "Jess Owen", role: "FA" },
            { name: "Fred Pitch", role: "FA" },
          ],
        },
        {
          flightNumber: "6129",
          route: "LGA-IAD",
          routeIdentifier: "DH",
          time: "14:55 - 16:23 = 0:55",
          depArrInfo: "DEP B3 ARR C31",
          reportTime: "Report: 14:10",
          crew: [], // Empty crew list, but still rendered
        },
      ],
      sitTime: "Sit: 3:09", // Between the two flight legs
    },
    { date: "TU 02", type: "status" }, // No status, so no schedule
    {
      date: "WE 03",
      type: "status",
      status: "OKC",
      flightDetails: [
        {
          flightNumber: "6129",
          route: "OKC-IAH",
          routeIdentifier: "334",
          time: "11:55 - 13:22 = 1:27",
          additionalInfo1: "86:33 in 100",
          additionalInfo2: "1003:02 in 365",
          depArrInfo: "DEP B3 ARR C31",
          reportTime: "Report: 11:10",
          crew: [
            { name: "Ryan Hin", role: "CA" },
            { name: "Kyle Down", role: "FO" },
            { name: "Jess Owen", role: "FA" },
            { name: "Fred Pitch", role: "FA" },
          ],
        },
      ],
      sitTime: "Sit: 2:00", // After the single flight leg, before "Call Hotel"
    },
    {
      date: "TH 04",
      type: "status",
      status: "MCI",
      flightDetails: [
        {
          flightNumber: "6129",
          route: "OKC-IAH",
          routeIdentifier: "334",
          time: "11:55 - 13:22 = 1:27",
          additionalInfo1: "86:33 in 100",
          additionalInfo2: "1003:02 in 365",
          depArrInfo: "DEP B3 ARR C31",
          reportTime: "Report: 11:10",
          crew: [
            { name: "Ryan Hin", role: "CA" },
            { name: "Kyle Down", role: "FO" },
            { name: "Jess Owen", role: "FA" },
            { name: "Fred Pitch", role: "FA" },
          ],
        },
      ],
      sitTime: "Sit: 1:30", // After the single flight leg, before "Call Hotel"
    },
    {
      date: "FR 05",
      type: "status",
      status: "MLM",
      flightDetails: [
        {
          flightNumber: "6129",
          route: "OKC-IAH",
          routeIdentifier: "334",
          time: "11:55 - 13:22 = 1:27",
          additionalInfo1: "86:33 in 100",
          additionalInfo2: "1003:02 in 365",
          depArrInfo: "DEP B3 ARR C31",
          reportTime: "Report: 11:10",
          crew: [
            { name: "Ryan Hin", role: "CA" },
            { name: "Kyle Down", role: "FO" },
            { name: "Jess Owen", role: "FA" },
            { name: "Fred Pitch", role: "FA" },
          ],
        },
      ],
      sitTime: "Sit: 1:45", // After the single flight leg, before "Call Hotel"
    },
    {
      date: "SA 06",
      type: "status",
      status: "IAH",
      flightDetails: [
        {
          flightNumber: "6129",
          route: "OKC-IAH",
          routeIdentifier: "334",
          time: "11:55 - 13:22 = 1:27",
          additionalInfo1: "86:33 in 100",
          additionalInfo2: "1003:02 in 365",
          depArrInfo: "DEP B3 ARR C31",
          reportTime: "Report: 11:10",
          crew: [
            { name: "Ryan Hin", role: "CA" },
            { name: "Kyle Down", role: "FO" },
            { name: "Jess Owen", role: "FA" },
            { name: "Fred Pitch", role: "FA" },
          ],
        },
      ],
      sitTime: "Sit: 2:15", // After the single flight leg, before "Call Hotel"
    },
    {
      date: "SU 07",
      type: "status",
      status: "VAC",
      flightDetails: [
        {
          flightNumber: "6129",
          route: "OKC-IAH",
          routeIdentifier: "334",
          time: "11:55 - 13:22 = 1:27",
          additionalInfo1: "86:33 in 100",
          additionalInfo2: "1003:02 in 365",
          depArrInfo: "DEP B3 ARR C31",
          reportTime: "Report: 11:10",
          crew: [
            { name: "Ryan Hin", role: "CA" },
            { name: "Kyle Down", role: "FO" },
            { name: "Jess Owen", role: "FA" },
            { name: "Fred Pitch", role: "FA" },
          ],
        },
      ],
      sitTime: "Sit: 1:00", // After the single flight leg, before "Call Hotel"
    },
    {
      date: "MO 08",
      type: "status",
      status: "RSV",
      flightDetails: [
        {
          flightNumber: "6129",
          route: "OKC-IAH",
          routeIdentifier: "334",
          time: "11:55 - 13:22 = 1:27",
          additionalInfo1: "86:33 in 100",
          additionalInfo2: "1003:02 in 365",
          depArrInfo: "DEP B3 ARR C31",
          reportTime: "Report: 11:10",
          crew: [
            { name: "Ryan Hin", role: "CA" },
            { name: "Kyle Down", role: "FO" },
            { name: "Jess Owen", role: "FA" },
            { name: "Fred Pitch", role: "FA" },
          ],
        },
      ],
      sitTime: "Sit: 1:20", // After the single flight leg, before "Call Hotel"
    },
    {
      date: "TU 09",
      type: "status",
      status: "SIC",
      flightDetails: [
        {
          flightNumber: "6129",
          route: "OKC-IAH",
          routeIdentifier: "334",
          time: "11:55 - 13:22 = 1:27",
          additionalInfo1: "86:33 in 100",
          additionalInfo2: "1003:02 in 365",
          depArrInfo: "DEP B3 ARR C31",
          reportTime: "Report: 11:10",
          crew: [
            { name: "Ryan Hin", role: "CA" },
            { name: "Kyle Down", role: "FO" },
            { name: "Jess Owen", role: "FA" },
            { name: "Fred Pitch", role: "FA" },
          ],
        },
      ],
      sitTime: "Sit: 1:50", // After the single flight leg, before "Call Hotel"
    },
    {
      date: "WE 10",
      type: "status",
      status: "ELP",
      flightDetails: [
        {
          flightNumber: "6129",
          route: "OKC-IAH",
          routeIdentifier: "334",
          time: "11:55 - 13:22 = 1:27",
          additionalInfo1: "86:33 in 100",
          additionalInfo2: "1003:02 in 365",
          depArrInfo: "DEP B3 ARR C31",
          reportTime: "Report: 11:10",
          crew: [
            { name: "Ryan Hin", role: "CA" },
            { name: "Kyle Down", role: "FO" },
            { name: "Jess Owen", role: "FA" },
            { name: "Fred Pitch", role: "FA" },
          ],
        },
      ],
      sitTime: "Sit: 2:30", // After the single flight leg, before "Call Hotel"
    },
    {
      date: "TH 11",
      type: "status",
      status: "LGA",
      flightDetails: [
        {
          flightNumber: "6129",
          route: "OKC-IAH",
          routeIdentifier: "334",
          time: "11:55 - 13:22 = 1:27",
          additionalInfo1: "86:33 in 100",
          additionalInfo2: "1003:02 in 365",
          depArrInfo: "DEP B3 ARR C31",
          reportTime: "Report: 11:10",
          crew: [
            { name: "Ryan Hin", role: "CA" },
            { name: "Kyle Down", role: "FO" },
            { name: "Jess Owen", role: "FA" },
            { name: "Fred Pitch", role: "FA" },
          ],
        },
      ],
      sitTime: "Sit: 1:40", // After the single flight leg, before "Call Hotel"
    },
    {
      date: "FR 12",
      type: "status",
      status: "DFW",
      flightDetails: [
        {
          flightNumber: "6129",
          route: "OKC-IAH",
          routeIdentifier: "334",
          time: "11:55 - 13:22 = 1:27",
          additionalInfo1: "86:33 in 100",
          additionalInfo2: "1003:02 in 365",
          depArrInfo: "DEP B3 ARR C31",
          reportTime: "Report: 11:10",
          crew: [
            { name: "Ryan Hin", role: "CA" },
            { name: "Kyle Down", role: "FO" },
            { name: "Jess Owen", role: "FA" },
            { name: "Fred Pitch", role: "FA" },
          ],
        },
      ],
      sitTime: "Sit: 2:00", // After the single flight leg, before "Call Hotel"
    },
    { date: "SA 13", type: "status" }, // No status, so no schedule
    {
      date: "SU 14",
      type: "status",
      status: "IAH",
      flightDetails: [
        {
          flightNumber: "6129",
          route: "LGA-IAD",
          routeIdentifier: "DH",
          time: "14:55 - 16:23 = 0:55",
          depArrInfo: "DEP B3 ARR C31",
          reportTime: "Report: 14:10",
          crew: [],
        },
      ],
      sitTime: "Sit: 1:22", // After the single flight leg, before "Call Hotel"
    },
    {
      date: "MO 15",
      type: "status",
      status: "IAH",
      flightDetails: [
        {
          flightNumber: "6129",
          route: "LGA-IAD",
          routeIdentifier: "DH",
          time: "14:55 - 16:23 = 0:55",
          depArrInfo: "DEP B3 ARR C31",
          reportTime: "Report: 14:10",
          crew: [],
        },
      ],
      sitTime: "Sit: 1:30", // After the single flight leg, before "Call Hotel"
    },
    {
      date: "TU 16",
      type: "status",
      status: "SLP",
      flightDetails: [
        {
          flightNumber: "6129",
          route: "LGA-IAD",
          routeIdentifier: "DH",
          time: "14:55 - 16:23 = 0:55",
          depArrInfo: "DEP B3 ARR C31",
          reportTime: "Report: 14:10",
          crew: [],
        },
      ],
      sitTime: "Sit: 1:45", // After the single flight leg, before "Call Hotel"
    },
    {
      date: "WE 17",
      type: "status",
      status: "SLP",
      flightDetails: [
        {
          flightNumber: "6129",
          route: "LGA-IAD",
          routeIdentifier: "DH",
          time: "14:55 - 16:23 = 0:55",
          depArrInfo: "DEP B3 ARR C31",
          reportTime: "Report: 14:10",
          crew: [],
        },
      ],
      sitTime: "Sit: 2:00", // After the single flight leg, before "Call Hotel"
    },
    {
      date: "TH 18",
      type: "status",
      status: "SLP",
      flightDetails: [
        {
          flightNumber: "6129",
          route: "LGA-IAD",
          routeIdentifier: "DH",
          time: "14:55 - 16:23 = 0:55",
          depArrInfo: "DEP B3 ARR C31",
          reportTime: "Report: 14:10",
          crew: [],
        },
      ],
      sitTime: "Sit: 1:22", // After the single flight leg, before "Call Hotel"
    },
    { date: "FR 19", type: "status", status: "Call Hotel" }, // No flightDetails, so no schedule
  ];

  // Pre-select the first date with a status
  useEffect(() => {
    const firstScheduledDate = scheduleData.find((item) => item.status)?.date;
    setSelectedDate(firstScheduledDate || "MO 01"); // Default to "MO 01" if no status is found
  }, []);

  const toggleCrew = (date: string) => {
    setExpandedCrew(expandedCrew === date ? null : date);
  };

  // Handle date selection
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setExpandedCrew(null); // Reset expanded crew when selecting a new date
  };

  // Render LHS (Dates and Status)
  const renderDates = () => {
    return scheduleData.map((item, index) => {
      const isHighlighted = item.date === "TU 16";
      const isSelected = item.date === selectedDate;
      return (
        <TouchableOpacity
          key={item.date}
          onPress={() => handleDateSelect(item.date)}
          style={[
            styles.dateRow,
            isHighlighted && styles.highlightedRow,
            isSelected && styles.selectedRow,
          ]}
        >
          <Text style={styles.dateText}>{item.date}</Text>
          {item.status && <Text style={styles.statusText}>{item.status}</Text>}
        </TouchableOpacity>
      );
    });
  };

  // Render RHS (Yellow Cards, Sit Times, and Call Hotel for the selected date)
  const renderContent = () => {
    if (!selectedDate) return null; // If no date is selected, show nothing on RHS

    const selectedItem = scheduleData.find((item) => item.date === selectedDate);
    if (!selectedItem || !selectedItem.status) return null; // Only show RHS if the selected date has a status
    if (!selectedItem.flightDetails) return null; // Only show RHS if the selected date has flightDetails (i.e., a schedule)

    const contentViews: JSX.Element[] = [];

    // Render each flight leg in a separate yellow card
    selectedItem.flightDetails.forEach((flight, idx) => {
      const isCrewExpanded = expandedCrew === `${selectedItem.date}-${idx}`;
      const crewHeight = isCrewExpanded ? flight.crew.length * 20 : 0;

      contentViews.push(
        <View key={`flight-${selectedItem.date}-${idx}`} style={styles.contentRow}>
          <View style={[styles.flightCard, { minHeight: 120 + crewHeight }]}>
            <View style={styles.flightHeader}>
              <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
              <Text style={styles.route}>{flight.route}</Text>
              <Text style={styles.flightNumber}>{flight.routeIdentifier}</Text>
            </View>
            <Text style={styles.time}>{flight.time}</Text>
            {flight.additionalInfo1 && (
              <Text style={styles.additionalInfo}>{flight.additionalInfo1}</Text>
            )}
            {flight.additionalInfo2 && (
              <Text style={styles.additionalInfo}>{flight.additionalInfo2}</Text>
            )}
            <Text style={styles.depArrInfo}>{flight.depArrInfo}</Text>
            <Text style={styles.reportTime}>{flight.reportTime}</Text>
            <View style={styles.crewContainer}>
              <TouchableOpacity
                style={styles.crewButton}
                onPress={() => toggleCrew(`${selectedItem.date}-${idx}`)}
              >
                <Text style={styles.crewText}>Crew</Text>
                <Icon
                  name={isCrewExpanded ? "arrow-drop-up" : "arrow-drop-down"}
                  size={20}
                  color="#1E90FF"
                />
              </TouchableOpacity>
              {isCrewExpanded &&
                (flight.crew.length > 0 ? (
                  flight.crew.map((member, crewIdx) => (
                    <Text key={crewIdx} style={styles.crewMember}>
                      {member.name} ({member.role})
                    </Text>
                  ))
                ) : (
                  <Text style={styles.crewMember}>No crew members</Text>
                ))}
              <TouchableOpacity>
                <Text style={styles.groupChat}>Group Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );

      // Add "Sit for coffee" separator if it exists and this is not the last flight leg
      if (selectedItem.sitTime && idx < selectedItem.flightDetails!.length - 1) {
        contentViews.push(
          <View key={`sit-${selectedItem.date}-${idx}`} style={styles.sitContainer}>
            <Text style={styles.sitTime}>{selectedItem.sitTime}</Text>
            <Icon name="coffee" size={16} color="#666" style={styles.sitIcon} />
          </View>
        );
      }
    });

    // Add "Sit for coffee" after the last flight leg if sitTime exists
    if (selectedItem.sitTime) {
      contentViews.push(
        <View key={`sit-after-${selectedItem.date}`} style={styles.sitContainer}>
          <Text style={styles.sitTime}>{selectedItem.sitTime}</Text>
          <Icon name="coffee" size={16} color="#666" style={styles.sitIcon} />
        </View>
      );
    }

    // Add "Call Hotel" card at the end for all days with flightDetails
    contentViews.push(
      <View key={`callHotel-${selectedItem.date}`} style={styles.contentRow}>
        <View style={styles.callHotelCard}>
          <Text style={styles.callHotelText}>Call Hotel</Text>
        </View>
      </View>
    );

    return <View style={styles.contentColumn}>{contentViews}</View>;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <AppLogo2/>
        {/* <Text style={styles.appName}>CrewSwap</Text> */}
        <TouchableOpacity style={styles.monthSelector}>
          <Text style={styles.monthText}>{selectedMonth}</Text>
          <Icon name="arrow-drop-down" size={20} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="help-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Summary Stats */}
      <View style={styles.subHeader}>
        <View style={styles.statsContainer}>
          <Text style={styles.statText}>Credit {summaryStats.credit}</Text>
          <Text style={styles.statText}>Block {summaryStats.block}</Text>
          <Text style={styles.statText}>YTD {summaryStats.ytd}</Text>
          <Text style={styles.statText}>Off {summaryStats.off}</Text>
        </View>
      </View>

      {/* Main Content with Two Columns */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainContent}>
          {/* LHS: Continuous Date List with Status */}
          <View style={styles.dateColumn}>{renderDates()}</View>

          {/* RHS: Yellow Cards for Selected Date */}
          <ScrollView style={styles.contentColumn}>{renderContent()}</ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Define the styles with proper TypeScript typing
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    width: "100%",
    marginTop:20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#EFF6FF",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF4500",
  },
  subHeader: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#D3D3D3",
  },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
  },
  monthText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statText: {
    fontSize: 14,
    color: "#333",
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    marginHorizontal: 15,
    marginTop: 10,
  },
  mainContent: {
    flexDirection: "row",
  },
  dateColumn: {
    width: "40%", // Adjusted to match the image's proportions
    marginRight: 5,
  },
  contentColumn: {
    width: "100%",
    flexDirection: "column",
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 5,
    gap: 30,
    height: 30, // Fixed height for date rows
  },
  highlightedRow: {
    backgroundColor: "#FFFF99",
  },
  selectedRow: {
    backgroundColor: "#E0E0E0",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  contentRow: {
    width: "100%",
    alignItems: "center",
    marginBottom: 10, // Increased spacing between cards
  },
  flightCard: {
    backgroundColor: "#FDE68A",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    width: "90%",
    alignItems: "center",
  },
  flightHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 5,
  },
  flightNumber: {
    fontSize: 15,
    color: "#333",
  },
  route: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
  },
  time: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  additionalInfo: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  depArrInfo: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  reportTime: {
    fontSize: 14, // Changed from "14" (string) to 14 (number)
    color: "#333",
    marginBottom: 5,
  },
  crewContainer: {
    marginBottom: 5,
    alignItems: "center",
  },
  crewButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  crewText: {
    fontSize: 14,
    color: "#1E90FF",
    marginRight: 5,
  },
  crewMember: {
    fontSize: 14,
    color: "#1E90FF",
    marginVertical: 2,
  },
  groupChat: {
    fontSize: 14,
    color: "#1E90FF",
    marginTop: 5,
  },
  sitContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    marginBottom: 10, // Increased spacing after "Sit for coffee"
    backgroundColor: "transparent", // Ensure no background
  },
  sitTime: {
    fontSize: 14,
    color: "#333",
    marginRight: 5,
  },
  sitIcon: {
    marginLeft: 5,
  },
  callHotelCard: {
    backgroundColor: "#FDE68A",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    width: "90%",
    alignItems: "center",
  },
  callHotelText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Schedule;