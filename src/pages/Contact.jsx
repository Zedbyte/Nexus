import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        console.log('Form submitted', formData);
        setSubmitted(true);
    };

    return (
        <Container className="mt-4">
        <Row>
            <Col md={6} className="mx-auto">
            <h2>Contact Us</h2>
            {submitted ? (
                <Alert variant="success">
                Thank you for your message. We'll get back to you soon!
                </Alert>
            ) : (
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    />
                </Form.Group>
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
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                    as="textarea"
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Send Message
                </Button>
                </Form>
            )}
            </Col>
        </Row>
        </Container>
    );
}

export default Contact;

