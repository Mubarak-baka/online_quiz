import { useState, useContext } from "react";
import { QuizContext } from "../../context/Quizcontext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddQuiz = () => {
    const [title, setTitle] = useState("");
    const [totalTime, setTotalTime] = useState("");
    const [totalQuestions, setTotalQuestions] = useState("");
    const { addQuiz } = useContext(QuizContext);
    const navigate = useNavigate();

    // Form submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !totalTime || !totalQuestions) {
            toast.error("All fields are required!");
            return;
        }
        addQuiz(title, totalTime, totalQuestions);
        toast.success("Quiz added successfully!");
        navigate("/readquiz");
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg p-4 rounded">
                <h2 className="text-center mb-4">Add a New Quiz</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Quiz Title</label>
                        <input
                            type="text"
                            id="title"
                            className="form-control"
                            placeholder="Enter quiz title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="totalTime" className="form-label">Total Time (in minutes)</label>
                        <input
                            type="number"
                            id="totalTime"
                            className="form-control"
                            placeholder="Enter total time"
                            value={totalTime}
                            onChange={(e) => setTotalTime(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="totalQuestions" className="form-label">Total Questions</label>
                        <input
                            type="number"
                            id="totalQuestions"
                            className="form-control"
                            placeholder="Enter number of questions"
                            value={totalQuestions}
                            onChange={(e) => setTotalQuestions(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Add Quiz</button>
                </form>
            </div>
        </div>
    );
};

export default AddQuiz;
