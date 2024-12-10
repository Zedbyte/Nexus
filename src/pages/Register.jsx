import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Tabs, Tab, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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
        bio: '',
        profilePicture: null,
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profilePicture') {
            setFormData({ ...formData, profilePicture: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const data = new FormData();
            data.append('first_name', formData.firstName);
            data.append('last_name', formData.lastName);
            data.append('username', formData.username);
            data.append('phone_number', formData.phone);
            data.append('email_address', formData.email);
            data.append('password', formData.password);
            data.append('bio', formData.bio);
            if (formData.profilePicture) {
                data.append('profile_picture', formData.profilePicture);
            }

            const response = await axios.post('http://localhost:3000/api/users', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                setSuccess('User registered successfully!');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError('Registration failed.');
            }
        } catch (error) {
            console.error(error);
            setError('An error occurred during registration.');
        }
    };

    return (
        <div>
            {/* Hero Section */}
            <div className="hero-section text-center py-5" style={{ backgroundColor: '#f9fafe' }}>
                <Container>
                    <h1 className="display-4 fw-bold">Create Your Account</h1>
                    <p className="mt-3">
                        Join our community to access amazing blogs and share your insights.
                        It's fast, easy, and secure.
                    </p>
                </Container>
            </div>

            {/* Register Form Section */}
            <div className="register-section py-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8}>
                            <h2 className="text-center mb-4">Register</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            {success && <Alert variant="success">{success}</Alert>}
                            <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">
                                <Tabs
                                    activeKey={activeTab}
                                    onSelect={(k) => setActiveTab(k)}
                                    className="mb-3"
                                    justify
                                >
                                    <Tab eventKey="personal" title="Personal Information">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="firstName"
                                                placeholder="Enter your first name"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                placeholder="Enter your last name"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Tab>
                                    <Tab eventKey="contact" title="Contact Information">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">Email</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email address"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">Phone</Form.Label>
                                            <Form.Control
                                                type="tel"
                                                name="phone"
                                                placeholder="Enter your phone number"
                                                value={formData.phone}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Tab>
                                    <Tab eventKey="account" title="Account Information">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">Profile Picture</Form.Label>
                                            <Form.Control
                                                type="file"
                                                name="profilePicture"
                                                accept="image/*"
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">Username</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="username"
                                                placeholder="Enter your username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                placeholder="Enter your password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">Confirm Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="confirmPassword"
                                                placeholder="Confirm your password"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
                                    </Tab>
                                    <Tab eventKey="additional" title="Additional Details">
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold">Bio</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                name="bio"
                                                placeholder="Tell us a little about yourself"
                                                value={formData.bio}
                                                onChange={handleChange}
                                            />
                                        </Form.Group>
                                    </Tab>
                                </Tabs>
                                <Button variant="primary" type="submit" size="lg" className="w-100">
                                    Register
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Register;
