import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/blogs'); // Replace with your API endpoint

                // Parse the image blob into a base64 string
                const parsedBlogs = response.data.map((blog) => ({
                    ...blog,
                    image: blog.image
                        ? `data:image/jpeg;base64,${Buffer.from(blog.image.data).toString('base64')}`
                        : null,
                }));

                console.log('Parsed blogs:', parsedBlogs);
                

                setBlogs(parsedBlogs);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setError('Failed to load blogs. Please try again later.');
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border" />
                <p>Loading blogs...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Row>
                <Col md={8} className="mx-auto">
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <Card className="mb-4" key={blog.id}>
                                <Card.Header>
                                    <strong>{blog.author || 'Unknown Author'}</strong> -{' '}
                                    <small>{new Date(blog.created_at).toLocaleString()}</small>
                                </Card.Header>
                                {blog.image && (
                                    <Card.Img variant="top" src={blog.image} alt={blog.title} />
                                )}
                                <Card.Body>
                                    <Card.Title>{blog.title}</Card.Title>
                                    <Card.Text>{blog.content}</Card.Text>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <Alert variant="info">No blogs available at the moment.</Alert>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default BlogList;
