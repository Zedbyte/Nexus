import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import { Container, Row, Col, Card, Spinner, Alert, Image, Form, Button } from 'react-bootstrap';

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
    const [password, setPassword] = useState('');
    const [revealedPassword, setRevealedPassword] = useState(null);
    const [loginError, setLoginError] = useState('');

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

    const handleSeePassword = async () => {
        setLoginError('');
        
        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                usernameOrEmail: profile.email,
                password: password,
            });

            if (response.data.success) {
                setRevealedPassword(password);
            } else {
                setLoginError('Incorrect password.');
            }
        } catch (error) {
            console.error('Error verifying password:', error);
            setLoginError('Invalid Password.');
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

                            {/* See Password Feature */}
                            <Form>
                                <Form.Group className="mb-3" controlId="passwordInput">
                                    <Form.Label>Enter Password to Reveal:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" onClick={handleSeePassword}>
                                    Verify and Reveal
                                </Button>
                                {loginError && <Alert className="mt-3" variant="danger">{loginError}</Alert>}
                                {revealedPassword && (
                                    <Alert className="mt-3" variant="success">
                                        Your password is: <strong>{revealedPassword}</strong>
                                    </Alert>
                                )}
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <h4 className="mb-4">Blogs</h4>
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <Card className="mb-4 shadow-sm" key={blog.id}>
                                <Card.Header>
                                    <strong>{blog.title}</strong> -{' '}
                                    <small>{new Date(blog.created_at).toLocaleString()}</small>
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
        </Container>
    );
}

export default Profile;
