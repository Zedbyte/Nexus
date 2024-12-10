import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

// Pages
import Header from './components/Header';
import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
// END Pages

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Stack, Button, Badge, Card } from "react-bootstrap";
// END Bootstrap

// React Router
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// END React Router

function App() {
  return (
    <>
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
