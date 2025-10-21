import { useState, useRef } from "react";
import { Form, Button, Card, Row, Col, Alert, ProgressBar, Badge } from "react-bootstrap";
import { FaUser, FaEnvelope, FaLock, FaCamera, FaCheckCircle, FaExclamationTriangle, FaTrophy, FaCalendarAlt, FaEdit } from "react-icons/fa";
import "animate.css";

const UserProfile = ({ user, onUpdateProfile, onUpdatePassword }) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(user?.avatar || "https://via.placeholder.com/150");
  const [profileComplete, setProfileComplete] = useState(75);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setAvatar(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMessage("Name and email are required.");
      return;
    }
    onUpdateProfile({ name, email, avatar });
    setSuccessMessage("Profile updated successfully!");
    setErrorMessage("");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match!");
      return;
    }
    if (newPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }
    onUpdatePassword({ currentPassword, newPassword });
    setSuccessMessage("Password updated successfully!");
    setErrorMessage("");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          zIndex: 0,
        }}
      />

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            {/* Header */}
            <div className="text-center mb-5 animate__animated animate__fadeInDown">
              <h1 className="display-4 fw-bold text-white mb-3">
                <FaUser className="me-3" />
                Professional Profile
              </h1>
              <p className="lead text-white-50">
                Manage your account settings and preferences
              </p>
            </div>

            {/* Profile Completion */}
            <Card className="mb-4 shadow-lg border-0 animate__animated animate__fadeInUp">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0 fw-bold">
                    <FaTrophy className="text-warning me-2" />
                    Profile Completion
                  </h5>
                  <Badge bg="success" className="fs-6">
                    {profileComplete}%
                  </Badge>
                </div>
                <ProgressBar
                  now={profileComplete}
                  className="mb-0"
                  style={{ height: "8px" }}
                  variant="success"
                />
              </Card.Body>
            </Card>

            <Row>
              <Col lg={4} className="mb-4">
                {/* Avatar Card */}
                <Card className="shadow-lg border-0 h-100 animate__animated animate__fadeInLeft">
                  <Card.Body className="text-center p-4">
                    <div className="position-relative mb-4">
                      <img
                        src={avatar}
                        alt="Profile Avatar"
                        className="rounded-circle shadow-lg"
                        style={{
                          width: "120px",
                          height: "120px",
                          objectFit: "cover",
                          border: "4px solid #fff",
                          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                        }}
                      />
                      <Button
                        variant="primary"
                        size="sm"
                        className="position-absolute bottom-0 end-0 rounded-circle p-2"
                        onClick={() => fileInputRef.current.click()}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                      >
                        <FaCamera />
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleAvatarChange}
                        accept="image/*"
                        style={{ display: "none" }}
                      />
                    </div>
                    <h5 className="fw-bold mb-1">{name || "Your Name"}</h5>
                    <p className="text-muted mb-3">{email || "your.email@example.com"}</p>
                    <div className="d-flex justify-content-center gap-2">
                      <Badge bg="primary" className="px-3 py-2">
                        <FaCalendarAlt className="me-1" />
                        Member since 2024
                      </Badge>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Col lg={8}>
                {/* Alerts */}
                {successMessage && (
                  <Alert variant="success" className="mb-4 animate__animated animate__fadeIn">
                    <FaCheckCircle className="me-2" />
                    {successMessage}
                  </Alert>
                )}
                {errorMessage && (
                  <Alert variant="danger" className="mb-4 animate__animated animate__shakeX">
                    <FaExclamationTriangle className="me-2" />
                    {errorMessage}
                  </Alert>
                )}

                {/* Profile Information Card */}
                <Card className="shadow-lg border-0 mb-4 animate__animated animate__fadeInRight">
                  <Card.Header className="bg-primary text-white border-0 py-3">
                    <h5 className="mb-0 fw-bold">
                      <FaEdit className="me-2" />
                      Personal Information
                    </h5>
                  </Card.Header>
                  <Card.Body className="p-4">
                    <Form onSubmit={handleProfileUpdate}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">
                              <FaUser className="me-2 text-primary" />
                              Full Name *
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter your full name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="form-control-lg"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">
                              <FaEnvelope className="me-2 text-primary" />
                              Email Address *
                            </Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control-lg"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <div className="text-end">
                        <Button
                          variant="primary"
                          type="submit"
                          size="lg"
                          className="px-5 py-3 fw-semibold shadow-sm"
                          style={{
                            background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
                            border: "none",
                          }}
                        >
                          <FaCheckCircle className="me-2" />
                          Update Profile
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>

                {/* Password Update Card */}
                <Card className="shadow-lg border-0 animate__animated animate__fadeInUp">
                  <Card.Header className="bg-danger text-white border-0 py-3">
                    <h5 className="mb-0 fw-bold">
                      <FaLock className="me-2" />
                      Security Settings
                    </h5>
                  </Card.Header>
                  <Card.Body className="p-4">
                    <Form onSubmit={handlePasswordUpdate}>
                      <Row>
                        <Col md={12}>
                          <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">
                              <FaLock className="me-2 text-danger" />
                              Current Password *
                            </Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Enter current password"
                              value={currentPassword}
                              onChange={(e) => setCurrentPassword(e.target.value)}
                              className="form-control-lg"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">
                              <FaLock className="me-2 text-danger" />
                              New Password *
                            </Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Enter new password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="form-control-lg"
                              required
                            />
                            <Form.Text className="text-muted">
                              Minimum 6 characters required
                            </Form.Text>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="fw-semibold">
                              <FaLock className="me-2 text-danger" />
                              Confirm Password *
                            </Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Confirm new password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="form-control-lg"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <div className="text-end">
                        <Button
                          variant="danger"
                          type="submit"
                          size="lg"
                          className="px-5 py-3 fw-semibold shadow-sm"
                          style={{
                            background: "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
                            border: "none",
                          }}
                        >
                          <FaLock className="me-2" />
                          Update Password
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UserProfile;
