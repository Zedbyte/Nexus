import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Tabs, Tab, Alert } from 'react-bootstrap';

function Register() {
    const [activeTab, setActiveTab] = useState('personal');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        confirmPassword: '',
        bio: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        } else {
        // Here you would typically send a request to your backend to register the user
        console.log('Registration data', formData);
        setError('');
        }
    };

    return (
        <Container className="mt-4">
        <Row>
            <Col md={8} className="mx-auto">
            <h2>Register</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-3"
                >
                <Tab eventKey="personal" title="Personal Information">
                    <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    </Form.Group>
                </Tab>
                <Tab eventKey="contact" title="Contact Information">
                    <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    </Form.Group>
                </Tab>
                <Tab eventKey="account" title="Account Information">
                    <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    </Form.Group>
                    <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    </Form.Group>
                </Tab>
                <Tab eventKey="additional" title="Additional Details">
                    <Form.Group className="mb-3">
                    <Form.Label>Bio</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                    />
                    </Form.Group>
                </Tab>
                </Tabs>
                <Button variant="primary" type="submit">
                Register
                </Button>
            </Form>
            </Col>
        </Row>
        </Container>
    );
}

export default Register;

