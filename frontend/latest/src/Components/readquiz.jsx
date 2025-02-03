import React, { useContext, useState, useEffect } from 'react';
import { QuizContext } from '../../context/Quizcontext';
import { QuestionContext } from '../../context/Questioncontext';
import { Link } from 'react-router-dom';
import { Book, Clock, PlusCircle, Eye, X, CheckCircle, Loader2, BookOpen } from 'lucide-react';

const QuizList = () => {
    const { quizzes, loading } = useContext(QuizContext);
    const { addQuestion } = useContext(QuestionContext);
    const [selectedQuizId, setSelectedQuizId] = useState("");
    const [questionText, setQuestionText] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [role, setRole] = useState(null);

    useEffect(() => {
        console.log("Selected Quiz ID after state update:", selectedQuizId);
    }, [selectedQuizId]);

    const handleAddQuestion = async (e) => {
        e.preventDefault();
        if (!selectedQuizId || !questionText || !correctAnswer) {
            alert("Please fill in all fields");
            return;
        }

        await addQuestion(selectedQuizId, questionText, correctAnswer);
        setShowForm(false);
        setQuestionText("");
        setCorrectAnswer("");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex items-center space-x-2 text-blue-600">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="text-lg font-medium">Loading quizzes...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-center mb-8">
                    <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
                    <h2 className="text-3xl font-bold text-gray-900">Available Quizzes</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map((quiz) => (
                        <div key={quiz.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-4">{quiz.title}</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center text-gray-600">
                                        <Book className="w-5 h-5 mr-2" />
                                        <span>Total Questions: {quiz.total_questions}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Clock className="w-5 h-5 mr-2" />
                                        <span>Duration: {quiz.total_time} minutes</span>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3">
                                    <button 
                                        onClick={() => {
                                            setSelectedQuizId(quiz.id);
                                            setShowForm(true);
                                        }}
                                        className="w-full flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300"
                                    >
                                        <PlusCircle className="w-5 h-5 mr-2" />
                                        Add Question
                                    </button>

                                    <Link 
                                        to={`/quizzes/${quiz.id}/questions`}
                                        className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                                    >
                                        <Eye className="w-5 h-5 mr-2" />
                                        View Questions
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Add Question Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-semibold text-gray-900">Add New Question</h3>
                                    <button 
                                        onClick={() => setShowForm(false)}
                                        className="text-gray-400 hover:text-gray-500"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <form onSubmit={handleAddQuestion} className="space-y-4">
                                    <div>
                                        <label htmlFor="questionText" className="block text-sm font-medium text-gray-700 mb-1">
                                            Question Text
                                        </label>
                                        <input
                                            type="text"
                                            id="questionText"
                                            value={questionText}
                                            onChange={(e) => setQuestionText(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="correctAnswer" className="block text-sm font-medium text-gray-700 mb-1">
                                            Correct Answer
                                        </label>
                                        <input
                                            type="text"
                                            id="correctAnswer"
                                            value={correctAnswer}
                                            onChange={(e) => setCorrectAnswer(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                            required
                                        />
                                    </div>

                                    <div className="flex space-x-3 pt-4">
                                        <button
                                            type="submit"
                                            className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                        >
                                            <CheckCircle className="w-5 h-5 mr-2" />
                                            Add Question
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowForm(false)}
                                            className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                        >
                                            <X className="w-5 h-5 mr-2" />
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizList;