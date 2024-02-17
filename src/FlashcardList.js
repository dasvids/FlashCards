import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Flashcard from "./Flashcard";

export default function FlashcardList({ flashcards }) {
  //props.flashcards
  return (
    <View>
      {flashcards.map((flashcard) => {
        return <Flashcard flashcard={flashcard} key={flashcard.id} />;
      })}
    </View>
  );
}
