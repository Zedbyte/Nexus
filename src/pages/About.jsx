import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function BlogAboutPage() {
    return (
        <div>
            {/* Hero Section */}
            <div className="hero-section text-center py-5" style={{ backgroundColor: '#f9fafe' }}>
                <Container>
                    <h1 className="display-4 fw-bold">
                        About Our Blog
                    </h1>
                    <p className="mt-3">
                        Dive into a world of insights, tips, and stories crafted to inspire and educate. <br /> Our blog connects you with the latest trends in technology, design, and innovation.
                    </p>
                </Container>
            </div>

            {/* Statistics Section */}
            <div className="stats-section py-5">
                <Container>
                    <Row className="text-center">
                        <Col md={3} sm={6} className="mb-4">
                            <Card className="p-3 border-0 shadow-sm">
                                <Card.Body>
                                    <h5 className="fw-bold">200+ Blogs</h5>
                                    <p className="text-muted">Curated by Experts</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3} sm={6} className="mb-4">
                            <Card className="p-3 border-0 shadow-sm">
                                <Card.Body>
                                    <h5 className="fw-bold">10k+ Readers</h5>
                                    <p className="text-muted">Across the Globe</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3} sm={6} className="mb-4">
                            <Card className="p-3 border-0 shadow-sm">
                                <Card.Body>
                                    <h5 className="fw-bold">5 Awards</h5>
                                    <p className="text-muted">For Quality Content</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={3} sm={6} className="mb-4">
                            <Card className="p-3 border-0 shadow-sm">
                                <Card.Body>
                                    <h5 className="fw-bold">24/7 Support</h5>
                                    <p className="text-muted">For Our Readers</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* More About Us Section */}
            <div className="about-us-section py-5" style={{ backgroundColor: '#f9fafe' }}>
                <Container>
                    <Row className="align-items-center">
                        <Col md={6}>
                            <h5 className="text-primary">MORE ABOUT US</h5>
                            <h2 className="fw-bold">Bringing Ideas to Life</h2>
                            <p>
                                Our blog is dedicated to empowering readers by delivering actionable insights, creative inspiration, and valuable information. Join us on a journey to explore ideas that matter.
                            </p>
                            <ul className="list-unstyled">
                                <li className="mb-2">✔ In-depth tutorials</li>
                                <li className="mb-2">✔ Expert opinions</li>
                                <li className="mb-2">✔ Creative tips & tricks</li>
                                <li className="mb-2">✔ Community-driven stories</li>
                            </ul>
                        </Col>
                        <Col md={6} className="text-center">
                            <div className="position-relative">
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/4228/4228968.png"
                                    alt="About Us"
                                    width="300px"
                                    className="img-fluid rounded"
                                />
                                <div
                                    className="position-absolute bg-primary text-white p-3 rounded"
                                    style={{ bottom: '20px', right: '20px' }}
                                >
                                    <h5 className="mb-0">5+ Years</h5>
                                    <p className="mb-0">Of delivering exceptional content</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Meet Our Team Section */}
            <div className="team-section py-5">
                <Container>
                    <h2 className="text-center fw-bold mb-5">Meet Our Team</h2>
                    <Row className="text-center">
                        {/* Team Member 1 */}
                        <Col md={4} className="mb-4">
                            <Card className="border-0 shadow">
                                <img
                                    src="https://static.vecteezy.com/system/resources/previews/045/647/951/non_2x/3d-character-people-close-up-portrait-smiling-nice-3d-avartar-or-icon-free-png.png"
                                    alt="Team Member 1"
                                    className="card-img-top rounded-circle mx-auto mt-3"
                                    style={{ width: '100px', height: '100px' }}
                                />
                                <Card.Body>
                                    <Card.Title>Don Henessy David</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Founder & Lead Writer</Card.Subtitle>
                                    <Card.Text>
                                        Don is a visionary leader with a passion for technology and storytelling.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Team Member 2 */}
                        <Col md={4} className="mb-4">
                            <Card className="border-0 shadow">
                                <img
                                    src="https://static.vecteezy.com/system/resources/previews/045/647/950/non_2x/3d-character-people-close-up-portrait-smiling-nice-3d-avartar-or-icon-free-png.png"
                                    alt="Team Member 2"
                                    className="card-img-top rounded-circle mx-auto mt-3"
                                    style={{ width: '100px', height: '100px' }}
                                />
                                <Card.Body>
                                    <Card.Title>Mark Jerome Santos</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Senior Editor</Card.Subtitle>
                                    <Card.Text>
                                        Mark brings her expertise in content creation and design to the team.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                        {/* Team Member 3 */}
                        <Col md={4} className="mb-4">
                            <Card className="border-0 shadow">
                                <img
                                    src="https://static.vecteezy.com/system/resources/previews/045/647/937/non_2x/3d-character-people-close-up-portrait-smiling-nice-3d-avartar-or-icon-free-png.png"
                                    alt="Team Member 3"
                                    className="card-img-top rounded-circle mx-auto mt-3"
                                    style={{ width: '100px', height: '100px' }}
                                />
                                <Card.Body>
                                    <Card.Title>Marcus Jeremy Cariño</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Content Strategist</Card.Subtitle>
                                    <Card.Text>
                                        Marcus ensures every piece of content is impactful and engaging.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default BlogAboutPage;
