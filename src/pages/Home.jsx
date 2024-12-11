import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { Buffer } from 'buffer';
import '../assets/home/Home.css'; // Add custom styles for animations
import { Navigate, useNavigate } from 'react-router-dom';

function Home() {
    const [latestBlogs, setLatestBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedBlog, setSelectedBlog] = useState(null); // For modal content
    const [showModal, setShowModal] = useState(false); // Modal visibility
    const [fadeIn, setFadeIn] = useState(false); // For fade animation
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPublicBlogs = async () => {
            setLoading(true);
            setError('');

            try {
                const response = await axios.get('http://localhost:3000/api/blogs/home');

                // Only take the first 3 blogs
                setLatestBlogs(response.data.slice(0));
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
    const handleBlogClick = (blog) => {
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
        <div>
             {/* Hero Section */}
             <div className="hero-section text-center py-5" style={{ backgroundColor: '#f9fafe' }}>
                <Container>
                    <p className="text-primary fw-bold">Working for your success</p>
                    <h1 className="display-4 fw-bold">
                        Welcome to Our Nexus <br /> <span className="text-primary">Where Stories Come Alive</span>
                    </h1>
                    <p className="mt-3">
                    Where curiosity meets creativity. Explore a wide range of topics, insights, and inspiration through our blogs.                    </p>
                    <div className="mt-4">
                        <Button onClick={()=> navigate(`/login`)}  variant="primary" size="lg" className="me-3">
                            Be a Nexus Writer
                        </Button>
                        <Button onClick={()=> navigate(`/about`)} variant="outline-primary" size="lg">
                            Learn more
                        </Button>
                    </div>
                </Container>
            </div>

            {/* Blogs Section */}
            <Container className="mt-4">
                <Row>
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
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                padding: '10px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => handleBlogClick(blog)}
                                        >
                                            <img
                                                src={`data:image/jpeg;base64,${Buffer.from(
                                                    blog.image.data
                                                ).toString('base64')}`}
                                                alt={blog.title}
                                                style={{
                                                    width: '100%',
                                                    height: '250px',
                                                    objectFit: 'cover',
                                                    borderRadius: '8px',
                                                }}
                                            />
                                        </div>
                                    )}
                                    <Card.Body>
                                        <Card.Title
                                            style={{ cursor: 'pointer', color: 'blue' }}
                                            onClick={() => handleBlogClick(blog)}
                                        >
                                            {blog.title}
                                        </Card.Title>
                                        <Card.Text>
                                            {blog.content.length > 100 ? (
                                                <span>Click the title or the image to read the blog!</span>
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
                    dialogClassName={`custom-modal custom-modal-wide ${fadeIn ? 'fade-in' : 'fade-out'}`}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedBlog?.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                        {selectedBlog?.image && (
                            <div className="text-center">
                                <img
                                    src={`data:image/jpeg;base64,${Buffer.from(selectedBlog.image.data).toString(
                                        'base64'
                                    )}`}
                                    alt={selectedBlog.title}
                                    className="img-fluid mb-3 w-50 object-cover"
                                />
                            </div>
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
        </div>
    );
}

export default Home;
