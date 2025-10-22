import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
  StackNavigationOptions,
} from "@react-navigation/stack";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import AddItemScreen from "./screens/AddItemScreen";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: string;
  price: number;
  image?: string;
};

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  AddItem: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
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
      name: "Grilled Salmon",
      description: "Fresh salmon with lemon butter sauce.",
      course: "Mains",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1617196034796-73b435e3a2d7?auto=format&fit=crop&w=800&q=80",
    },
  ]);

  const addItem = (item: MenuItem) => {
    setMenuItems((prev) => [...prev, item]);
  };

  // ✨ Shared transition preset
  const screenOptions: StackNavigationOptions = {
    headerStyle: { backgroundColor: "#121212" },
    headerTintColor: "#fff",
    cardStyle: { backgroundColor: "#121212" },
    gestureEnabled: true,
    ...TransitionPresets.ModalSlideFromBottomIOS, // smooth slide + fade animation
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Home" options={{ title: "Christoffel’s Menu" }}>
          {(props) => (
            <HomeScreen {...props} menuItems={menuItems} addItem={addItem} />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="AddItem"
          options={{ title: "Add Menu Item" }}
        >
          {(props) => <AddItemScreen {...props} addItem={addItem} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
