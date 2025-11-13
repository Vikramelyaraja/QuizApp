import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ResultScreen({ route, navigation }) {
  const { score, total } = route.params;
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const fetchHighScore = async () => {
      const saved = await AsyncStorage.getItem('highScore');
      setHighScore(saved ? parseInt(saved) : 0);
    };
    fetchHighScore();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Completed!</Text>
      <Text style={styles.score}>Your Score: {score} / {total}</Text>
      <Text style={styles.highScore}>🏆 High Score: {highScore}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Restart Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 26, marginBottom: 20 },
  score: { fontSize: 20, marginBottom: 10 },
  highScore: { fontSize: 18, color: '#4CAF50', marginBottom: 30 },
  button: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 18 },
});
