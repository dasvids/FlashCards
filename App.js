import React, { useState, useEffect } from "react";
import { View, Button, TextInput, StyleSheet, Dimensions } from "react-native";
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import he from 'he';
import FlashcardList from "./src/FlashcardList";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const baseFontSize = 16;

export default function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("9");
  const [numberOfQuestions, setNumberOfQuestions] = useState("10");
  const [isLoading, setIsLoading] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php")
      .then((res) => setCategories(res.data.trivia_categories))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleFormSubmit = () => {
    if (canSubmit) {
      setIsLoading(true);
      axios.get('https://opentdb.com/api.php', {
        params: { amount: numberOfQuestions, category: selectedCategory }
      }).then(processFlashcards)
        .catch(error => console.error('Error fetching flashcards:', error))
        .finally(() => {
          setIsLoading(false);
          setCanSubmit(false);
          setTimeout(() => setCanSubmit(true), 5000);
        });
    }
  };

  const processFlashcards = (res) => {
    setFlashcards(res.data.results.map((questionItem, index) => {
      const answer = decodeEntities(questionItem.correct_answer);
      const options = [
        ...questionItem.incorrect_answers.map(a => decodeEntities(a)),
        answer
      ];
      return {
        id: `${index}-${Date.now()}`,
        question: decodeEntities(questionItem.question),
        answer: answer,
        options: options.sort(() => Math.random() - .5),
        difficulty: decodeEntities(questionItem.difficulty)
      };
    }));
  };

  const decodeEntities = (encodedString) => he.decode(encodedString);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Picker
          style={styles.picker}
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) => setSelectedCategory(itemValue)}>
          {categories.map(category => (
            <Picker.Item key={category.id} label={category.name} value={category.id} />
          ))}
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Number of questions"
          value={numberOfQuestions}
          onChangeText={text => setNumberOfQuestions(text)}
          keyboardType="numeric"
        />
        <Button
          title={isLoading ? "Loading..." : "Submit"}
          onPress={handleFormSubmit}
          disabled={isLoading || !canSubmit}
          style={styles.submitButton}
        />
      </View>
      <FlashcardList flashcards={flashcards} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c8d0d2",
    paddingHorizontal: (screenWidth * 2) / baseFontSize,
    paddingVertical: screenHeight / baseFontSize,
  },
  formContainer: {
    marginBottom: screenHeight / baseFontSize,
  },
  picker: {
    height: 50,
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  submitButton: {
    width: "100%",
  },
});
