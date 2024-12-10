import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../middleware/AuthContext';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                usernameOrEmail: email,
                password,
            });
            if (response.data.success) {
                const user = response.data.user;

                // Save user data in local storage or a global state
                localStorage.setItem('user', JSON.stringify(user));

                login(); // Update auth state
                navigate('/blog'); // Redirect to blog route
            } else {
                setError('Login failed');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'An unexpected error occurred');
        }
    };

    return (
        <div>
            {/* Hero Section */}
            <div className="hero-section text-center py-5" style={{ backgroundColor: '#f9fafe' }}>
                <Container>
                    <h1 className="display-4 fw-bold">Welcome Back</h1>
                    <p className="mt-3">
                        Log in to your account and continue exploring amazing blogs and insights.
                    </p>
                </Container>
            </div>

            {/* Login Form Section */}
            <div className="login-section py-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <h2 className="text-center mb-4">Login</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">
                                <Form.Group className="mb-3">
                                    <Form.Label className="fw-bold">Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-bold">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <div className="text-center">
                                    <Button variant="primary" type="submit" size="lg" className="w-100">
                                        Login
                                    </Button>
                                </div>
                                <p className="text-center mt-3">
                                    Don't have an account? <a href="/signup" className="text-primary">Sign Up</a>
                                </p>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Login;
