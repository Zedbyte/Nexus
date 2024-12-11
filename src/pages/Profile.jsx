import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import { Container, Row, Col, Card, Spinner, Alert, Image, Button, Modal } from 'react-bootstrap';

// Utility function to parse image data
const parseImage = (imageData) => {
    return imageData
        ? `data:image/jpeg;base64,${Buffer.from(imageData.data).toString('base64')}`
        : 'https://via.placeholder.com/150'; // Placeholder for missing images
};

function Profile() {
    const [profile, setProfile] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfileAndBlogs = async () => {
            setLoading(true);
            setError('');

            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user || !user.id) {
                    setError('User not authenticated. Please log in.');
                    setLoading(false);
                    return;
                }

                const [profileResponse, blogsResponse] = await Promise.all([
                    axios.get(`http://localhost:3000/api/profile/${user.id}`),
                    axios.get('http://localhost:3000/api/blogs/profile', {
                        params: {
                            user_id: user.id, // Logged-in user's ID
                        },
                    }),
                ]);

                const parsedProfile = {
                    ...profileResponse.data.data,
                    image: parseImage(profileResponse.data.data.image),
                };

                const parsedBlogs = blogsResponse.data.map((blog) => ({
                    ...blog,
                    image: parseImage(blog.image),
                }));

                setProfile(parsedProfile);
                setBlogs(parsedBlogs);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load profile or blogs. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileAndBlogs();
    }, []);

    const handleDeleteClick = (blogId) => {
        setSelectedBlogId(blogId);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/blogs/${selectedBlogId}`);
            setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== selectedBlogId));
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting blog:', error);
            setError('Failed to delete blog. Please try again.');
        }
    };

    if (loading) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border" />
                <p>Loading profile...</p>
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
                {/* Profile Section */}
                <Col md={4}>
                    <Card className="shadow-lg border-0">
                        <Card.Body className="text-center">
                            <Image
                                src={profile.profile_picture}
                                alt={profile.name}
                                roundedCircle
                                className="mb-3"
                                style={{ width: '150px', height: '150px', border: '4px solid #f0f0f0' }}
                            />
                            <h4 className="fw-bold mb-1">{profile.name || 'Unknown User'}</h4>
                            <p className="text-muted">@{profile.username || 'username'}</p>
                            <hr />
                            <p className="mb-2">
                                <strong>Email:</strong> {profile.email}
                            </p>
                            <p className="mb-2">
                                <strong>Phone:</strong> {profile.phone || 'N/A'}
                            </p>
                            <p className="mb-3">
                                <strong>Bio:</strong> {profile.bio || 'No bio provided.'}
                            </p>
                            <Button
                                variant="primary"
                                className="w-100 fw-bold mb-3"
                                onClick={() => navigate(`/edit-profile/${profile.id}`)}
                            >
                                Edit Profile
                            </Button>
                            <hr />
                            <div className="text-start">
                                <h6 className="fw-bold">Achievements</h6>
                                <p className="text-muted">🏆 Contributor of the Month</p>
                                <p className="text-muted">📚 Published numerous Blogs</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Blogs Section */}
                <Col md={8}>
                    <h4 className="mb-4 fw-bold">Your Blogs</h4>
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <Card className="mb-4 shadow-sm border-0" key={blog.id}>
                                <Card.Header className="d-flex justify-content-between align-items-center bg-light">
                                    <h5 className="fw-bold">{blog.title}</h5>
                                    <div>
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => navigate(`/view-blog/${blog.id}`)}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            variant="outline-warning"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => navigate(`/edit-blog/${blog.id}`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDeleteClick(blog.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Header>
                                {blog.image && (
                                    <Card.Img
                                        variant="top"
                                        src={blog.image}
                                        alt={blog.title}
                                        style={{ objectFit: 'cover', height: '150px' }}
                                    />
                                )}
                                <Card.Body>
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

            {/* Delete Modal */}
            <Modal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this blog? This action cannot be undone.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Profile;
