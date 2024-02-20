import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

const Flashcard = ({ flashcard }) => {
  const [flipped, setFlipped] = useState(false);

  
  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const frontRotateY = useAnimatedStyle(() => ({
    transform: [{ rotateY: withTiming(flipped ? "180deg" : "0deg") }],
    opacity: withTiming(flipped ? 0 : 1),
    zIndex: flipped ? -1 : 1,
  }));

  const backRotateY = useAnimatedStyle(() => ({
    transform: [{ rotateY: withTiming(flipped ? "0deg" : "-180deg") }],
    opacity: withTiming(flipped ? 1 : 0),
    zIndex: flipped ? 1 : -1,
  }));

  // Функция для определения цвета полоски в зависимости от сложности
  const getColorForDifficulty = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return '#00FF00'; // Зеленый для "easy"
      case 'medium':
        return '#FFA500'; // Оранжевый для "medium"
      case 'hard':
        return '#FF0000'; // Красный для "hard"
      default:
        return '#000000'; // Черный по умолчанию
    }
  };

  // Получение цвета для текущей сложности
  const difficultyColor = getColorForDifficulty(flashcard.difficulty);

  return (
    <TouchableOpacity onPress={handleFlip} style={styles.card}>
      <Animated.View style={[styles.content, frontRotateY]}>
        <View style={[styles.difficultyBar, { backgroundColor: difficultyColor }]} />
        <Text style={styles.text}>{flashcard.question}</Text>
        <View style={styles.optionsContainer}>
          {flashcard.options.map((option, index) => (
            <Text key={index} style={styles.option}>
              {option}
            </Text>
          ))}
        </View>
      </Animated.View>
      <Animated.View style={[styles.content, styles.backContent, backRotateY]}>
        <View style={[styles.difficultyBar, { backgroundColor: difficultyColor }]} />
        <Text style={styles.text}>{flashcard.answer}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 20,
    maxWidth: 400,
    maxHeight: 200, 
    position: 'relative',
  },
  content: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
    padding: 10,
    position: "relative",
  },
  backContent: {
    transform: [{ rotateY: "180deg" }],
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    fontSize: 18,
    textAlign: "left",
  },
  optionsContainer: {
    alignItems: "left",
    marginTop: 10,
    textAlign: "left",
  },
  option: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "left",
    color: "#555",
  },
  difficultyBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 5, 
  },
});

export default Flashcard;
