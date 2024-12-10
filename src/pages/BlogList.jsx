import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

// Utility function to parse image data
const parseImage = (imageData) => {
    return imageData
        ? `data:image/jpeg;base64,${Buffer.from(imageData.data).toString('base64')}`
        : null;
};

function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            setError('');

            try {
                // Fetch user data from local storage
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user || !user.id) {
                    setError('User not authenticated. Please log in.');
                    setLoading(false);
                    return;
                }

                // Make the API call with the user_id as a query parameter
                const response = await axios.get('http://localhost:3000/api/blogs', {
                    params: {
                        user_id: user.id,
                    },
                });

                // Parse blogs and images
                const parsedBlogs = response.data.map((blog) => ({
                    ...blog,
                    image: parseImage(blog.image),
                }));

                setBlogs(parsedBlogs);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setError('Failed to load blogs. Please try again later.');
            } finally {
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
                                    {/* Render blog content as HTML */}
                                    <div
                                        className="blog-content"
                                        dangerouslySetInnerHTML={{ __html: blog.content }}
                                    />
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
