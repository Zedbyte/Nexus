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
        profilePicture: null, // Add profilePicture field
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profilePicture') {
            setFormData({ ...formData, profilePicture: files[0] }); // Handle file input
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
        <Container className="mt-4">
            <Row>
                <Col md={8} className="mx-auto">
                    <h2>Register</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
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
                                    <Form.Label>Profile Picture</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="profilePicture"
                                        accept="image/*"
                                        onChange={handleChange}
                                    />
                                </Form.Group>
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
