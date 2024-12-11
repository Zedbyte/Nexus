import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';

function ContactForm() {
    const [state, handleSubmit] = useForm("myzyanaw"); // Replace with your Formspree form ID

    return (
        <div>
            {/* Hero Banner */}
            <div className="hero-section text-center py-5" style={{ backgroundColor: '#f9fafe' }}>
                <Container>
                    <h1 className="display-4 fw-bold">Get in Touch</h1>
                    <p className="mt-3">
                        Have a question, feedback, or just want to say hello? <br />
                        We're here to help and would love to hear from you!
                    </p>
                </Container>
            </div>

            {/* Contact Form Section */}
            <div className="contact-section py-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={8}>
                            {state.succeeded ? (
                                <Alert variant="success" className="text-center">
                                    Thank you! Your message has been sent successfully.
                                </Alert>
                            ) : (
                                <Form onSubmit={handleSubmit} className="shadow p-4 rounded bg-white">
                                    <h2 className="mb-4 text-center fw-bold">Contact Us</h2>
                                    <Form.Group className="mb-4">
                                        <Form.Label htmlFor="name" className="fw-bold">Name</Form.Label>
                                        <Form.Control
                                            id="name"
                                            type="text"
                                            name="name"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                        <ValidationError
                                            prefix="Name"
                                            field="name"
                                            errors={state.errors}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label htmlFor="email" className="fw-bold">Email</Form.Label>
                                        <Form.Control
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email address"
                                            required
                                        />
                                        <ValidationError
                                            prefix="Email"
                                            field="email"
                                            errors={state.errors}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label htmlFor="message" className="fw-bold">Message</Form.Label>
                                        <Form.Control
                                            id="message"
                                            as="textarea"
                                            name="message"
                                            rows={5}
                                            placeholder="Write your message here"
                                            required
                                        />
                                        <ValidationError
                                            prefix="Message"
                                            field="message"
                                            errors={state.errors}
                                        />
                                    </Form.Group>
                                    <div className="text-center">
                                        <Button type="submit" variant="primary" size="lg" disabled={state.submitting}>
                                            Send Message
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default ContactForm;
