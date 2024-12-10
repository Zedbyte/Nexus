import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function ContactForm() {
    const [state, handleSubmit] = useForm("mgveblvv"); // Replace with your Formspree form ID

    return (
        <Container className="mt-4">
            <h2>Contact Us</h2>
            {state.succeeded ? (
                <Alert variant="success">Thank you! Your message has been sent.</Alert>
            ) : (
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="name">Name</Form.Label>
                        <Form.Control
                            id="name"
                            type="text"
                            name="name"
                            required
                        />
                        <ValidationError 
                            prefix="Name" 
                            field="name"
                            errors={state.errors}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control
                            id="email"
                            type="email"
                            name="email"
                            required
                        />
                        <ValidationError 
                            prefix="Email" 
                            field="email"
                            errors={state.errors}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="message">Message</Form.Label>
                        <Form.Control
                            id="message"
                            as="textarea"
                            name="message"
                            rows={5}
                            required
                        />
                        <ValidationError 
                            prefix="Message" 
                            field="message"
                            errors={state.errors}
                        />
                    </Form.Group>
                    <Button type="submit" disabled={state.submitting}>
                        Send
                    </Button>
                </Form>
            )}
        </Container>
    );
}

export default ContactForm;
