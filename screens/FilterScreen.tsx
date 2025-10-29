import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, MenuItem, CourseType } from "../App";
import MenuItemCard from "../components/MenuItemCard";

/* Code Attribution
   Author: React Navigation Team
   Title: Stack Navigator - React Navigation Documentation
   Date Published: 2024
   Link/URL: https://reactnavigation.org/docs/stack-navigator/
   Date Accessed: 2024-10-22
   Description: Used for implementing navigation patterns and stack navigation structure
*/

type FilterNavProp = StackNavigationProp<RootStackParamList, "Filter">;

interface Props {
  navigation: FilterNavProp;
  menuItems: MenuItem[];
}

/* Code Attribution
   Author: Meta Platforms, Inc.
   Title: FlatList Component - React Native Documentation
   Date Published: 2024
   Link/URL: https://reactnative.dev/docs/flatlist
   Date Accessed: 2024-10-22
   Description: Used FlatList for efficient rendering of filtered menu items
*/

export default function FilterScreen({ navigation, menuItems }: Props) {
  // State to track selected course filter
  const [selectedCourse, setSelectedCourse] = useState<CourseType | "All">("All");

  // Function to filter menu items based on selected course
  const getFilteredItems = (): MenuItem[] => {
    if (selectedCourse === "All") {
      return menuItems;
    }
    
    const filteredItems: MenuItem[] = [];
    
    // Use for...in loop to iterate through menuItems
    for (const index in menuItems) {
      const item = menuItems[index];
      if (item.course === selectedCourse) {
        filteredItems.push(item);
      }
    }
    
    return filteredItems;
  };

  const filteredItems = getFilteredItems();

  // Course filter buttons
  const courses: (CourseType | "All")[] = ["All", "Starters", "Mains", "Desserts"];

  return (
    <View style={styles.container}>
      {/* Custom header with back button */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          accessible={true}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filter Menu</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Filter buttons */}
      <View style={styles.filterContainer}>
        {courses.map((course) => (
          <TouchableOpacity
            key={course}
            style={[
              styles.filterButton,
              selectedCourse === course && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedCourse(course)}
            accessible={true}
            accessibilityLabel={`Filter by ${course}`}
            accessibilityRole="button"
            accessibilityState={{ selected: selectedCourse === course }}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedCourse === course && styles.filterButtonTextActive,
              ]}
            >
              {course}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Display filtered count */}
      <Text style={styles.resultCount}>
        Showing {filteredItems.length} {selectedCourse === "All" ? "dishes" : selectedCourse.toLowerCase()}
      </Text>

      {/* FlatList for filtered menu items */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <MenuItemCard 
            item={item} 
            index={index} 
            onDelete={() => {}} // Read-only view, no delete on filter screen
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No dishes found</Text>
            <Text style={styles.emptySubtext}>
              {selectedCourse === "All" 
                ? "No menu items available" 
                : `No ${selectedCourse.toLowerCase()} available`}
            </Text>
          </View>
        }
      />
    </View>
  );
}

// Stylesheet for component styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: "#121212",
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    color: "#1E90FF",
    fontSize: 16,
    fontWeight: "600",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  headerSpacer: {
    width: 50, // Balance the back button width
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    gap: 10,
  },
  filterButton: {
    flex: 1,
    minWidth: "45%",
    backgroundColor: "#1E1E1E",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#333",
    alignItems: "center",
  },
  filterButtonActive: {
    backgroundColor: "#1E90FF",
    borderColor: "#1E90FF",
  },
  filterButtonText: {
    color: "#999",
    fontSize: 14,
    fontWeight: "600",
  },
  filterButtonTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  resultCount: {
    color: "#1E90FF",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 20,
    marginHorizontal: 20,
    fontStyle: "italic",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptySubtext: {
    color: "#999",
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});