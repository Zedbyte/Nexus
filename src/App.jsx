import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Routes>
      </Router>
    </>
  )
}

export default App
