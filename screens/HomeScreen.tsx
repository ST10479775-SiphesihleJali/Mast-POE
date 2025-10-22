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

type HomeNavProp = StackNavigationProp<RootStackParamList, "Home">;

interface Props {
  navigation: HomeNavProp;
  menuItems: MenuItem[];
  addItem: (item: MenuItem) => void;
}

export default function HomeScreen({ navigation, menuItems, addItem }: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Fade animation when screen is focused (like after returning from Add Item)
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
      <Text style={styles.header}>Chef’s Menu</Text>
      <Text style={styles.summary}>Total Dishes: {menuItems.length}</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <MenuItemCard item={item} index={index} />
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddItem")}
      >
        <Text style={styles.addButtonText}>Add New Dish</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

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
