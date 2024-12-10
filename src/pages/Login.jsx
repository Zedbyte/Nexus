import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
        setError('Please fill in all fields');
        } else {
        // Here you would typically send a request to your backend to authenticate the user
        console.log('Login attempt', { email, password });
        setError('');
        }
    };

    return (
        <Container className="mt-4">
        <Row>
            <Col md={6} className="mx-auto">
            <h2>Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </Form.Group>
                <Button variant="primary" type="submit">
                Login
                </Button>
            </Form>
            </Col>
        </Row>
        </Container>
    );
}

export default Login;

