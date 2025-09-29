import React from "react";
import { Button } from "react-bootstrap";
import "animate.css";
import { useNavigate } from "react-router-dom";

const TechnicalPopup = ({ show, onClose, onStart }) => {
  const navigate = useNavigate();

  if (!show) return null; // hide completely when not shown

  return (
    <div
      className="animate__animated animate__fadeIn"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-30%, -50%)",
        zIndex: 100,
        width: "90%",
        maxWidth: "630px",
        background: "rgba(255, 255, 255, 0.9)", // clean white with subtle transparency
        backdropFilter: "blur(12px)", // glassy effect
        borderRadius: "16px",
        padding: "2rem",
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)", // soft professional shadow
        color: "#1f2937", // slate-900 for text
        textAlign: "center",
      }}
    >
      {/* Close (X) Button */}
      {/* <Button
        // variant="outline-secondary"
        size="sm"
        onClick={onClose}
        className="position-absolute top-0 end-0 m-2 border-0"
        style={{
          fontSize: "14px",
          backgroundColor: "rgba(0,0,0,0.05)",
          borderRadius: "50%",
          width: "32px",
          height: "32px",
          lineHeight: "1",
        }}
      >
        ✕
      </Button> */}

      {/* Back to Dashboard */}
      {/* <Button
        variant="outline-primary"
        size="sm"
        className="mb-4 shadow-sm fw-semibold mb-5 py-2 animate__animated animate__fadeInLeft"
        onClick={() => navigate("/dashboard")}
        style={{
          fontSize: "14px",
          borderRadius: "20px",
          padding: "6px 16px",
        }}
      >
        ← Back to Dashboard
      </Button>`` */}

      {/* Main content */}
      <h3 className="fw-bold mb-3" style={{ color: "#0d6efd" }}>
        🚀 Ready to Begin?
      </h3>
      <p className="mb-2 text-muted" style={{ fontSize: "18px" }}>
        Practice technical Q&A and be ready for real interviews.
      </p>

      {/* Start Button */}
      <Button
        variant="primary"
        size="lg"
        className="px-5 py-2 mx-auto fs-6 fw-semibold shadow-sm animate__animated animate__pulse animate__infinite mt-4 "
        style={{
          borderRadius: "12px",
          backgroundColor: "#0d6efd", // Bootstrap primary blue
          borderColor: "#0d6efd",
          fontSize: "16px",
        }}
        onClick={onStart}
      >
        Start Technical Q&A Practice
      </Button>
    </div>
  );
};

export default TechnicalPopup;

