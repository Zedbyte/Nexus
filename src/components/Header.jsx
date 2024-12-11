import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { AuthContext } from '../middleware/AuthContext';

function Header() {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to the home route
    };

    return (
        <Navbar bg="white" expand="lg" className="shadow-sm py-3">
            <Container>
                {/* Branding */}
                <Navbar.Brand
                    as={Link}
                    to={isAuthenticated ? "/blog" : "/"}
                    className="fw-bold text-primary fs-4"
                    style={{ letterSpacing: '2px' }}
                >
                    Nexus
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Left Navigation */}
                    <Nav className="me-auto">
                        {!isAuthenticated ? (
                            <>
                                <Nav.Link as={Link} to="/" className="text-dark fw-semibold">
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/about" className="text-dark fw-semibold">
                                    About
                                </Nav.Link>
                                <Nav.Link as={Link} to="/contact" className="text-dark fw-semibold">
                                    Contact
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/profile" className="text-dark fw-semibold">
                                    Profile
                                </Nav.Link>
                                <Nav.Link as={Link} to="/add-blog" className="text-dark fw-semibold">
                                    Add Blog
                                </Nav.Link>
                            </>
                        )}
                    </Nav>

                    {/* Right Navigation */}
                    <Nav>
                        {!isAuthenticated ? (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    <Button variant="outline-primary" size="sm" className="fw-semibold me-2">
                                        Login
                                    </Button>
                                </Nav.Link>
                                <Nav.Link as={Link} to="/register">
                                    <Button variant="primary" size="sm" className="fw-semibold">
                                        Register
                                    </Button>
                                </Nav.Link>
                            </>
                        ) : (
                            <Button
                                variant="danger"
                                size="sm"
                                className="fw-semibold"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
