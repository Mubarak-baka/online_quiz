import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const QuizResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchResults = async () => {
            try {
                const token = sessionStorage.getItem("token");
                const response = await axios.get("http://127.0.0.1:5000/results", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("API Response:", response.data); // Debugging log
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
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex items-center space-x-2 text-blue-600">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span className="text-lg font-medium">Loading results...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-600 text-center p-4">{error}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quiz Results</h2>
            {results.length === 0 ? (
                <p className="text-gray-600">No results available.</p>
            ) : (
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 p-2">Username</th>
                            <th className="border border-gray-300 p-2">Quiz Name</th>
                            <th className="border border-gray-300 p-2">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => (
                            <tr key={index} className="border border-gray-300">
                                <td className="border border-gray-300 p-2 text-center">{result.username }</td>
                                <td className="border border-gray-300 p-2 text-center">{result.quiz_name || "N/A"}</td>
                                <td className="border border-gray-300 p-2 text-center">{result.score}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default QuizResults;
