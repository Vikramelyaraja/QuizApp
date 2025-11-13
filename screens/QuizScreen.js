import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { questions as allQuestions } from '../data/questions';

export default function QuizScreen({ navigation }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(10);

  // Animation Refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Randomize questions on mount
  useEffect(() => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
  }, []);

  // Timer logic
  useEffect(() => {
    if (timer === 0) {
      handleNext();
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Animate answer fade
  const triggerAnimation = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  // Animate progress bar
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (currentIndex + 1) / allQuestions.length,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentIndex]);

  const currentQuestion = questions[currentIndex];

  const handleOptionPress = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
    triggerAnimation();

    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = async () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimer(10);
    } else {
      // Save high score
      const prevHigh = await AsyncStorage.getItem('highScore');
      const highScore = prevHigh ? parseInt(prevHigh) : 0;
      if (score > highScore) {
        await AsyncStorage.setItem('highScore', score.toString());
      }
      navigation.navigate('Result', { score, total: questions.length });
    }
  };

  if (questions.length === 0) return null; // Wait for shuffle

  // Interpolate animated progress bar width
  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
      </View>

      {/* Timer */}
      <Text style={styles.timer}>⏱️ {timer}s left</Text>

      {/* Question */}
      <Text style={styles.question}>{currentQuestion.question}</Text>

      {/* Options */}
      {currentQuestion.options.map((option, index) => {
        const isCorrect = option === currentQuestion.correctAnswer;
        const isSelected = selectedOption === option;

        let backgroundColor = '#E0E0E0';
        if (isAnswered && isSelected) {
          backgroundColor = isCorrect ? '#4CAF50' : '#F44336';
        }

        return (
          <Animated.View
            key={index}
            style={[
              styles.optionWrapper,
              { opacity: isSelected ? fadeAnim : 1 },
            ]}
          >
            <TouchableOpacity
              style={[styles.optionButton, { backgroundColor }]}
              onPress={() => handleOptionPress(option)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          </Animated.View>
        );
      })}

      {/* Next Button */}
      {isAnswered && (
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex + 1 === questions.length ? 'Finish' : 'Next'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  timer: {
    fontSize: 18,
    alignSelf: 'flex-end',
    color: '#2196F3',
    marginBottom: 10,
  },
  question: { fontSize: 22, marginBottom: 20 },
  optionWrapper: { marginVertical: 5 },
  optionButton: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 10,
  },
  optionText: { fontSize: 18 },
  nextButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 18 },
});
