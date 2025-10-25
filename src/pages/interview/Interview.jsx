import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import TechPopup from "./TechPopup";
import BehavioralPractice from "./BehavPopup";
import httpClient from "@/utils/httpClinet";
import { useNavigate } from "react-router-dom";

const InterviewScreen = () => {
  const [recording, setRecording] = useState(false);
  const [sarahMessage, setSarahMessage] = useState("");
  const [alexMessage, setAlexMessage] = useState("");
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [startEnabled, setStartEnabled] = useState(false);
  const [micAccess, setMicAccess] = useState(null);
  const [showPopup, setShowPopup] = useState(true);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [loading, SetLoading] = useState(false);
  const [showTimeUpModal, setShowTimeUpModal] = useState(false); // NEW: Modal state

  const navigate = useNavigate();

  const chunks = useRef([]);
  const recognitionRef = useRef(null);
  const intervalIdRef = useRef(null);
  const typingIntervalRef = useRef(null);
  const utteranceRef = useRef(null);

  const [timer, setTimer] = useState(20 * 60);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const startCountdownTimer = () => {
    if (intervalIdRef.current) return;

    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          intervalIdRef.current = null;
          handleTimeUp(); // Trigger modal
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    intervalIdRef.current = id;
  };

  const stopCountdownTimer = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  // Handle time up: Show modal
  const handleTimeUp = () => {
    stopRecording();
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

    setShowTimeUpModal(true); // Show modal
  };

  const startRecording = async () => {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      alert("Your browser does not support audio recording.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicAccess(true);
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        console.log("Recorded Audio Blob:", blob);
        chunks.current = [];
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setRecording(true);

      const SpeechRecognition =
        window.SpeechRecognitionAlternative || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        alert("Speech recognition is not supported in this browser.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      recognitionRef.current = recognition;

      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setAlexMessage(transcript);
      };

      recognition.start();
    } catch (err) {
      setMicAccess(false);
      alert(
        "Microphone access denied or unavailable. Please check your settings."
      );
      console.error("Microphone error:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    stopCountdownTimer();
    setRecording(false);
    setMicAccess(null);
  };

  const fetchNextQuestionFromAPI = (nextArray) => {
    const type = localStorage.getItem("interviewType");

    httpClient
      .post(`/interviewQuestions/68e010029199f38a9ae080ed`, {
        questionType: type,
        nextArray,
      })
      .then((res) => {
        const questionData = res.data.data;
        setAlexMessage("");
        localStorage.setItem(
          "interviewQuestions",
          JSON.stringify(questionData)
        );
        setSarahMessage("...");
        setStartEnabled(false);

        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
        }

        setTimeout(() => {
          let displayedText = "";
          const fullText =
            (questionData?.introduction || "") + (questionData?.Question || "");

          typingIntervalRef.current = setInterval(() => {
            if (displayedText.length < fullText.length) {
              displayedText = fullText.slice(0, displayedText.length + 1);
              setSarahMessage(displayedText);
            } else {
              clearInterval(typingIntervalRef.current);
              typingIntervalRef.current = null;
              speakQuestion(displayedText);
              setTimeout(() => setStartEnabled(true), 1000);
            }
          }, 30);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        SetLoading(false);
      });
  };

  const handleSubmit = () => {
    SetLoading(true);
    const oldArray = JSON.parse(localStorage.getItem("nextArray")) || [];

    const newEntry = {
      system_response: sarahMessage,
      user_response: alexMessage,
    };

    const updatedArray =
      oldArray.length === 0 ? [newEntry] : [...oldArray, newEntry];
    localStorage.setItem("nextArray", JSON.stringify(updatedArray));
    fetchNextQuestionFromAPI(updatedArray);
  };

  const speakQuestion = (text) => {
    if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.volume = 1;
    utterance.rate = 1;
    utterance.pitch = 1;

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const currentPath = window.location.pathname;
  const isTechnical = currentPath.includes("/technical");
  const isBehavioral = currentPath.includes("/behavioral");

  const handlePopupStart = (type, duration) => {
    localStorage.removeItem("nextArray");
    localStorage.removeItem("interviewQuestions");
    localStorage.setItem("interviewType", type);
    setShowPopup(false);
    setInterviewStarted(true);

    setTimer(duration * 60);

    httpClient
      .post(`/interviewQuestions/68e010029199f38a9ae080ed`, {
        questionType: type,
        nextArray: [],
      })
      .then((res) => {
        const questionData = res.data.data;
        localStorage.setItem(
          "interviewQuestions",
          JSON.stringify(questionData)
        );
        setSarahMessage("...");
        setStartEnabled(false);

        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

        setTimeout(() => {
          const fullText =
            (questionData?.introduction || "") + (questionData?.Question || "");
          let displayedText = "";

          typingIntervalRef.current = setInterval(() => {
            if (displayedText.length < fullText.length) {
              displayedText = fullText.slice(0, displayedText.length + 1);
              setSarahMessage(displayedText);
            } else {
              clearInterval(typingIntervalRef.current);
              typingIntervalRef.current = null;
              speakQuestion(displayedText);
              setTimeout(() => setStartEnabled(true), 1000);
            }
          }, 30);
        }, 1000);

        startCountdownTimer();
      })
      .catch((err) => {
        console.error("Error fetching interview questions:", err);
      });
  };

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (intervalIdRef.current) clearInterval(intervalIdRef.current);
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      if (recognitionRef.current) recognitionRef.current.stop();
      if (mediaRecorder && mediaRecorder.state !== "inactive")
        mediaRecorder.stop();
    };
  }, [mediaRecorder]);

  if (showPopup) {
    if (isTechnical) return <TechPopup onStart={handlePopupStart} />;
    if (isBehavioral) return <BehavioralPractice onStart={handlePopupStart} />;
  }

  if (!interviewStarted) return null;

  return (
    <>
      {/* Main Interview UI */}
      <div
        className="min-vh-100 d-flex flex-column justify-content-start align-items-center p-5"
        style={{
          background: "linear-gradient(to bottom right, #e8f5ff, #f9fcff)",
          padding: "40px 30px",
        }}
      >
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center w-100 mb-5">
          <button
            className="btn btn-outline-secondary btn-sm fs-6"
            onClick={() => {
              stopRecording();
              navigate("/dashboard");
            }}
          >
            Back
          </button>

          <h2 className="fw-bold m-0">Interview</h2>

          <div className="d-flex align-items-center gap-3">
            <div
              className={`border rounded px-3 py-1 text-center fw-semibold ${
                timer <= 180 ? "text-danger" : ""
              }`}
              style={{ minWidth: "70px" }}
            >
              {formatTime(timer)}
            </div>
          </div>
        </div>

        {/* Interviewers */}
        <div
          className="row w-100 justify-content-center mt-3"
          style={{ maxWidth: "1500px" }}
        >
          {/* Sarah */}
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
                minHeight: "220px",
                fontSize: "1rem",
                backgroundColor: "#f9f9f9",
              }}
            />
          </div>

          {/* Alex */}
          <div className="col-md-5 mb-5 d-flex flex-column align-items-center">
            <img
              src="https://randomuser.me/api/portraits/men/44.jpg"
              alt="Alex"
              className="rounded-4 shadow-sm"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <p className="fw-semibold mt-3 mb-2 fs-5">You</p>
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
                minHeight: "220px",
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
            className="btn btn-info text-white px-4 py-2 fs-6 d-flex align-items-center justify-content-center"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>

      {/* Time Up Modal */}
      {showTimeUpModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          aria-modal="true"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold text-primary">
                  Session Ended
                </h5>
              </div>
              <div className="modal-body text-center py-4">
                <p className="fs-5 mb-0">
                  Your session has ended. Please click below button to see your
                  result.
                </p>
              </div>
              <div className="modal-footer border-0 justify-content-center pb-4">
                <button
                  type="button"
                  className="btn btn-primary px-5 fs-6"
                  onClick={() => {
                    setShowTimeUpModal(false);
                    navigate("/result"); // Change to your result page
                  }}
                >
                  View Result
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InterviewScreen;