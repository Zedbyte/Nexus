import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

function Blog() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [privacy, setPrivacy] = useState('public');
    const [status, setStatus] = useState('draft');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]); // Capture the file from the input
        } else {
            setImage(null); // Clear image if no file is selected
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
    
        // Validate required fields
        if (!title || !content || !category) {
            setError('Title, content, and category are required.');
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('category', category);
            formData.append('content', content);
    
            // Add image if available
            if (image) formData.append('image', image);
    
            formData.append('privacy', privacy);
            formData.append('status', status);
    
            // Dynamically fetch user ID from local storage or context
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.id) {
                formData.append('user_id', user.id);
            } else {
                setError('User not authenticated. Please log in.');
                return;
            }
    
            const response = await axios.post('http://localhost:3000/api/blogs', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.data.success) {
                setSuccess('Blog post added successfully!');
                setPosts((prevPosts) => [...prevPosts, response.data]); // Add new post to the list
                // Reset form fields
                setTitle('');
                setCategory('');
                setContent('');
                setImage(null);
                setPrivacy('public');
                setStatus('draft');
            } else {
                setError('Failed to add blog post.');
            }
        } catch (error) {
            console.error('Error submitting blog post:', error);
            setError('An error occurred while submitting the blog post.');
        }
    };
    
    

    return (
        <Container className="mt-4">
            <Row>
                {/* <Col md={8}>
                    <h2>Blog Posts</h2>
                    {posts.map((post, index) => (
                        <Card key={index} className="mb-3">
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{post.category}</Card.Subtitle>
                                <Card.Text>{post.content}</Card.Text>
                                {post.image && <Card.Img src={`data:image/jpeg;base64,${post.image}`} alt={post.title} />}
                                <Card.Text>
                                    <small className="text-muted">{post.privacy}</small>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Col> */}
                <Col md={12}>
                    <h2>Add New Post</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
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
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
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
                            <Form.Label>Image (optional)</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Privacy</Form.Label>
                            <Form.Select value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </Form.Select>
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
