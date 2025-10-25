import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const InterviewResults = () => {

    const navigate = useNavigate();
  const questions = [
    {
      id: 1,
      question: "What are the benefits of using a version control system like Git?",
      score: 75,
    },
    {
      id: 2,
      question:
        "Explain the difference between SQL and NoSQL databases and when to use each.",
      score: 93,
    },
    {
      id: 3,
      question: "What is the difference between var, let, and const in JavaScript?",
      score: 77,
    },
    {
      id: 4,
      question: "Explain the concept of closures in JavaScript with an example.",
      score: 96,
    },
  ];

  return (
    <div className="container py-5 px-0" >
      <h2 className="fw-semibold mb-3">Interview Results</h2>
      <p className="text-muted fs-5">Here's how you performed in your interview.</p>

      {/* Score Section */}
      <div className="bg-white shadow-sm rounded p-4 mb-4 border">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-3">
          <div>
            <h4 className="fw-semibold mb-1">Overall Score</h4>
            <div
              className="progress"
              style={{ height: "10px", width: "500px", maxWidth: "100%" }}
            >
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: "85%" }}
                aria-valuenow="85"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <span className="text-secondary fw-semibold fs-5">85%</span>
          </div>

          {/* <div className="text-end">
            <h6 className="fw-semibold mb-1">Decision</h6>
            <span className="text-success fw-semibold">
              Selected for the next round
            </span>
          </div> */}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white shadow-sm rounded p-4 mb-4 border">
        <h6 className="fw-semibold mb-2 fs-5">Interview Summary</h6>
        <p className="mb-0 text-muted fs-6">
          You completed 4 questions with an average score of 85%. Great job! Your
          responses showed strong communication skills and relevant experience.
        </p>
      </div>

      {/* Question Feedback */}
      <div className="bg-white shadow-sm rounded p-4 border mb-4">
        <h6 className="fw-semibold mb-3 fs-5">Question-by-Question Feedback</h6>
        {questions.map((q) => (
          <div
            key={q.id}
            className="d-flex justify-content-between align-items-center border-bottom py-3"
          >
            <div>
              <p className="fw-semibold mb-1 fs-6">
                Q{q.id}: {q.question}
              </p>
              <button className="btn btn-outline-primary btn-sm fs-6 ">
                View Feedback
              </button>
            </div>
            <div>
              <span className="text-primary fw-semibold fs-5">{q.score}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Buttons */}
      <div className="d-flex justify-content-between mt-4 flex-wrap gap-2">
        <button className="btn btn-outline-secondary fs-6"
        // onClick={() => navigate()}
        >
          Practice Another Interview
        </button>
        <button className="btn btn-primary fs-6"
        onClick={() => navigate("/dashboard")}
        >Back to Dashboard</button>
      </div>
    </div>
  );
};

export default InterviewResults;
