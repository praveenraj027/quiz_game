import React, { useState } from "react";
import "./QuizApp.css";
import { useTimer } from "react-timer-hook";
import { motion } from "framer-motion";

const sampleQuestions = [
    { question: "Which planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth", "Mars"], correct: "Mercury" },
    { question: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?", options: ["Stack", "Queue", "Tree", "Graph"], correct: "Queue" },
    { question: "Which of the following is primarily used for structuring web pages?", options: ["Python", "Java", "HTML", "C++"], correct: "HTML" },
    { question: "Which chemical symbol stands for Gold?", options: ["Au", "Gd", "Ag", "Pt"], correct: "Au" },
    { question: "Which of these processes is not typically involved in refining petroleum?", options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"], correct: "Filtration" },
    { question: "What is the value of 12 + 28?", options: ["40", "1228", "4028"], correct: "40" },
    { question: "How many states are there in the United States?", options: ["50", "48", "52"], correct: "50" },
    { question: "In which year was the Declaration of Independence signed?", options: ["1776", "1859", "1901", "1778"], correct: "1776" },
    { question: "What is the value of pi rounded to the nearest integer?", options: ["3", "4", "3.1", "3.2"], correct: "3" },
    { question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?", options: ["120", "30", "180", "90"], correct: "120" },
];

export default function QuizApp() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [finalResult, setFinalResult] = useState(null);


    const time = new Date();
    time.setSeconds(time.getSeconds() + 30);
    const { seconds, restart } = useTimer({ expiryTimestamp: time, onExpire: () => handleNext() });

    const handleAnswer = (answer) => {
        setSelectedAnswer(answer);
        if (answer === sampleQuestions[currentQuestion].correct) {
            setScore(score + 1);
            setFeedback("✅ Correct!");
        } else {
            setFeedback("❌ Wrong Answer!");
        }
    };
    const handleNext = () => {
        setAttempts([...attempts, { question: sampleQuestions[currentQuestion].question, answer: selectedAnswer, correct: sampleQuestions[currentQuestion].correct }]);

        if (currentQuestion < sampleQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setFeedback("");
            restart(time);
        } else {
            setFinalResult(`🎉 Quiz Completed! Your score: ${score}/${sampleQuestions.length}`);
        }
    };



    return (
        <>
            <div className="container">
                <h1>Quiz Game</h1>
                <motion.div className="quiz-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    <motion.div className="quiz-card" whileHover={{ scale: 1.05 }}>
                        <h2 className="quiz-question">{sampleQuestions[currentQuestion].question}</h2>
                        <motion.div className="quiz-timer" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                            ⏳ {seconds}s Left
                        </motion.div>
                        {sampleQuestions[currentQuestion].options.map((option, index) => (
                            <motion.button
                                key={index}
                                className={`quiz-option ${selectedAnswer === option ? 'selected' : ''}`}
                                onClick={() => handleAnswer(option)}
                                whileHover={{ scale: 1.05, backgroundColor: "#46484873", color: "#fff" }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {option}
                            </motion.button>
                        ))}
                        <motion.p className={`quiz-feedback ${feedback.includes('Correct') ? 'correct' : 'wrong'}`} animate={{ opacity: [0, 1], y: [10, 0] }} transition={{ duration: 0.5 }}>
                            {feedback}
                        </motion.p>
                        <motion.button className="quiz-next-button" onClick={handleNext} disabled={!selectedAnswer} whileHover={{ scale: 1.05 }}>
                            Next ➡️
                        </motion.button>
                    </motion.div>
                    <div className="quiz-progress">
                        <h3>Progress</h3>
                        <progress value={(score / sampleQuestions.length) * 100} max="100"></progress>
                    </div>
                </motion.div>
                {currentQuestion === sampleQuestions.length - 1 ? (
                    <motion.p className="quiz-feedback result" animate={{ opacity: [0, 1], y: [10, 0] }} transition={{ duration: 0.5 }}>
                        {finalResult}
                    </motion.p>
                ) : null}
            </div>
        </>
    );
}