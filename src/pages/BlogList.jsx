import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import { Container, Row, Col, Card, Spinner, Alert, Modal, Button } from 'react-bootstrap';

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
    const [showModal, setShowModal] = useState(false); // For showing the modal
    const [selectedBlog, setSelectedBlog] = useState(null); // To store the currently selected blog

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
                const response = await axios.get('http://localhost:3000/api/blogs/list', {
                    params: {
                        user_id: user.id, // Logged-in user's ID
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

    const handleViewClick = (blog) => {
        setSelectedBlog(blog); // Set the currently selected blog
        setShowModal(true); // Show the modal
    };

    const handleCloseModal = () => {
        setSelectedBlog(null); // Clear the selected blog
        setShowModal(false); // Hide the modal
    };

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
                            <Card className="mb-4 shadow border-0" key={blog.id}>
                                <Card.Header className="d-flex justify-content-between align-items-center bg-light">
                                    <strong>{blog.author || 'Unknown Author'}</strong>
                                    <small>{new Date(blog.created_at).toLocaleString()}</small>
                                </Card.Header>
                                {blog.image && (
                                    <Card.Img
                                        variant="top"
                                        src={blog.image}
                                        alt={blog.title}
                                        style={{ objectFit: 'cover', height: '200px' }}
                                    />
                                )}
                                <Card.Body>
                                    <Card.Title className="fw-bold">{blog.title}</Card.Title>
                                    {/* Render a preview of the blog content */}
                                    <div
                                        className="blog-content"
                                        dangerouslySetInnerHTML={{
                                            __html: blog.content.substring(0, 150) + '...',
                                        }}
                                    />
                                    <Button
                                        variant="primary"
                                        className="mt-3"
                                        onClick={() => handleViewClick(blog)}
                                    >
                                        View More
                                    </Button>
                                </Card.Body>
                            </Card>
                        ))
                    ) : (
                        <Alert variant="info">No blogs available at the moment.</Alert>
                    )}
                </Col>
            </Row>

            {/* Modal for Viewing Blog */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                {selectedBlog && (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title className="fw-bold">{selectedBlog.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                            {selectedBlog.image && (
                                <div className="text-center mb-3">
                                    <img
                                        src={selectedBlog.image}
                                        alt={selectedBlog.title}
                                        className="img-fluid rounded"
                                    />
                                </div>
                            )}
                            <div
                                dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                                className="blog-content"
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <small className="text-muted">
                                By {selectedBlog.author || 'Unknown Author'} on{' '}
                                {new Date(selectedBlog.created_at).toLocaleDateString()}
                            </small>
                        </Modal.Footer>
                    </>
                )}
            </Modal>
        </Container>
    );
}

export default BlogList;
