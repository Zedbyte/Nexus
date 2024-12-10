import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

function Blog() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = { title, content, image };
        setPosts([...posts, newPost]);
        setTitle('');
        setContent('');
        setImage('');
    };

    return (
        <Container className="mt-4">
        <Row>
            <Col md={8}>
            <h2>Blog Posts</h2>
            {posts.map((post, index) => (
                <Card key={index} className="mb-3">
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.content}</Card.Text>
                    {post.image && <Card.Img src={post.image} alt={post.title} />}
                </Card.Body>
                </Card>
            ))}
            </Col>
            <Col md={4}>
            <h2>Add New Post</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Image URL (optional)</Form.Label>
                <Form.Control
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                </Form.Group>
                <Button variant="primary" type="submit">
                Add Post
                </Button>
            </Form>
            </Col>
        </Row>
        </Container>
    );
}

export default Blog;

