# QuizApp


# Simple Quiz App (React Native)

A simple quiz application built with **React Native** and **React Navigation**.  
It allows users to answer multiple-choice questions, see results, and track high scores.

---

## Features

Home screen with “Start Quiz” button  
Multiple-choice questions (one per screen)  
Shows correct/wrong answers  
Countdown timer per question  
Randomized question order  
Animated transitions on selection  
High score stored locally (AsyncStorage)  
Smooth progress bar showing quiz progress  
Restart option on result screen

---

## Tech Stack

- **React Native**
- **React Navigation**
- **AsyncStorage**
- **Animated API**

---



## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Vikramelyaraja/QuizApp.git
cd QuizApp

Install NodeModules with command -->npm install
Run Command --> npx react-native run-android

--------


How It Works 

------------------>

HomeScreen → Welcomes user → “Start Quiz” → navigates to quiz.

QuizScreen → Shows one question at a time.

             10s timer per question.

             Animations on selection.

             Progress bar.

ResultScreen → Displays total score and saved high score.

Restart → Takes user back to Home.

