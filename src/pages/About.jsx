import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function About() {
    return (
        <Container className="mt-4">
        <Row>
            <Col>
            <h2>About Us</h2>
            <p>
                Welcome to our blog website! We are a passionate group of writers and tech enthusiasts
                dedicated to sharing knowledge and inspiring our readers.
            </p>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col md={4}>
            <Card>
                <Card.Body>
                <Card.Title>John Doe</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Founder & Lead Writer</Card.Subtitle>
                <Card.Text>
                    John is an experienced tech journalist with a passion for emerging technologies.
                </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            <Col md={4}>
            <Card>
                <Card.Body>
                <Card.Title>Jane Smith</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Senior Editor</Card.Subtitle>
                <Card.Text>
                    Jane brings her expertise in web development and user experience design to our team.
                </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            <Col md={4}>
            <Card>
                <Card.Body>
                <Card.Title>Mike Johnson</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Content Strategist</Card.Subtitle>
                <Card.Text>
                    Mike ensures that our content is engaging, informative, and relevant to our readers.
                </Card.Text>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </Container>
    );
}

export default About;

