import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { QuestionContext } from "../../context/Questioncontext";
import { Timer, Brain, Send, Award, Loader2 } from "lucide-react";
import axios from 'axios';
import { toast } from 'react-toastify';

const QuizQuestions = () => {
    const { quizId } = useParams();
    const { getQuestions } = useContext(QuestionContext);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    
    useEffect(() => {
        if (!quizId) {
            console.error("No quizId provided");
            setLoading(false);
            return;
        }

        const fetchQuestions = async () => {
            try {
                const fetchedQuestions = await getQuestions(quizId);
                setQuestions(fetchedQuestions);
                // Initialize answers object with empty strings for each question
                const initialAnswers = fetchedQuestions.reduce((acc, q) => ({
                    ...acc,
                    [q.question_id]: ''
                }), {});
                setAnswers(initialAnswers);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching questions:", error);
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [quizId, getQuestions]);

    const handleChange = (questionId, answer) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: answer,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate that all questions have been answered
        const unansweredQuestions = questions.filter(q => !answers[q.question_id]?.trim());
        if (unansweredQuestions.length > 0) {
            toast.warning(`Please answer all questions before submitting.`);
            return;
        }

        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.post(
                `https://online-quiz-4.onrender.com/${quizId}/attempt`,
                answers,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setScore(response.data.score);
            toast.success(`Your score is: ${response.data.score}`);
        } catch (error) {
            console.error("Error submitting quiz attempt:", error);
            toast.error("Failed to submit quiz.");
        }
    };

    const nextQuestion = () => {
        // Only proceed if current question is answered
        const currentQuestionId = questions[currentQuestion].question_id;
        if (!answers[currentQuestionId]?.trim()) {
            toast.warning("Please answer the current question before proceeding.");
            return;
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const previousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex items-center space-x-2">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                    <span className="text-lg font-medium text-gray-700">Loading questions...</span>
                </div>
            </div>
        );
    }

    if (questions.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No questions found</h3>
                    <p className="text-gray-500">This quiz doesn't have any questions yet.</p>
                </div>
            </div>
        );
    }

    if (score !== null) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Award className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900">Quiz Completed!</h3>
                    <p className="text-lg text-gray-600 mt-2">Your score: {score}</p>
                </div>
            </div>
        );
    }

    const currentQuestionData = questions[currentQuestion];

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-blue-600 p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-white">Quiz {quizId}</h3>
                            <div className="flex items-center space-x-2 text-blue-100">
                                <Timer className="w-5 h-5" />
                                <span>Question {currentQuestion + 1} of {questions.length}</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="w-full bg-gray-200 h-1">
                        <div 
                            className="bg-blue-600 h-1 transition-all duration-300"
                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        />
                    </div>

                    {/* Question */}
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="mb-8">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">
                                {currentQuestionData.question_text}
                            </h4>
                            <input
                                type="text"
                                placeholder="Type your answer here..."
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                onChange={(e) => handleChange(currentQuestionData.question_id, e.target.value)}
                                value={answers[currentQuestionData.question_id] || ''}
                            />
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between mt-6">
                            <button
                                type="button"
                                onClick={previousQuestion}
                                className={`px-4 py-2 rounded-lg font-medium ${
                                    currentQuestion === 0
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                                disabled={currentQuestion === 0}
                            >
                                Previous
                            </button>

                            {currentQuestion === questions.length - 1 ? (
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center space-x-2"
                                >
                                    <span>Submit Quiz</span>
                                    <Send className="w-4 h-4" />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={nextQuestion}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Next Question
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Question dots */}
                <div className="flex justify-center space-x-2 mt-6">
                    {questions.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                                index === currentQuestion
                                    ? 'bg-blue-600'
                                    : answers[questions[index].question_id]?.trim()
                                    ? 'bg-blue-300'
                                    : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuizQuestions;