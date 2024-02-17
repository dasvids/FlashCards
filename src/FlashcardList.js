import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Flashcard from "./Flashcard";

export default function FlashcardList({ flashcards }) {

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Flashcard flashcard={item} />
    </TouchableOpacity>
  );

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
    justifyContent: "flex-start", 
    alignItems: "center",
  },
  itemContainer: {
    marginHorizontal: 4,
    marginVertical: 4,
  },
});
