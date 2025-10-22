import React, { useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet, Animated } from "react-native";

interface Props {
  item: {
    name: string;
    description: string;
    course: string;
    price: number;
    image?: string;
  };
  index?: number; // Index prop for staggered animation timing
}

/* Code Attribution
   Author: Meta Platforms, Inc.
   Title: Animated API - Parallel and Timing Methods
   Date Published: 2024
   Link/URL: https://reactnative.dev/docs/animated
   Date Accessed: 2025-10-22
   Description: Used Animated.parallel and Animated.timing for staggered card animations with fade and slide effects
*/

export default function MenuItemCard({ item, index = 0 }: Props) {
  // Animated values for fade and slide effects
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  // Trigger staggered animations on component mount
  useEffect(() => {
    Animated.parallel([
      // Fade-in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: index * 150, // Staggered delay based on card index
        useNativeDriver: true,
      }),
      // Slide-up animation
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        delay: index * 150, // Staggered delay based on card index
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {/* Display menu item image if available */}
      {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
      
      {/* Menu item details */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.desc}>{item.description}</Text>
        <Text style={styles.course}>{item.course}</Text>
        <Text style={styles.price}>R {item.price.toFixed(2)}</Text>
      </View>
    </Animated.View>
  );
}

/* Code Attribution
   Author: Meta Platforms, Inc.
   Title: Image Component - React Native Documentation
   Date Published: 2024
   Link/URL: https://reactnative.dev/docs/image
   Date Accessed: 2025-10-22
   Description: Used Image component to display menu item photos
*/

// Stylesheet for card component styling
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginVertical: 8,
    padding: 10,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: { flex: 1, justifyContent: "center" },
  title: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  desc: { color: "#bbb", fontSize: 13, marginVertical: 3 },
  course: { color: "#1E90FF", fontSize: 13 },
  price: { color: "#fff", fontWeight: "bold", marginTop: 5 },
});