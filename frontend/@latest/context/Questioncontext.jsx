// src/context/QuestionContext.js
import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';

const QuestionContext = createContext();

const QuestionProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(() => sessionStorage.getItem("token")); // Load token on start
    const [userRole, setUserRole] = useState(() => sessionStorage.getItem("role")); // Get role from session

    const addQuestion = async (quizId, questionText, correctAnswer) => {
        const authToken = sessionStorage.getItem("token"); // Retrieve token before request
     
        if (!authToken) {
            toast.error("Authentication token is missing. Please log in.");
            return;
        }

        if (!questionText || !correctAnswer) {
            toast.error("Question text and correct answer are required!");
            return;
        }

        toast.loading("...Adding Question");

        try {
            console.log("Sending question data:", { quizId, questionText, correctAnswer });
            console.log("authToken:", authToken);

            const response = await fetch(`https://online-quiz-4.onrender.com/${quizId}/questions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`, // Use the retrieved token
                },
                body: JSON.stringify({ question_text: questionText, correct_answer: correctAnswer }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error response from server:", errorData);
                throw new Error(`Error adding question: ${errorData.msg || response.statusText}`);
            }

            const data = await response.json();
            toast.dismiss();
            toast.success(data.message || "Question added successfully!");
        } catch (error) {
            toast.dismiss();
            toast.error("Failed to add question. Please try again.");
            console.error("Error adding question:", error);
        }
    };

    const getQuestions = async (quizId) => {
        const authToken = sessionStorage.getItem("token"); // Get stored token
    
        if (!authToken) {
            toast.error("Authentication token is missing. Please log in.");
            return;
        }
    
        try {
            const response = await fetch(`https://online-quiz-4.onrender.com/${quizId}/questions`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${authToken}`,
                },
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error fetching questions:", errorData);
                throw new Error(errorData.message || "Failed to load questions.");
            }
    
            const data = await response.json();
            console.log("Fetched Questions:", data);
            return data; // Return fetched questions
        } catch (error) {
            toast.error("Failed to fetch questions. Please try again.");
            console.error("Error fetching questions:", error);
        }
    };
    

    const data = {
        addQuestion,
        getQuestions,
        userRole,
    };

    return (
        <QuestionContext.Provider value={data}>
            {children}
        </QuestionContext.Provider>
    );
};

// Export the context and provider
export { QuestionContext, QuestionProvider };
