import React from "react";
import { View, Text, StyleSheet, FlatList  } from "react-native";
import Flashcard from "./Flashcard";

export default function FlashcardList({ flashcards }) {

  const renderItem = ({ item }) => <Flashcard flashcard={item} />;
  //props.flashcards
  return (
    <FlatList
      data={flashcards}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.cardGrid}
    />
  );
}

const styles = StyleSheet.create({
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    justifyContent: "center",
    alignItems: "center",
  }
});
