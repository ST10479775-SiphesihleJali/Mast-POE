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
import { Picker } from "@react-native-picker/picker";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, MenuItem } from "../App";

type AddItemNavProp = StackNavigationProp<RootStackParamList, "AddItem">;

interface Props {
  navigation: AddItemNavProp;
  addItem: (item: MenuItem) => void;
}

export default function AddItemScreen({ navigation, addItem }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [course, setCourse] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = () => {
    if (!name || !description || !price || !course) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
      name,
      description,
      course,
      price: parseFloat(price),
      image:
        image ||
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    };

    addItem(newItem);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add New Dish</Text>

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        placeholderTextColor="#999"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="#999"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Price (R)"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL (optional)"
        placeholderTextColor="#999"
        value={image}
        onChangeText={setImage}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={course}
          onValueChange={(val) => setCourse(val)}
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

      <Button title="Add Dish" color="#1E90FF" onPress={handleSubmit} />
    </ScrollView>
  );
}

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
