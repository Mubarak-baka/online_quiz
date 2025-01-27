import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login"
import Home from "./Components/Home"
import Register from "./Components/Register"
import NoPage from "./Components/NoPage"
import NavBar from "./Components/NavBar"
import Footer from "./Components/Footer"
import Header from "./Components/Header"
import './App.css'
import { UserProvider } from '../context/UserContext';
import { BooksProvider } from '../context/BooksContext';
import { ToastContainer} from "react-toastify";


function App() {
 
    return (
    <BrowserRouter>
    <UserProvider>
    <BooksProvider>
    <Routes>
      <Route path="/" element={<NavBar/>}>
      <Route index element={<Home />} />
      <Route path="Login" element={<Login />} />
      <Route path="Register" element={<Register />} />
      <Route path="*" element={<NoPage />} />
      <Route path="Footer" element={<Footer  />} />
      <Route path="Header" element={<Header  />} />



      </Route>

    </Routes>
    </BooksProvider>
    </UserProvider>
    <ToastContainer />
    </BrowserRouter>
   
    )
  }


export default App
