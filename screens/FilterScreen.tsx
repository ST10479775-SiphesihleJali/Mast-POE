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
      <Text style={styles.header}>Filter by Course</Text>

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
    padding: 20,
  },
  header: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 15,
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
    marginBottom: 15,
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
});