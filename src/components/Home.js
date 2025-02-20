import React, { useState } from "react";
import { useTimer } from "react-timer-hook";
import { motion } from "framer-motion";

const sampleQuestions = [
    { question: "Which planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth", "Mars"], correct: "Mercury" },
    { question: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?", options: ["Stack", "Queue", "Tree", "Graph"], correct: "Queue" },
    { question: "Which of the following is primarily used for structuring web pages?", options: ["Python", "Java", "HTML", "C++"], correct: "HTML" },
    { question: "Which chemical symbol stands for Gold?", options: ["Au", "Gd", "Ag", "Pt"], correct: "Au" },
];

export default function QuizApp() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white p-5">
            <h1 className="text-4xl font-bold mb-6">Quiz Game</h1>
            <motion.div className="w-full max-w-md bg-gray-700 p-6 rounded-lg shadow-lg text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <h2 className="text-lg font-semibold mb-4">{sampleQuestions[currentQuestion].question}</h2>
                <motion.div className="text-xl font-bold mb-4" animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                    ⏳ {seconds}s Left
                </motion.div>
                {sampleQuestions[currentQuestion].options.map((option, index) => (
                    <motion.button
                        key={index}
                        className={`block w-full py-2 px-4 my-2 rounded-lg border ${selectedAnswer === option ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}`}
                        onClick={() => handleAnswer(option)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {option}
                    </motion.button>
                ))}
                <p className={`mt-4 text-lg font-semibold ${feedback.includes('Correct') ? 'text-green-400' : 'text-red-400'}`}>{feedback}</p>
                <motion.button className="mt-4 px-6 py-2 bg-blue-600 rounded-lg text-white font-semibold disabled:opacity-50" onClick={handleNext} disabled={!selectedAnswer} whileHover={{ scale: 1.05 }}>
                    Next ➡️
                </motion.button>
                <div className="mt-6 text-lg font-semibold">Progress</div>
                <progress className="w-full h-2 mt-2 bg-gray-500" value={(score / sampleQuestions.length) * 100} max="100"></progress>
            </motion.div>
            {finalResult && (
                <motion.p className="mt-6 text-xl font-bold text-green-400" animate={{ opacity: [0, 1], y: [10, 0] }} transition={{ duration: 0.5 }}>
                    {finalResult}
                </motion.p>
            )}
        </div>
    );
}
