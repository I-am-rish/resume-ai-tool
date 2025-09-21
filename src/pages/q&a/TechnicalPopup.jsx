import React from "react";
import { Modal, Button } from "react-bootstrap";
import "animate.css"; // for beautiful animations (npm install animate.css)
import { useNavigate } from "react-router-dom";

const TechnicalPopup = ({ show, onClose, onStart }) => {
  const Navigate = useNavigate();
  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      backdrop="static"
      keyboard={false}
      // dialogClassName="border-0 rounded-4 shadow-lg animate__animated animate__fadeInDown"
      contentClassName="bg-gradient"
    >
      <Modal.Body
        className="position-relative p-5 text-center text-light"
        style={{
          // background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
          borderRadius: "1rem",
        }}
      >
        {/* Back to Dashboard button (Top-Left) */}
        <Button
          variant="light"
          className="position-absolute  top-0 start-0 m-3 shadow-sm animate__animated animate__fadeInLeft "
          //   onClick={onClose}
          onClick={() => Navigate("/dashboard")}
          style={{
            fontSize: "12px"
          }}
        >
          ← Back to Dashboard
        </Button>

        {/* Main content */}
        <div
          className="d-flex flex-column align-items-center justify-content-center animate__animated animate__zoomIn"
          style={{ minHeight: "220px" }}
        >
          <h4 className="mb-4 fw-bold">🚀 Ready to Begin Your Practice?</h4>
          <Button
            variant="warning"
            size="lg"
            className="px-5 py-3 fs-6 fw-semibold shadow-sm animate__animated animate__pulse animate__infinite"
            onClick={onStart}
          >
            Start Technical Q&A Practice
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TechnicalPopup;
