import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Quiz App!</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quiz')}>
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  button: { backgroundColor: '#4CAF50', padding: 15, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 18 },
});
