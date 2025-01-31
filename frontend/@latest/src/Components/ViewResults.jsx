import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader2, Trophy, AlertCircle, Search, ChevronUp, ChevronDown } from "lucide-react";

const QuizResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchResults = async () => {
            try {
                const token = sessionStorage.getItem("token");
                const response = await axios.get("https://online-quiz-4.onrender.com/results", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("API Response:", response.data);
                setResults(response.data);
            } catch (err) {
                setError("Failed to fetch results.");
                console.error("Error fetching results:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white p-8 rounded-lg shadow-lg flex items-center space-x-4">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">Loading Results</h3>
                        <p className="text-sm text-gray-500">Please wait while we fetch the quiz results...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-red-50 p-6 rounded-lg shadow-sm max-w-md w-full">
                    <div className="flex items-center space-x-3">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                        <h3 className="text-lg font-medium text-red-800">Error Loading Results</h3>
                    </div>
                    <p className="mt-2 text-sm text-red-700 ml-9">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Trophy className="w-8 h-8 text-white" />
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Quiz Results</h2>
                                    <p className="text-blue-100 text-sm">
                                        Showing {results.length} total results
                                    </p>
                                </div>
                            </div>
                            <div className="relative">
                                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search results..."
                                    className="pl-10 pr-4 py-2 rounded-lg border border-blue-400 bg-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Results Table */}
                    {results.length === 0 ? (
                        <div className="text-center py-12">
                            <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900">No Results Available</h3>
                            <p className="text-gray-500 mt-2">Start taking quizzes to see your results here.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200">
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                                                <span>Username</span>
                                                <ChevronUp className="w-4 h-4" />
                                            </div>
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                                                <span>Quiz Name</span>
                                                <ChevronDown className="w-4 h-4" />
                                            </div>
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center space-x-1 cursor-pointer hover:text-gray-700">
                                                <span>Score</span>
                                                <ChevronDown className="w-4 h-4" />
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {results.map((result, index) => (
                                        <tr 
                                            key={index}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {result.username}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {result.quiz_name || "N/A"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                                        <div 
                                                            className="bg-blue-600 h-2 rounded-full"
                                                            style={{ width: `${result.score}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {result.score}%
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuizResults;