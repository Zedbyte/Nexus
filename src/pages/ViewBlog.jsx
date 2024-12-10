import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';
import { Buffer } from 'buffer';

function ViewBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/blogs/${id}`);
                setBlog(response.data);    
            } catch (err) {
                console.error('Error fetching blog:', err);
                setError('Failed to load the blog.');
            } finally {
                setLoading(false);
            }
        };    
        fetchBlog();
    }, [id]);
    
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
            <Card className="shadow-lg">
                <Card.Header>
                    <h4>{blog.title}</h4>
                    <small>{new Date(blog.created_at).toLocaleString()}</small>
                </Card.Header>
                {blog.image && <Card.Img variant="top" src={`data:image/jpeg;base64,${Buffer.from(blog.image.data).toString('base64')}`} />}
                <Card.Body>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </Card.Body>
                <Card.Footer>
                    <Link to="/profile" className="btn btn-secondary">
                        Back to Profile
                    </Link>
                </Card.Footer>
            </Card>
        </Container>
    );
}

export default ViewBlog;
