import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, MenuItem } from "../App";
import MenuItemCard from "../components/MenuItemCard";
import { useFocusEffect } from "@react-navigation/native";

/* Code Attribution
   Author: React Navigation Team
   Title: useFocusEffect Hook - React Navigation Documentation
   Date Published: 2024
   Link/URL: https://reactnavigation.org/docs/use-focus-effect/
   Date Accessed: 2025-10-22
   Description: Used useFocusEffect to trigger animations when screen comes into focus
*/

type HomeNavProp = StackNavigationProp<RootStackParamList, "Home">;

interface Props {
  navigation: HomeNavProp;
  menuItems: MenuItem[];
  addItem: (item: MenuItem) => void;
  deleteItem: (id: string) => void;
}

/* Code Attribution
   Author: Meta Platforms, Inc.
   Title: Animated API - React Native Documentation
   Date Published: 2024
   Link/URL: https://reactnative.dev/docs/animated
   Date Accessed: 2025-10-22
   Description: Used Animated API for fade-in animations and smooth transitions
*/

export default function HomeScreen({ navigation, menuItems, addItem, deleteItem }: Props) {
  // Animated value for fade-in effect
  const fadeAnim = useRef(new Animated.Value(0)).current;

/* Code Attribution
   Author: Meta Platforms, Inc.
   Title: FlatList Component - React Native Documentation
   Date Published: 2024
   Link/URL: https://reactnative.dev/docs/flatlist
   Date Accessed: 2025-10-22
   Description: Used FlatList for efficient rendering of menu items list
*/

  // Fade animation when screen is focused (triggered when returning from Add Item screen)
  useFocusEffect(
    React.useCallback(() => {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }, [])
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.header}>Chef's Menu</Text>
      <Text style={styles.summary}>Total Dishes: {menuItems.length}</Text>

      {/* FlatList for efficient rendering of menu items */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <MenuItemCard item={item} index={index} onDelete={deleteItem} />
        )}
      />

      {/* Button to navigate to Add Item screen */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddItem")}
      >
        <Text style={styles.addButtonText}>Add New Dish</Text>
      </TouchableOpacity>
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
  addButton: {
    backgroundColor: "#1E90FF",
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 15,
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});