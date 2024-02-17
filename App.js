import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions  } from "react-native";
import FlashcardList from "./src/FlashcardList";
import axios from "axios";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const baseFontSize = 16;


export default function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);

  useEffect(() => {
    axios.get("https://opentdb.com/api.php?amount=10").then((res) => {
      setFlashcards(
        res.data.results.map((questionItem, index) => {
          const answer = decodeEntities(questionItem.correct_answer);
          const options = [...questionItem.incorrect_answers.map(a => decodeEntities(a)), answer];
          return {
            id: `${index} - ${Date.now()}`,
            question: decodeEntities(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
    });
  }, []);

  const decodeEntities = (encodedString) => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(
      "<!doctype html><body>" + encodedString,
      "text/html"
    );
    return dom.body.textContent;
  };

  return (
    <View style={styles.body}>
      <View style={styles.container}>
      <FlashcardList flashcards={flashcards} />
      </View>
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
    flexGrow: 1,
    flexBasis: screenWidth / baseFontSize, // Минимальная ширина карточки в rem
    marginTop: screenHeight / baseFontSize, // Верхний отступ в rem
    marginBottom: screenHeight / baseFontSize, // Нижний отступ в rem
    marginLeft: (screenWidth * 2) / baseFontSize, // Левый отступ в rem
    marginRight: (screenWidth * 2) / baseFontSize, // Правый отступ в rem
  },
  body:{
    flex: 1,
    backgroundColor: "#c8d0d2",
  }
});
