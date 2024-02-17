import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function Flashcard({ flashcard }) {
  const [flipped, setFlipped] = useState(false);
  

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const frontRotateY = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: withTiming(flipped ? "180deg" : "0deg") }],
    };
  });

  const backRotateY = useAnimatedStyle(() => {
    return {
      transform: [{ rotateY: withTiming(flipped ? "0deg" : "180deg") }],
    };
  });

  return (
    <TouchableOpacity onPress={handleFlip} style={styles.cardContainer}>
      <Animated.View style={[styles.card, frontRotateY]}>
        <Text style={styles.question}>{flashcard.question}</Text>
        <View style={styles.optionsContainer}>
          {flashcard.options.map((option, index) => (
            <Text key={index} style={styles.option}>
              {option}
            </Text>
          ))}
        </View>
      </Animated.View>
      <Animated.View style={[styles.card, styles.backCard, backRotateY]}>
        <Text style={styles.answer}>{flashcard.answer}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: 150,
    height: 150,
    perspective: 1000,
    overflow: "hidden", 
    margin: 4,
    borderRadius: 8,
  },
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
    position: "absolute",
  },
  backCard: {
    transform: [{ rotateY: "180deg" }],
    top: 0,
    left: 0,
  },
  question: {
    fontSize: 20,
    marginBottom: 10,
  },
  optionsContainer: {
    alignItems: "center",
  },
  option: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  answer: {
    fontSize: 20,
  },
});
