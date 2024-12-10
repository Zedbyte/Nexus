import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Home() {
    return (
        <Container className="mt-4">
        <Row>
            <Col>
            <h1>Welcome to Our Blog</h1>
            <p>Discover amazing content and share your thoughts with our community.</p>
            </Col>
        </Row>
        <Row className="mt-4">
            <Col md={4}>
            <Card>
                <Card.Body>
                <Card.Title>Latest Posts</Card.Title>
                <Card.Text>Check out our most recent blog posts.</Card.Text>
                </Card.Body>
            </Card>
            </Col>
            <Col md={4}>
            <Card>
                <Card.Body>
                <Card.Title>Featured Authors</Card.Title>
                <Card.Text>Meet our top contributors.</Card.Text>
                </Card.Body>
            </Card>
            </Col>
            <Col md={4}>
            <Card>
                <Card.Body>
                <Card.Title>Categories</Card.Title>
                <Card.Text>Explore topics that interest you.</Card.Text>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </Container>
    );
}

export default Home;

