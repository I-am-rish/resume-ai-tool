import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const BehavioralInterviewScreen = () => {
  const [recording, setRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [sarahMessage, setSarahMessage] = useState("Sarah's message...");
  const [alexMessage, setAlexMessage] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [startEnabled, setStartEnabled] = useState(false);
  const [micAccess, setMicAccess] = useState(null); // Track microphone access status

  const chunks = useRef([]);

  // Behavioral interview questions for Sarah (System)
  const interviewQuestions = [
    "Tell me about a time you faced a challenging situation at work.",
    "Describe a situation where you had to work with a difficult team member.",
    "Give an example of a time when you had to meet a tight deadline.",
    "Tell me about a mistake you made and how you handled it.",
    "Describe a time when you had to adapt to a change at work.",
    "Tell me about a time you received constructive criticism.",
    "Give an example of how you motivated others.",
    "Describe a situation where you had to resolve a conflict.",
    "Tell me about a time you went above and beyond for a customer.",
    "Describe a challenging project you worked on and how you overcame obstacles.",
  ];

  // Format timer (MM:SS)
  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  // Start Recording
  const startRecording = async () => {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      alert("Your browser does not support audio recording.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicAccess(true); // Microphone access granted
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        console.log("Recorded Audio Blob:", blob);
        chunks.current = [];
        stream.getTracks().forEach((track) => track.stop()); // Stop all tracks
      };
      recorder.onerror = (e) => {
        console.error("MediaRecorder error:", e);
        alert("An error occurred during recording.");
        setRecording(false);
        setMicAccess(false);
      };

      recorder.start();
      setRecording(true);

      const id = setInterval(() => setTimer((t) => t + 1), 1000);
      setIntervalId(id);
    } catch (err) {
      setMicAccess(false); // Microphone access denied or unavailable
      alert("Microphone access denied or unavailable. Please check your microphone settings.");
      console.error("Microphone error:", err);
    }
  };

  // Stop Recording
  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    clearInterval(intervalId);
    setRecording(false);
    setIntervalId(null);
    setMicAccess(null); // Reset mic access status
  };

  const toggleMute = () => setIsMuted((prev) => !prev);

  const handleSubmit = () => {
    alert(
      `Behavioral Interview submitted!\n\nSarah: ${sarahMessage}\nAlex: ${alexMessage}`
    );
  };

  // Speak the text aloud
  const speakQuestion = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.volume = 1;
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Text-to-speech not supported in this browser.");
    }
  };

  // Simulate Sarah asking a question on component mount
  useEffect(() => {
    const randomQuestion =
      interviewQuestions[
        Math.floor(Math.random() * interviewQuestions.length)
      ];

    setSarahMessage("...");
    setStartEnabled(false);

    setTimeout(() => {
      let displayedText = "";
      let index = 0;

      const typingInterval = setInterval(() => {
        displayedText += randomQuestion[index];
        setSarahMessage(displayedText);
        index++;

        if (index === randomQuestion.length) {
          clearInterval(typingInterval);
          speakQuestion(randomQuestion);
          setTimeout(() => setStartEnabled(true), 1000);
        }
      }, 50);
    }, 1000);
  }, []);

  // Reset timer after stopping
  useEffect(() => {
    if (!recording && timer !== 0 && !intervalId) {
      setTimer(0);
    }
  }, [recording]);

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-start align-items-center p-5"
      style={{
        background: "linear-gradient(to bottom right, #e8f5ff, #f9fcff)",
        padding: "40px 30px",
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center w-100 mb-5">
        <button className="btn btn-outline-secondary btn-sm fs-6">
          <i className="bi bi-arrow-left fs-5"></i> Back to Dashboard
        </button>

        <h2 className="fw-bold m-0">Behavioral Interview</h2>

        <div className="d-flex align-items-center gap-3">
          <i
            className={`bi ${isMuted ? "bi-mic-mute" : "bi-mic"} fs-5`}
            style={{ cursor: "pointer" }}
            onClick={toggleMute}
            title={isMuted ? "Unmute" : "Mute"}
          ></i>
          <div
            className={`border rounded px-3 py-1 text-center fw-semibold ${
              recording ? "text-danger" : ""
            }`}
            style={{ minWidth: "70px" }}
          >
            {formatTime(timer)}
          </div>
        </div>
      </div>

      {/* Interview Section */}
      <div
        className="row w-100 justify-content-center mt-3"
        style={{ maxWidth: "1100px" }}
      >
        {/* Sarah Section */}
        <div className="col-md-5 mb-5 d-flex flex-column align-items-center">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Sarah"
            className="rounded-4 shadow-sm"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          <p className="fw-semibold mt-3 mb-2 fs-5">Sarah</p>
          <div
            className="rounded-circle bg-light shadow-sm d-flex justify-content-center align-items-center mb-3"
            style={{ width: "45px", height: "45px" }}
          >
            <i className="bi bi-mic text-secondary fs-5"></i>
          </div>
          <textarea
            className="form-control shadow-sm"
            rows="10"
            value={sarahMessage}
            readOnly
            style={{
              borderRadius: "15px",
              resize: "none",
              width: "100%",
              height: "220px",
              fontSize: "1rem",
              backgroundColor: "#f9f9f9",
            }}
          />
        </div>

        {/* Alex Section */}
        <div className="col-md-5 mb-5 d-flex flex-column align-items-center">
          <img
            src="https://randomuser.me/api/portraits/men/44.jpg"
            alt="Alex"
            className="rounded-4 shadow-sm"
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />
          <p className="fw-semibold mt-3 mb-2 fs-5">Alex</p>
          <div
            className="rounded-circle bg-light shadow-sm d-flex justify-content-center align-items-center mb-3"
            style={{ width: "45px", height: "45px" }}
          >
            <i
              className={`bi ${
                micAccess === false
                  ? "bi-mic-mute text-danger"
                  : recording
                  ? "bi-mic-fill text-danger"
                  : "bi-mic text-secondary"
              } fs-5`}
            ></i>
          </div>
          <textarea
            className="form-control shadow-sm"
            rows="10"
            placeholder="Your response..."
            value={alexMessage}
            onChange={(e) => setAlexMessage(e.target.value)}
            style={{
              borderRadius: "15px",
              resize: "none",
              width: "100%",
              height: "220px",
              fontSize: "1rem",
            }}
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-2 mb-5">
        <button
          className="btn btn-danger px-4 py-2 fs-6"
          onClick={stopRecording}
          disabled={!recording}
        >
          Stop Interview
        </button>
        <button
          className="btn btn-primary px-4 py-2 fs-6"
          onClick={startRecording}
          disabled={!startEnabled || recording || micAccess === false}
        >
          Start Recording
        </button>
        <button
          className="btn btn-info text-white px-4 py-2 fs-6"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default BehavioralInterviewScreen;