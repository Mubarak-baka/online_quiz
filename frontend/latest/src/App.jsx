import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Register from "./Components/Register";
import NoPage from "./Components/NoPage";
import NavBar from "./Components/NavBar";  // Import your Navbar here
import Profile from "./Components/profile";
import Addquiz from './Components/Addquiz';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from '../context/UserContext';
import { QuizProvider } from '../context/Quizcontext';
import { ToastContainer } from "react-toastify";
import {QuestionProvider} from '../context/Questioncontext'
import QuizQuestions from "./Components/Quizquestions";
import ViewResults from "./Components/ViewResults";
import Footer from "./Components/Footer";
import './App.css';

import Readquiz from "./Components/readquiz"
function App() {
  return (
    <BrowserRouter>
    <UserProvider>
      <QuizProvider>
        <QuestionProvider>  
          <ToastContainer />
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Login" element={<Login />} />
            <Route path="Addquiz" element={<Addquiz />} />
            <Route path="Readquiz" element={<Readquiz />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="ViewResults" element={<ViewResults />} />
            <Route path="/quizzes/:quizId/questions" element={<QuizQuestions />} />
            <Route path="Register" element={<Register />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
          <Footer />
        </QuestionProvider>
      </QuizProvider>
    </UserProvider>
  </BrowserRouter>
  );
}

export default App;
