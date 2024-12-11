import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import JoditEditor from 'jodit-react';
import { Buffer } from 'buffer';

function EditBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const editor = useRef(null);
    const [blog, setBlog] = useState(null);
    const [content, setContent] = useState(''); // State for editor content
    const [base64Image, setBase64Image] = useState(''); // State for Base64 encoded image
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/blogs/${id}`);
                setBlog(response.data);
                setContent(response.data.content); // Initialize editor content
                if (response.data.image && response.data.image.data) {
                    setBase64Image(`data:image/jpeg;base64,${Buffer.from(response.data.image.data).toString('base64')}`);
                }
            } catch (err) {
                console.error('Error fetching blog:', err);
                setError('Failed to load the blog.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBlog({
                ...blog,
                image: file, // Set the file object
                image_preview: URL.createObjectURL(file), // Generate a preview URL
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('title', blog.title);
            formData.append('category', blog.category);
            formData.append('content', content); // Include updated content from the editor
            formData.append('privacy', blog.privacy);
            formData.append('status', blog.status);

            if (blog.image instanceof File) {
                formData.append('image', blog.image); // Directly append the File object
            }

            await axios.put(`http://localhost:3000/api/blogs/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setSuccess('Blog updated successfully!');
            setTimeout(() => navigate('/profile'), 1500);
        } catch (err) {
            console.error('Error updating blog:', err);
            setError('Failed to update blog.');
        }
    };

    if (loading) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border" />
                <p>Loading blog...</p>
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
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        value={blog.title || ''}
                        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        value={blog.category || ''}
                        onChange={(e) => setBlog({ ...blog, category: e.target.value })}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <JoditEditor
                        ref={editor}
                        value={content} // Use the editor's content state
                        onBlur={(newContent) => setContent(newContent)} // Update content state on editor change
                        config={{
                            readonly: false,
                            height: 400,
                            toolbarSticky: false,
                            placeholder: 'Start writing your blog...',
                        }}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    {base64Image && <img src={base64Image} alt="Selected" style={{ width: '100%', maxHeight: '300px' }} />}
                    <Form.Control
                        type="file"
                        accept="image/*"
                        name="blogPicture"
                        onChange={handleImageChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Privacy</Form.Label>
                    <Form.Select
                        value={blog.privacy || 'public'}
                        onChange={(e) => setBlog({ ...blog, privacy: e.target.value })}
                    >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                        value={blog.status || 'draft'}
                        onChange={(e) => setBlog({ ...blog, status: e.target.value })}
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Save Changes
                </Button>
                <Button variant="secondary" className="ms-2" onClick={() => navigate('/profile')}>
                    Cancel
                </Button>
            </Form>
        </Container>
    );
}

export default EditBlog;
