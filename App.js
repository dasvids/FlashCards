import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import FlashcardList from "./src/FlashcardList";

export default function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
  return (
    <View style={styles.container}>
      <FlashcardList flashcards={flashcards} />
    </View>
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "What is 2 + 2 ?",
    answer: "4",
    options: ["2", "3", "4", "6"],
  },
  {
    id: 2,
    question: "What is wawa?",
    answer: "cat",
    options: ["otter", "cat", "dog", "parrot"],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c8d0d2',
    padding: 16
  },
});
