import React from "react";
import { View, Text, StyleSheet, FlatList  } from "react-native";
import Flashcard from "./Flashcard";

export default function FlashcardList({ flashcards }) {
  //props.flashcards
  return (
    <View style={styles.cardGrid}>
      {flashcards.map((flashcard) => {
        return <Flashcard flashcard={flashcard} key={flashcard.id} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  }
});
