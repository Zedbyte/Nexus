import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Modal } from 'react-bootstrap';
import axios from 'axios';
import { Buffer } from 'buffer';
import '../assets/home/Home.css'; // Add custom styles for animations

function Home() {
    const [latestBlogs, setLatestBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedBlog, setSelectedBlog] = useState(null); // For modal content
    const [showModal, setShowModal] = useState(false); // Modal visibility
    const [fadeIn, setFadeIn] = useState(false); // For fade animation

    useEffect(() => {
        const fetchPublicBlogs = async () => {
            setLoading(true);
            setError('');

            try {
                const response = await axios.get('http://localhost:3000/api/blogs', {
                    params: { privacy: 'public', limit: 3 }, // Fetch latest 3 blogs
                });

                // Only take the first 3 blogs
                setLatestBlogs(response.data.slice(0, 3));
            } catch (err) {
                console.error('Error fetching public blogs:', err);
                setError('Failed to load blogs. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPublicBlogs();
    }, []);

    // Open the modal and set the selected blog
    const handleTitleClick = (blog) => {
        setSelectedBlog(blog);
        setShowModal(true);
        setFadeIn(true);
    };

    // Close the modal with fade-out animation
    const handleCloseModal = () => {
        setFadeIn(false);
        setTimeout(() => {
            setShowModal(false);
            setSelectedBlog(null);
        }, 300); // Match the animation duration
    };

    return (
        <Container className="mt-4">
            <Row>
                <Col>
                    <h1>Welcome to Our Blog</h1>
                    <p>Discover amazing content and share your thoughts with our community.</p>
                </Col>
            </Row>
            <Row className="mt-4">
                {loading ? (
                    <Col className="text-center">
                        <Spinner animation="border" />
                        <p>Loading blogs...</p>
                    </Col>
                ) : error ? (
                    <Col>
                        <Alert variant="danger">{error}</Alert>
                    </Col>
                ) : latestBlogs.length > 0 ? (
                    latestBlogs.map((blog) => (
                        <Col md={12} key={blog.id} className="mb-4">
                            <Card className="mb-4">
                                {blog.image && (
                                    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                                        <img
                                            src={`data:image/jpeg;base64,${Buffer.from(blog.image.data).toString('base64')}`}
                                            alt={blog.title}
                                            style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '8px' }}
                                        />
                                    </div>
                                )}
                                <Card.Body>
                                    <Card.Title
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => handleTitleClick(blog)}
                                    >
                                        {blog.title}
                                    </Card.Title>
                                    <Card.Text>
                                        {blog.content.length > 100 ? (
                                            <span
                                                dangerouslySetInnerHTML={{
                                                    __html: blog.content.substring(0, 100) + '...',
                                                }}
                                            />
                                        ) : (
                                            <span dangerouslySetInnerHTML={{ __html: blog.content }} />
                                        )}
                                    </Card.Text>
                                    <Card.Footer>
                                        <small className="text-muted">
                                            By {blog.author || 'Unknown Author'} on{' '}
                                            {new Date(blog.created_at).toLocaleDateString()}
                                        </small>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <Alert variant="info">No public blogs available at the moment.</Alert>
                    </Col>
                )}
            </Row>

            {/* Modal for showing full blog content */}
            <Modal
                show={showModal}
                onHide={handleCloseModal}
                centered
                dialogClassName={`custom-modal ${fadeIn ? 'fade-in' : 'fade-out'}`} // Apply animation classes
            >
                <Modal.Header closeButton>
                    <Modal.Title>{selectedBlog?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    {selectedBlog?.image && (
                        <img
                            src={`data:image/jpeg;base64,${Buffer.from(selectedBlog.image.data).toString('base64')}`}
                            alt={selectedBlog.title}
                            className="img-fluid mb-3"
                        />
                    )}
                    <div dangerouslySetInnerHTML={{ __html: selectedBlog?.content }} />
                </Modal.Body>
                <Modal.Footer>
                    <small className="text-muted">
                        By {selectedBlog?.author || 'Unknown Author'} on{' '}
                        {new Date(selectedBlog?.created_at).toLocaleDateString()}
                    </small>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Home;
