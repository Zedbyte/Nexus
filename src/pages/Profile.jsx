import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import { Container, Row, Col, Card, Spinner, Alert, Image, Form, Button, Modal } from 'react-bootstrap';

// Utility function to parse image data
const parseImage = (imageData) => {
    return imageData
        ? `data:image/jpeg;base64,${Buffer.from(imageData.data).toString('base64')}`
        : null;
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
                <Col md={4}>
                    <Card className="shadow-lg">
                        <Card.Body className="text-center">
                            {profile.profile_picture && (
                                <Image
                                    src={profile.profile_picture}
                                    alt={profile.name}
                                    roundedCircle
                                    className="mb-3"
                                    style={{ width: '150px', height: '150px' }}
                                />
                            )}
                            <h4>{profile.name || 'Unknown User'}</h4>
                            <h5 className="text-muted">{profile.username}</h5>
                            <p className="text-muted">{profile.email}</p>
                            <p className="text-muted">{profile.phone_number}</p>
                            <p className="text-muted">{profile.bio || 'No bio provided.'}</p>

                            <Form>
                                <div className="d-flex gap-2 justify-content-center">
                                    <Button
                                        variant="secondary"
                                        onClick={() => navigate(`/edit-profile/${profile.id}`)}
                                    >
                                        Edit Profile
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <h4 className="mb-4">Blogs</h4>
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <Card className="mb-4 shadow-sm" key={blog.id}>
                                <Card.Header className="d-flex justify-content-between align-items-center">
                                    <strong>{blog.title}</strong>
                                    <div>
                                        <Button
                                            variant="info"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => navigate(`/view-blog/${blog.id}`)}
                                        >
                                            View
                                        </Button>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => navigate(`/edit-blog/${blog.id}`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDeleteClick(blog.id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Header>
                                {blog.image && (
                                    <Card.Img variant="top" src={blog.image} alt={blog.title} />
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
