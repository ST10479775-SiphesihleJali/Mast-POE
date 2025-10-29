import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
// Picker component for dropdown selection
import { Picker } from "@react-native-picker/picker";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, MenuItem, CourseType } from "../App";

/* Code Attribution
   Author: React Navigation Team
   Title: Stack Navigator - React Navigation Documentation
   Date Published: 2024
   Link/URL: https://reactnavigation.org/docs/stack-navigator/
   Date Accessed: 2024-10-22
   Description: Used for implementing navigation patterns and stack navigation structure
*/
type AddItemNavProp = StackNavigationProp<RootStackParamList, "AddItem">;

/* Code Attribution
   Author: React Native Community
   Title: React Native Picker - @react-native-picker/picker
   Date Published: 2024
   Link/URL: https://github.com/react-native-picker/picker
   Date Accessed: 2024-10-22
   Description: Used Picker component for dropdown selection of course types
*/

interface Props {
  navigation: AddItemNavProp;
  addItem: (item: MenuItem) => void;
}

/* Code Attribution
   Author: Meta Platforms, Inc.
   Title: React Native Core Components Documentation
   Date Published: 2024
   Link/URL: https://reactnative.dev/docs/components-and-apis
   Date Accessed: 2024-10-22
   Description: Used core components including View, Text, TextInput, Button, StyleSheet, Alert, and ScrollView
*/

// Helper function to validate image URLs
const isValidUrl = (url: string): boolean => {
  if (!url) return true; // Empty URL is valid (will use default)
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

export default function AddItemScreen({ navigation, addItem }: Props) {
  // State management for form inputs
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [course, setCourse] = useState<CourseType | "">("");
  const [image, setImage] = useState("");

  // Form submission handler with validation
  const handleSubmit = () => {
    // Trim all text inputs
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();
    const trimmedImage = image.trim();

    // Check required fields
    if (!trimmedName || !trimmedDescription || !price || !course) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    // Validate price
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      Alert.alert("Error", "Please enter a valid price greater than 0.");
      return;
    }

    // Validate image URL if provided
    if (trimmedImage && !isValidUrl(trimmedImage)) {
      Alert.alert("Error", "Please enter a valid image URL (starting with http:// or https://).");
      return;
    }

    // Create new menu item object with improved ID generation
    const newItem: MenuItem = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: trimmedName,
      description: trimmedDescription,
      course: course as CourseType,
      price: parsedPrice,
      image: trimmedImage || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    };

    addItem(newItem);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add New Dish</Text>

      {/* Text input for dish name */}
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />
      
      {/* Text input for description */}
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="#999"
        value={description}
        onChangeText={setDescription}
      />
      
      {/* Numeric input for price */}
      <TextInput
        style={styles.input}
        placeholder="Price (R)"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      
      {/* Optional image URL input */}
      <TextInput
        style={styles.input}
        placeholder="Image URL (optional)"
        placeholderTextColor="#999"
        value={image}
        onChangeText={setImage}
      />

      {/* Picker component for course selection */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={course}
          onValueChange={(val) => setCourse(val as CourseType | "")}
          dropdownIconColor="#1E90FF"
          style={styles.picker}
        >
          <Picker.Item
            label="-- Select a course --"
            value=""
            color="#999"
            enabled={false}
          />
          <Picker.Item label="Starters" value="Starters" color="#fff" />
          <Picker.Item label="Mains" value="Mains" color="#fff" />
          <Picker.Item label="Desserts" value="Desserts" color="#fff" />
        </Picker>
      </View>

      {/* Submit button */}
      <Button title="Add Dish" color="#1E90FF" onPress={handleSubmit} />
    </ScrollView>
  );
}

// Stylesheet for component styling
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212", padding: 20 },
  header: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#1E90FF",
    color: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#1E90FF",
    borderRadius: 8,
    marginBottom: 20,
  },
  picker: { color: "#fff" },
});