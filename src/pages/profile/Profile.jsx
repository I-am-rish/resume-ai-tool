import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import "animate.css"; // npm install animate.css

const UserProfile = ({ user, onUpdateProfile, onUpdatePassword }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    onUpdateProfile({ name, email });
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    onUpdatePassword({ currentPassword, newPassword });
  };

  return (
    <div
      className="container py-5 animate__animated animate__fadeIn"
      style={{
        // background: "linear-gradient(135deg,#eef2f3 0%,#dfe9f3 100%)",
        minHeight: "100vh",
      }}
    >
      <Row className="justify-content-center">
        <Col md={7}>
          {/* Profile Card */}
          <Card
            className="shadow border-0 mb-4 rounded-4 animate__animated animate__fadeInDown"
            style={{
              background: "linear-gradient(135deg,#ffffff 0%,#f8f9fa 100%)",
            }}
          >
            <Card.Body className="p-4">
              <h4 className="mb-4 text-primary fw-bold text-center ">
                👤 User Profile
              </h4>
              <Form onSubmit={handleProfileUpdate}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold text-secondary "
                  
                  >
                    Full Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold text-secondary">
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <div className="text-center">
                  <Button
                    variant="primary"
                    type="submit"
                    className="px-5 py-2 fw-semibold shadow-sm animate__animated animate__pulse animate__infinite"
                  >
                    Update Profile
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* Password Card */}
          <Card
            className="shadow border-0 rounded-4 animate__animated animate__fadeInUp"
            style={{
              background: "linear-gradient(135deg,#fff 0%,#f9f9f9 100%)",
            }}
          >
            <Card.Body className="p-4">
              <h4 className="mb-4 text-danger fw-bold text-center">
                🔒 Update Password
              </h4>
              <Form onSubmit={handlePasswordUpdate}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold text-secondary">
                    Current Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold text-secondary">
                    New Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold text-secondary">
                    Confirm New Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="text-center">
                  <Button
                    variant="danger"
                    type="submit"
                    className="px-5 py-2 fw-semibold shadow-sm animate__animated animate__pulse animate__infinite"
                  >
                    Update Password
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserProfile;
