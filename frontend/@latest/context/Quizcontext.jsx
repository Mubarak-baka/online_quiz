import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const navigate = useNavigate();
    const [authToken, setAuthToken] = useState(() => sessionStorage.getItem("token"));
    const [quizzes, setQuizzes] = useState([]); // State to hold quizzes
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [userRole, setUserRole] = useState(() => sessionStorage.getItem("role")); // Get role from session
    // Validate quiz data before submitting
    const validateQuizData = (title, total_time, total_questions) => {
        if (!title || !total_time || !total_questions) {
            toast.error("Please fill in all fields");
            return false;
        }
        return true;
    };

    // Fetch quizzes from the API
    const fetchQuizzes = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:5000/quizzes", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`, // Use the token for protected route
                },
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error fetching quizzes:", errorData); // Log the error response
                throw new Error(`Error fetching quizzes: ${errorData.error || response.statusText}`);
            }
    
            const data = await response.json();
            console.log("Fetched quizzes:", data); // Log the fetched quizzes
            setQuizzes(data); // Assuming the response is an array of quizzes
        } catch (error) {
            toast.error("Failed to fetch quizzes. Please try again.");
            console.error("Error fetching quizzes:", error);
        } finally {
            setLoading(false);
        }
    };
    // Add new quiz
    const addQuiz = async (title, total_time, total_questions) => {
        if (!validateQuizData(title, total_time, total_questions)) return;

        toast.loading("...Adding Quiz");

        try {
            const response = await fetch("http://127.0.0.1:5000/quizzes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`, // Use the token for protected route
                },
                body: JSON.stringify({ title, total_time, total_questions }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error adding quiz: ${errorData.error || response.statusText}`);
            }

            const data = await response.json();

            if (data.message) {
                toast.dismiss();
                toast.success(data.message);
                navigate("/readquiz"); // Redirect after success
            } else {
                toast.dismiss();
                toast.error(data.error || "Failed to add quiz");
            }
        } catch (error) {
            toast.dismiss();
            toast.error("Failed to add quiz. Please try again.");
            console.error("Error adding quiz:", error);
        }
    };

    // Fetch quizzes when the component mounts
    useEffect(() => {
        fetchQuizzes();
    }, []); // Empty dependency array means this runs once on mount

    // Data object to share within the context
    const data = {
        userRole,
        quizzes,
        loading,
        addQuiz,
        fetchQuizzes, // Include fetchQuizzes in the context
    };

    return (
        <QuizContext.Provider value={data}>
            {children}
        </QuizContext.Provider>
    );
};

//testing purposes 