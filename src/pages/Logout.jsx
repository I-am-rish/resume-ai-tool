import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "animate.css";
import { useNavigate } from "react-router-dom";

const LogoutPopup = () => {
  const [showLogout, setShowLogout] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/authentication/login");
  };

  if (!showLogout) return null; // ⬅️ Renders nothing if popup is closed

  return (
    <div
      className="logout-popup-wrapper animate__animated animate__fadeIn"
      style={{
        position: "fixed",
        top: "50%",
        left: "calc(50% + 100px)", // <-- Adjust offset if your sidebar is ~200px
        transform: "translate(-50%, -50%)",
        zIndex: 1050, // Higher than page content but below sidebar if needed
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="logout-popup-content shadow-lg"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "2rem",
          minWidth: "360px",
          maxWidth: "90%",
          textAlign: "center",
          border: "1px solid #e5e7eb",
        }}
      >
        <div className="animate__animated animate__zoomIn">
          <h3 className="fw-bold mb-4" style={{ color: "#1e293b" }}>
            Confirm Logout
          </h3>
          <p className="mb-4 fs-20 text-secondary mb-4">
            Are you sure you want to log out?
          </p>
        </div>

        <div className="d-flex justify-content-center gap-3 animate__animated animate__fadeInUp">
          <Button
            className="px-4 py-2 fw-semibold shadow-sm fs-6"
            style={{
              backgroundColor: "#f3f4f6", // Light neutral background
              color: "#374151", // Cool gray text for readability
              border: "1px solid #d1d5db", // Soft border for subtle definition
              borderRadius: "8px",
              transition: "all 0.25s ease-in-out", // Smooth hover transition
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e5e7eb"; // Slightly darker on hover
              e.currentTarget.style.color = "#111827"; // Darker text on hover
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f3f4f6"; // Reset background
              e.currentTarget.style.color = "#374151"; // Reset text
              e.currentTarget.style.transform = "scale(1)";
            }}
            onClick={() => {
              setShowLogout(false);
              navigate("/dashboard");
            }}
          >
          Back to Dashboard
          </Button>

          <Button
            variant="danger"
            className="px-4 py-2 fw-semibold shadow-sm fs-6"
            style={{
              borderRadius: "8px",
              transition: "all 0.25s ease-in-out",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
