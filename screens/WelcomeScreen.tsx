import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

type WelcomeScreenNavProp = StackNavigationProp<RootStackParamList, "Welcome">;

interface Props {
  navigation: WelcomeScreenNavProp;
}

/* Code Attribution
   Author: Meta Platforms, Inc.
   Title: ImageBackground Component - React Native Documentation
   Date Published: 2024
   Link/URL: https://reactnative.dev/docs/imagebackground
   Date Accessed: 2025-10-22
   Description: Used ImageBackground component for creating welcome screen with background image
*/
export default function WelcomeScreen({ navigation }: Props) {
  return (
    // ImageBackground for full-screen background image
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=1600&fit=crop",
      }}
      style={styles.background}
      imageStyle={styles.imageStyle}
    >
      {/* Semi-transparent overlay for better text readability */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Christoffel's Kitchen</Text>

        {/* Button to navigate to Home screen */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Enter Menu</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

/* Code Attribution
   Author: Unsplash
   Title: Free Stock Photos
   Date Published: 2024
   Link/URL: https://unsplash.com/
   Date Accessed: 2025-10-22
   Description: Used Unsplash image for welcome screen background
*/

// Stylesheet for component styling
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.6)", // Dark overlay for text contrast
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 50,
    textShadowColor: "rgba(0,0,0,0.8)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  button: {
    backgroundColor: "#1E90FF",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: "#1E90FF",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
  },
});