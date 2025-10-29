import React, { useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, MenuItem, CourseType } from "../App";
import MenuItemCard from "../components/MenuItemCard";
import { useFocusEffect } from "@react-navigation/native";

/* Code Attribution
   Author: React Navigation Team
   Title: useFocusEffect Hook - React Navigation Documentation
   Date Published: 2024
   Link/URL: https://reactnavigation.org/docs/use-focus-effect/
   Date Accessed: 2024-10-22
   Description: Used useFocusEffect to trigger animations when screen comes into focus
*/

type HomeNavProp = StackNavigationProp<RootStackParamList, "Home">;

interface Props {
  navigation: HomeNavProp;
  menuItems: MenuItem[];
  deleteItem: (id: string) => void;
}

// Type for course average data
type CourseAverage = {
  course: CourseType;
  average: number;
  count: number;
};

/* Code Attribution
   Author: Meta Platforms, Inc.
   Title: Animated API - React Native Documentation
   Date Published: 2024
   Link/URL: https://reactnative.dev/docs/animated
   Date Accessed: 2024-10-22
   Description: Used Animated API for fade-in animations and smooth transitions
*/

export default function HomeScreen({ navigation, menuItems, deleteItem }: Props) {
  // Animated value for fade-in effect
  const fadeAnim = useRef(new Animated.Value(0)).current;

  /* Code Attribution
     Author: Meta Platforms, Inc.
     Title: FlatList Component - React Native Documentation
     Date Published: 2024
     Link/URL: https://reactnative.dev/docs/flatlist
     Date Accessed: 2024-10-22
     Description: Used FlatList for efficient rendering of menu items list
  */

  // Function to calculate average price per course
  const calculateAverages = (): CourseAverage[] => {
    const courses: CourseType[] = ['Starters', 'Mains', 'Desserts'];
    const averages: CourseAverage[] = [];

    // Use for loop to iterate through each course
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      const courseItems = menuItems.filter(item => item.course === course);
      
      let totalPrice = 0;
      let count = 0;

      // Use while loop to sum up prices
      let j = 0;
      while (j < courseItems.length) {
        totalPrice += courseItems[j].price;
        count++;
        j++;
      }

      const average = count > 0 ? totalPrice / count : 0;
      averages.push({ course, average, count });
    }

    return averages;
  };

  // Get course averages
  const courseAverages = calculateAverages();

  // Fade animation when screen is focused (triggered when returning from Add Item screen)
  useFocusEffect(
    React.useCallback(() => {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim])
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.header}>Chef's Menu</Text>
      <Text style={styles.summary}>Total Dishes: {menuItems.length}</Text>

      {/* Display average prices by course */}
      <View style={styles.averagesContainer}>
        <Text style={styles.averagesTitle}>Average Prices by Course:</Text>
        {courseAverages.map((item) => (
          <View key={item.course} style={styles.averageRow}>
            <Text style={styles.courseText}>{item.course}:</Text>
            <Text style={styles.averagePrice}>
              {item.count > 0 
                ? `R ${item.average.toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : 'No items'}
            </Text>
            <Text style={styles.itemCount}>({item.count} items)</Text>
          </View>
        ))}
      </View>

      {/* FlatList for efficient rendering of menu items */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <MenuItemCard item={item} index={index} onDelete={deleteItem} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No dishes yet!</Text>
            <Text style={styles.emptySubtext}>Add your first dish to get started</Text>
          </View>
        }
      />

      {/* Button container for navigation buttons */}
      <View style={styles.buttonContainer}>
        {/* Button to navigate to Filter screen */}
        <TouchableOpacity
          style={[styles.button, styles.filterButton]}
          onPress={() => navigation.navigate("Filter")}
          accessible={true}
          accessibilityLabel="Filter menu by course"
          accessibilityRole="button"
          accessibilityHint="Navigate to filter menu screen"
        >
          <Text style={styles.buttonText}>Filter Menu</Text>
        </TouchableOpacity>

        {/* Button to navigate to Add Item screen */}
        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={() => navigation.navigate("AddItem")}
          accessible={true}
          accessibilityLabel="Add new dish"
          accessibilityRole="button"
          accessibilityHint="Navigate to add dish screen"
        >
          <Text style={styles.buttonText}>Add New Dish</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

// Stylesheet for component styling
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  header: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  summary: {
    color: "#1E90FF",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 10,
  },
  averagesContainer: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#1E90FF",
  },
  averagesTitle: {
    color: "#1E90FF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  averageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  courseText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    flex: 1,
  },
  averagePrice: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  itemCount: {
    color: "#999",
    fontSize: 12,
    flex: 1,
    textAlign: "right",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#1E90FF",
  },
  filterButton: {
    backgroundColor: "#FF6B35",
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    fontWeight: "bold" 
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptySubtext: {
    color: '#999',
    fontSize: 14,
  },
});