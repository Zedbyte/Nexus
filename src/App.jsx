import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

// Pages
import Header from './components/Header';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogList from './pages/BlogList';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
// END Pages

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Stack, Button, Badge, Card } from "react-bootstrap";
// END Bootstrap

// React Router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// END React Router

// Middleware
import { AuthProvider } from './middleware/AuthContext';
// END Middleware

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/add-blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
