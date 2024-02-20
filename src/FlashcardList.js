import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Flashcard from "./Flashcard";

export default function FlashcardList({ flashcards }) {
  return (
    <ScrollView contentContainerStyle={styles.cardGrid}>
      {flashcards.map((flashcard) => (
        <TouchableOpacity key={flashcard.id} style={styles.itemContainer}>
          <Flashcard flashcard={flashcard} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemContainer: {
    marginHorizontal: 4,
    marginVertical: 4,
  },
});
