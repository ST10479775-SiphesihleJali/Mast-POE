import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
  StackNavigationOptions,
} from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import AddItemScreen from "./screens/AddItemScreen";
import FilterScreen from "./screens/FilterScreen";

// TypeScript type definitions
export type CourseType = 'Starters' | 'Mains' | 'Desserts';

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: CourseType;
  price: number;
  image?: string;
};

/* Code Attribution
   Author: React Navigation Team
   Title: Stack Navigator with TransitionPresets - React Navigation Documentation
   Date Published: 2024
   Link/URL: https://reactnavigation.org/docs/stack-navigator/
   Date Accessed: 2024-10-22
   Description: Used for implementing stack navigation with custom transition animations
*/

/* Code Attribution
   Author: React Navigation Team
   Title: NavigationContainer - React Navigation Documentation
   Date Published: 2024
   Link/URL: https://reactnavigation.org/docs/navigation-container/
   Date Accessed: 2024-10-22
   Description: Used NavigationContainer as the wrapper for the navigation tree
*/

export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  AddItem: undefined;
  Filter: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const STORAGE_KEY = '@menu_items';

export default function App() {
  // State to manage menu items with initial data - 3 starters, 3 mains, 3 desserts
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
      description: "Crisp romaine with parmesan, croutons, and anchovy dressing.",
      course: "Starters",
      price: 95,
      image:
        "https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=800&q=80",
    },
    // Mains
    {
      id: "4",
      name: "Grilled Salmon",
      description: "Fresh salmon with lemon butter sauce and seasonal vegetables.",
      course: "Mains",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=870",
    },
    {
      id: "5",
      name: "Beef Fillet",
      description: "Tender beef fillet with red wine jus and truffle mash.",
      course: "Mains",
      price: 245,
      image:
        "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "6",
      name: "Chicken Supreme",
      description: "Pan-seared chicken breast with mushroom cream sauce.",
      course: "Mains",
      price: 165,
      image:
        "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80",
    },
    // Desserts
    {
      id: "7",
      name: "Crème Brûlée",
      description: "Classic French dessert with a caramelized sugar top.",
      course: "Desserts",
      price: 90,
      image:
        "https://images.unsplash.com/photo-1615235739538-95040f341ba8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=464",
    },
    {
      id: "8",
      name: "Chocolate Fondant",
      description: "Warm chocolate cake with molten center and vanilla ice cream.",
      course: "Desserts",
      price: 105,
      image:
        "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "9",
      name: "Lemon Tart",
      description: "Tangy lemon curd in a buttery pastry shell with meringue.",
      course: "Desserts",
      price: 85,
      image:
        "https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e?auto=format&fit=crop&w=800&q=80",
    },
  ]);

  /* Code Attribution
     Author: Unsplash
     Title: Free Stock Photos
     Date Published: 2024
     Link/URL: https://unsplash.com/
     Date Accessed: 2024-10-22
     Description: Used Unsplash image URLs for default menu item images
  */

  /* Code Attribution
     Author: React Native Community
     Title: AsyncStorage - React Native Async Storage
     Date Published: 2024
     Link/URL: https://react-native-async-storage.github.io/async-storage/
     Date Accessed: 2024-10-22
     Description: Used AsyncStorage for persisting menu items data locally
  */

  // Load items from storage on mount
  useEffect(() => {
    const loadItems = async () => {
      try {
        
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsedItems = JSON.parse(stored);
          // Only load from storage if it has items, otherwise keep initial data
          if (parsedItems && parsedItems.length > 0) {
            setMenuItems(parsedItems);
          }
        }
      } catch (error) {
        console.error('Error loading items:', error);
      }
    };
    loadItems();
  }, []);

  // Save items to storage whenever they change
  useEffect(() => {
    const saveItems = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(menuItems));
      } catch (error) {
        console.error('Error saving items:', error);
      }
    };
    saveItems();
  }, [menuItems]);

  // Function to add new menu items
  const addItem = (item: MenuItem) => {
    setMenuItems((prev) => [...prev, item]);
  };

  // Function to delete menu items by id
  const deleteItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Shared transition preset for smooth animations
  const screenOptions: StackNavigationOptions = {
    headerStyle: { backgroundColor: "#121212" },
    headerTintColor: "#fff",
    cardStyle: { backgroundColor: "#121212" },
    gestureEnabled: true,
    ...TransitionPresets.ModalSlideFromBottomIOS, // Smooth slide + fade animation
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        {/* Welcome screen - first screen shown to users */}
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        
        {/* Home screen - displays menu items */}
        <Stack.Screen name="Home" options={{ title: "Christoffel's Menu" }}>
          {(props) => (
            <HomeScreen {...props} menuItems={menuItems} deleteItem={deleteItem} />
          )}
        </Stack.Screen>
        
        {/* Add Item screen - form to add new menu items */}
        <Stack.Screen
          name="AddItem"
          options={{ title: "Add Menu Item" }}
        >
          {(props) => <AddItemScreen {...props} addItem={addItem} />}
        </Stack.Screen>

        {/* Filter screen - allows guests to filter menu by course */}
        <Stack.Screen
          name="Filter"
          options={{ headerShown: false }}
        >
          {(props) => <FilterScreen {...props} menuItems={menuItems} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}