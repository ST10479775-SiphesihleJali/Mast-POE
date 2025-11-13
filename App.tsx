import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { Easing } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import AddItemScreen from "./screens/AddItemScreen";
import FilterScreen from "./screens/FilterScreen";

// Type Definitions
export type CourseType = "Starters" | "Mains" | "Desserts";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: CourseType;
  price: number;
  image?: string;
};

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  AddItem: undefined;
  Filter: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const STORAGE_KEY = "@menu_items";

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    // Starters
    {
      id: "1",
      name: "Roasted Tomato Soup",
      description: "Served with basil oil and cream.",
      course: "Starters",
      price: 85,
      image:
        "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "2",
      name: "Bruschetta Trio",
      description: "Toasted bread with tomato, olive tapenade, and mushroom.",
      course: "Starters",
      price: 75,
      image:
        "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "3",
      name: "Caesar Salad",
      description:
        "Crisp romaine with parmesan, croutons, and anchovy dressing.",
      course: "Starters",
      price: 95,
      image:
        "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&q=80",
    },

    // Mains
    {
      id: "4",
      name: "Grilled Salmon",
      description: "Fresh salmon with lemon butter sauce.",
      course: "Mains",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=870",
    },
    {
      id: "5",
      name: "Beef Fillet",
      description: "Tender beef fillet with red wine jus.",
      course: "Mains",
      price: 245,
      image:
        "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "6",
      name: "Chicken Supreme",
      description: "Pan-seared chicken with mushroom cream sauce.",
      course: "Mains",
      price: 165,
      image:
        "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80",
    },

    // Desserts
    {
      id: "7",
      name: "Crème Brûlée",
      description: "Classic dessert with caramelized sugar.",
      course: "Desserts",
      price: 90,
      image:
        "https://images.unsplash.com/photo-1615235739538-95040f341ba8?auto=format&fit=crop&w=464",
    },
    {
      id: "8",
      name: "Chocolate Fondant",
      description: "Warm chocolate cake with molten center.",
      course: "Desserts",
      price: 105,
      image:
        "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "9",
      name: "Lemon Tart",
      description: "Tangy lemon curd with meringue.",
      course: "Desserts",
      price: 85,
      image:
        "https://images.unsplash.com/photo-1543508185-225c92847541?q=80&w=870&auto=format&fit=crop",
    },
  ]);

  // Load from AsyncStorage
  useEffect(() => {
    const loadItems = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.length > 0) setMenuItems(parsed);
        }
      } catch (e) {
        console.error("Error loading items:", e);
      }
    };
    loadItems();
  }, []);

  // Save to AsyncStorage
  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(menuItems)).catch((e) =>
      console.error("Error saving:", e)
    );
  }, [menuItems]);

  const addItem = (i: MenuItem) => setMenuItems((prev) => [...prev, i]);
  const deleteItem = (id: string) =>
    setMenuItems((prev) => prev.filter((item) => item.id !== id));

  const defaultOptions: StackNavigationOptions = {
    headerStyle: { backgroundColor: "#121212" },
    headerTintColor: "#fff",
    cardStyle: { backgroundColor: "#121212" },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={defaultOptions}>

        {/* WELCOME — Fast Cinematic Reveal */}
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false,
            cardStyleInterpolator: ({ current }) => ({
              cardStyle: {
                opacity: current.progress,
                transform: [
                  {
                    scale: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.92, 1],
                    }),
                  },
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            }),
            transitionSpec: {
              open: {
                animation: "timing",
                config: { duration: 320, easing: Easing.out(Easing.cubic) },
              },
              close: {
                animation: "timing",
                config: { duration: 220, easing: Easing.out(Easing.cubic) },
              },
            },
          }}
        />

        {/* HOME — Fast Slide + Soft Rotate */}
        <Stack.Screen
          name="Home"
          options={{
            title: "Christoffel's Menu",
            cardStyleInterpolator: ({ current, layouts }) => ({
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width * 0.5, 0],
                    }),
                  },
                  {
                    rotateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["35deg", "0deg"],
                    }),
                  },
                  {
                    scale: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.95, 1],
                    }),
                  },
                ],
                opacity: current.progress,
              },
            }),
            transitionSpec: {
              open: {
                animation: "timing",
                config: { duration: 360, easing: Easing.out(Easing.cubic) },
              },
              close: {
                animation: "timing",
                config: { duration: 260, easing: Easing.out(Easing.cubic) },
              },
            },
          }}
        >
          {(props) => (
            <HomeScreen {...props} menuItems={menuItems} deleteItem={deleteItem} />
          )}
        </Stack.Screen>

        {/* ADD ITEM — Fast Cinematic Slide Up */}
        <Stack.Screen
          name="AddItem"
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: "vertical",

            cardStyleInterpolator: ({ current, layouts }) => ({
              cardStyle: {
                opacity: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 1],
                }),
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height * 0.45, 0],
                    }),
                  },
                  {
                    scale: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.95, 1],
                    }),
                  },
                ],
              },
              overlayStyle: {
                opacity: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.5],
                }),
                backgroundColor: "rgba(0,0,0,0.6)",
              },
            }),

            transitionSpec: {
              open: {
                animation: "timing",
                config: { duration: 340, easing: Easing.out(Easing.cubic) },
              },
              close: {
                animation: "timing",
                config: { duration: 260, easing: Easing.out(Easing.cubic) },
              },
            },
          }}
        >
          {(props) => <AddItemScreen {...props} addItem={addItem} />}
        </Stack.Screen>

        {/* FILTER — Fast Cinematic Flip */}
        <Stack.Screen
          name="Filter"
          options={{
            headerShown: false,
            cardStyleInterpolator: ({ current, layouts }) => ({
              cardStyle: {
                opacity: current.progress,
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width * 0.5, 0],
                    }),
                  },
                  {
                    rotateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["35deg", "0deg"],
                    }),
                  },
                  {
                    scale: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.95, 1],
                    }),
                  },
                ],
              },
              overlayStyle: {
                opacity: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 0.45],
                }),
                backgroundColor: "rgba(0,0,0,0.6)",
              },
            }),

            transitionSpec: {
              open: {
                animation: "timing",
                config: { duration: 360, easing: Easing.out(Easing.cubic) },
              },
              close: {
                animation: "timing",
                config: { duration: 260, easing: Easing.out(Easing.cubic) },
              },
            },
          }}
        >
          {(props) => <FilterScreen {...props} menuItems={menuItems} />}
        </Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
