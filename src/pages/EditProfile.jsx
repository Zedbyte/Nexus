import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert, Image } from 'react-bootstrap';
import axios from 'axios';

function EditProfile() {
    const { id } = useParams(); // Get the user ID from the URL
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/profile/fill/${id}`);
                setProfile(response.data.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError('Failed to load profile.');
                setLoading(false);
            }
        };
        fetchProfile();
    }, [id]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfile({
                ...profile,
                profile_picture: file,
                profile_picture_preview: URL.createObjectURL(file), // Preview URL
            });
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('first_name', profile.first_name);
            formData.append('last_name', profile.last_name);
            formData.append('email_address', profile.email_address);
            formData.append('phone_number', profile.phone_number);
            formData.append('username', profile.username);
            formData.append('password', profile.password);
            formData.append('bio', profile.bio);
    
            // Append the File object directly if a new file is selected
            if (profile.profile_picture instanceof File) {
                formData.append('profile_picture', profile.profile_picture);
            }
    
            await axios.put(`http://localhost:3000/api/profile/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setSuccess('Profile updated successfully!');
        } catch (err) {
            console.error('Error updating profile:', err);
            setError('Failed to update profile.');
        }
    };
    

    if (loading) return <p>Loading...</p>;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={8}>
                    <h3>Edit Profile</h3>
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={profile.first_name || ''}
                                onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={profile.last_name || ''}
                                onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Profile Picture</Form.Label>
                            {profile.profile_picture_preview && (
                                <Image
                                    src={profile.profile_picture_preview}
                                    alt="Profile Preview"
                                    roundedCircle
                                    className="mb-3"
                                    style={{ width: '100px', height: '100px' }}
                                />
                            )}
                            <Form.Control
                                type="file"
                                accept="image/*"
                                name="profilePicture"
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                value={profile.email_address || ''}
                                onChange={(e) => setProfile({ ...profile, email_address: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                value={profile.phone_number || ''}
                                onChange={(e) => setProfile({ ...profile, phone_number: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={profile.username || ''}
                                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={profile.password || ''}
                                onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={profile.bio || ''}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default EditProfile;
