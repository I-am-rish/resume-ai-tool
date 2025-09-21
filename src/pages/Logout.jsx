import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "animate.css"; // For smooth animations (npm install animate.css)

const LogoutPopup = () => {
    const [showLogout, setShowLogout] = useState(true);
    
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    }
  return (
    <Modal
      show={showLogout}
      onHide={() => setShowLogout(false)}
      centered
      backdrop="static"
      keyboard={false}
      //   dialogClassName="border-0 rounded-4 shadow-lg animate__animated animate__fadeInDown"
    >
      <Modal.Body
        className="p-5 text-center"
        style={{
          background: "linear-gradient(135deg, #ff4e50 0%, #f9d423 100%)",
          borderRadius: "1rem",
        }}
      >
        <div className="animate__animated animate__zoomIn">
          <h3 className="fw-bold text-light mb-3">⚠️ Confirm Logout</h3>
          <p className="text-light mb-4 fs-5">
            Are you sure you want to log out of your account?
          </p>
        </div>

        <div className="d-flex justify-content-center gap-3 animate__animated animate__fadeInUp">
          <Button
            variant="light"
            className="px-4 py-2 fw-semibold shadow-sm fs-6"
            onClick={() => {
                setShowLogout(false);
                window.location.href = "/dashboard";
            }}
          >
            Back to Dashboard
          </Button>
          <Button
            variant="danger"
            className="px-4 py-2 fw-semibold shadow-sm fs-6"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LogoutPopup;
