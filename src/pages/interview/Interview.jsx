import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Paper,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Tooltip,
  alpha,
} from "@mui/material";
import {
  ArrowBack,
  PlayArrow,
  Pause,
  StopCircle,
  Mic,
  MicOff,
  Edit,
  Send,
  ExpandMore,
  CheckCircle,
  Cancel,
  VolumeUp,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";

const INTERVIEW_QUESTIONS = [
  // Behavioral Questions
  {
    id: "b1",
    question: "Tell me about yourself and why you're interested in this role.",
    type: "behavioral",
    level: "entry",
  },
  {
    id: "b2",
    question:
      "Describe a challenging situation you faced at work and how you handled it.",
    type: "behavioral",
    level: "mid",
  },
  {
    id: "b3",
    question:
      "Tell me about a time when you had to lead a team through a difficult project.",
    type: "behavioral",
    level: "senior",
  },
  {
    id: "b4",
    question: "How do you handle feedback and criticism?",
    type: "behavioral",
    level: "entry",
  },
  {
    id: "b5",
    question:
      "Describe a time when you had to adapt to significant changes at work.",
    type: "behavioral",
    level: "mid",
  },
  // Technical Questions
  {
    id: "t1",
    question:
      "What is the difference between var, let, and const in JavaScript?",
    type: "technical",
    level: "entry",
  },
  {
    id: "t2",
    question: "Explain the concept of closures in JavaScript with an example.",
    type: "technical",
    level: "mid",
  },
  {
    id: "t3",
    question:
      "How would you design a scalable microservices architecture for a high-traffic application?",
    type: "technical",
    level: "senior",
  },
  {
    id: "t4",
    question:
      "What are the benefits of using a version control system like Git?",
    type: "technical",
    level: "entry",
  },
  {
    id: "t5",
    question:
      "Explain the difference between SQL and NoSQL databases and when to use each.",
    type: "technical",
    level: "mid",
  },
];

export default function Interview() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  // Interview setup state
  const [timing, setTiming] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");

  // Interview session state
  const [sessionState, setSessionState] = useState("setup");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [responses, setResponses] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentResponse, setCurrentResponse] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [stopDialogOpen, setStopDialogOpen] = useState(false);

  const timerRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        setCurrentResponse((prev) => {
          const baseText = prev.replace(/\[Speaking...\]$/, "");
          return (
            baseText +
            finalTranscript +
            (interimTranscript ? "[Speaking...]" : "")
          );
        });
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
        enqueueSnackbar("Speech recognition error. Please try again.", {
          variant: "error",
        });
      };
    }
  }, [enqueueSnackbar]);

  // Timer effect
  useEffect(() => {
    if (sessionState === "active" && timeRemaining > 0 && !isPaused) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            endInterview();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeRemaining, sessionState, isPaused]);

  const generateQuestions = () => {
    const duration = parseInt(timing);
    const numQuestions = duration === 20 ? 4 : 6;
    let filteredQuestions = INTERVIEW_QUESTIONS;

    // Filter by question type
    if (questionType === "behavioral") {
      filteredQuestions = filteredQuestions.filter(
        (q) => q.type === "behavioral"
      );
    } else if (questionType === "technical") {
      filteredQuestions = filteredQuestions.filter(
        (q) => q.type === "technical"
      );
    }

    // Filter by experience level
    filteredQuestions = filteredQuestions.filter(
      (q) => q.level === experienceLevel
    );

    // If not enough questions, add from other levels
    if (filteredQuestions.length < numQuestions) {
      const additionalQuestions = INTERVIEW_QUESTIONS.filter(
        (q) =>
          !filteredQuestions.includes(q) &&
          (questionType === "mixed" ||
            q.type === questionType ||
            questionType === "")
      );
      filteredQuestions = [...filteredQuestions, ...additionalQuestions];
    }

    // Shuffle and take required number
    const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numQuestions);
  };

  const startInterview = () => {
    if (!timing || !questionType || !experienceLevel) {
      enqueueSnackbar("Please select all interview options before starting.", {
        variant: "warning",
      });
      return;
    }

    const questions = generateQuestions();
    setInterviewQuestions(questions);
    setTimeRemaining(parseInt(timing) * 60);
    setSessionState("active");
    setCurrentQuestionIndex(0);
    setCurrentResponse("");
    setResponses([]);

    // Read first question aloud
    setTimeout(() => readQuestionAloud(questions[0].question), 500);
  };

  const readQuestionAloud = (question) => {
    if ("speechSynthesis" in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(question);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    } else {
      enqueueSnackbar("Speech synthesis not supported in your browser.", {
        variant: "warning",
      });
    }
  };

  const replayQuestion = () => {
    const currentQuestion = interviewQuestions[currentQuestionIndex];
    if (currentQuestion) {
      readQuestionAloud(currentQuestion.question);
    }
  };

  const startRecording = () => {
    if (recognitionRef.current && !isRecording) {
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      setIsRecording(false);
      recognitionRef.current.stop();
      setCurrentResponse((prev) => prev.replace(/\[Speaking...\]$/, ""));
    }
  };

  const submitResponse = () => {
    if (!currentResponse.trim()) {
      enqueueSnackbar("Please provide a response before submitting.", {
        variant: "warning",
      });
      return;
    }

    const currentQuestion = interviewQuestions[currentQuestionIndex];
    const score = Math.floor(Math.random() * 30) + 70; // Mock score 70-100
    const feedback = generateMockFeedback(
      currentQuestion,
      currentResponse,
      score
    );

    const newResponse = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      response: currentResponse,
      score,
      feedback,
    };

    setResponses((prev) => [...prev, newResponse]);
    setCurrentResponse("");
    setIsEditing(false);

    if (currentQuestionIndex < interviewQuestions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setTimeout(
        () => readQuestionAloud(interviewQuestions[nextIndex].question),
        500
      );
    } else {
      endInterview();
    }
  };

  const endInterview = () => {
    setSessionState("results");
    setIsPaused(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const pauseInterview = () => {
    setIsPaused(true);
  };

  const resumeInterview = () => {
    setIsPaused(false);
  };

  const stopInterview = () => {
    setStopDialogOpen(false);
    setSessionState("setup");
    setCurrentQuestionIndex(0);
    setInterviewQuestions([]);
    setResponses([]);
    setCurrentResponse("");
    setTimeRemaining(0);
    setIsPaused(false);
    setSelectedQuestionId(null);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const getInterviewTypeDisplay = () => {
    const duration = `${timing} min`;
    const type =
      questionType === "mixed"
        ? "Mixed"
        : questionType.charAt(0).toUpperCase() + questionType.slice(1);
    const level =
      experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1);
    return `${duration} • ${type} • ${level} Level`;
  };

  const generateMockFeedback = (question, response, score) => {
    const feedbacks = [
      "Good structure and clear communication. Consider adding more specific examples.",
      "Strong technical knowledge demonstrated. Could benefit from more real-world applications.",
      "Excellent problem-solving approach. Try to be more concise in your explanations.",
      "Good understanding of concepts. Include more details about your personal contributions.",
      "Clear and well-organized response. Consider discussing potential challenges and solutions.",
    ];
    return feedbacks[Math.floor(Math.random() * feedbacks.length)];
  };

  const calculateOverallScore = () => {
    if (responses.length === 0) return 0;
    return Math.round(
      responses.reduce((sum, r) => sum + r.score, 0) / responses.length
    );
  };

  const getInterviewDecision = (score) => {
    return score >= 80 ? "Selected for the next round" : "Rejected";
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const resetInterview = () => {
    setSessionState("setup");
    setCurrentQuestionIndex(0);
    setInterviewQuestions([]);
    setResponses([]);
    setCurrentResponse("");
    setTimeRemaining(0);
    setIsPaused(false);
    setSelectedQuestionId(null);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  if (sessionState === "setup") {
    return (
      <Box
        sx={{
          p: 3,
          bgcolor: "background.default",
          backgroundImage: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.05
          )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          minHeight: "100vh",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/dashboard")}
            sx={{
              mb: 2,
              borderRadius: 2,
              px: 3,
              py: 1,
              backdropFilter: "blur(10px)",
              backgroundColor: alpha(theme.palette.background.paper, 0.7),
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
            variant="outlined"
          >
            Back to Dashboard
          </Button>
          <Typography
            variant="h3"
            component="h1"
            fontWeight="bold"
            sx={{
              // background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              // WebkitBackgroundClip: "text",
              // WebkitTextFillColor: "transparent",
              // mb: 1,
              color: "#077fcf",
            }}
          >
            Interview Practice
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Conduct mock interviews and receive AI-powered feedback.
          </Typography>
        </Box>

        <Card sx={{ maxWidth: 800, mx: "auto" }}>
          <CardHeader title="Interview Setup" />
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <FormControl fullWidth>
              <InputLabel id="timing-label">Interview Duration</InputLabel>
              <Select
                labelId="timing-label"
                value={timing}
                label="Interview Duration"
                onChange={(e) => setTiming(e.target.value)}
              >
                <MenuItem value="20">20 minutes</MenuItem>
                <MenuItem value="30">30 minutes</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="question-type-label">Question Type</InputLabel>
              <Select
                labelId="question-type-label"
                value={questionType}
                label="Question Type"
                onChange={(e) => setQuestionType(e.target.value)}
              >
                <MenuItem value="behavioral">Behavioral</MenuItem>
                <MenuItem value="technical">Technical</MenuItem>
                <MenuItem value="mixed">Mix of Behavioral & Technical</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="experience-label">Experience Level</InputLabel>
              <Select
                labelId="experience-label"
                value={experienceLevel}
                label="Experience Level"
                onChange={(e) => setExperienceLevel(e.target.value)}
              >
                <MenuItem value="entry">Entry Level</MenuItem>
                <MenuItem value="mid">Mid Level</MenuItem>
                <MenuItem value="senior">Senior Level</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrow />}
              onClick={startInterview}
              sx={{ py: 1.5 }}
            >
              Start Interview
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  if (sessionState === "active") {
    const currentQuestion = interviewQuestions[currentQuestionIndex];
    const progress =
      ((currentQuestionIndex + 1) / interviewQuestions.length) * 100;

    return (
      <Box
        sx={{
          p: 3,
          bgcolor: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              {getInterviewTypeDisplay()}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
              <Typography variant="h6" fontWeight="medium">
                Question {currentQuestionIndex + 1} of{" "}
                {interviewQuestions.length}
              </Typography>
              <Box sx={{ width: 120 }}>
                <LinearProgress variant="determinate" value={progress} />
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Typography variant="h5" fontWeight="bold" color="primary">
              {formatTime(timeRemaining)}
              {isPaused && (
                <Typography
                  variant="body2"
                  component="span"
                  color="text.secondary"
                  sx={{ ml: 1 }}
                >
                  (Paused)
                </Typography>
              )}
            </Typography>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Tooltip title="Speak Question Again">
                <Button
                  onClick={replayQuestion}
                  variant="outlined"
                  startIcon={<VolumeUp />}
                  disabled={isPaused}
                >
                  Replay
                </Button>
              </Tooltip>

              <Button
                onClick={isPaused ? resumeInterview : pauseInterview}
                variant="outlined"
                startIcon={isPaused ? <PlayArrow /> : <Pause />}
              >
                {isPaused ? "Resume" : "Pause"}
              </Button>

              <Button
                variant="outlined"
                color="error"
                startIcon={<StopCircle />}
                onClick={() => setStopDialogOpen(true)}
              >
                Stop
              </Button>
            </Box>
          </Box>
        </Box>

        <Card>
          <CardHeader
            title={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6" color="primary" sx={{ mr: 1 }}>
                  Q{currentQuestionIndex + 1}:
                </Typography>
                <Typography variant="h6">
                  {currentQuestion?.question}
                </Typography>
              </Box>
            }
          />
          <CardContent
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                variant={isRecording ? "contained" : "outlined"}
                color={isRecording ? "error" : "primary"}
                startIcon={isRecording ? <MicOff /> : <Mic />}
                disabled={isPaused}
              >
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>

              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outlined"
                startIcon={<Edit />}
                disabled={isPaused}
              >
                Edit Response
              </Button>
            </Box>

            <Box>
              <Typography variant="body2" fontWeight="medium" gutterBottom>
                Your Response:
              </Typography>
              {isEditing ? (
                <TextField
                  value={currentResponse}
                  onChange={(e) => setCurrentResponse(e.target.value)}
                  placeholder="Type your response here..."
                  multiline
                  rows={6}
                  fullWidth
                  disabled={isPaused}
                />
              ) : (
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    minHeight: 120,
                    bgcolor: theme.palette.action.hover,
                    typography: "body2",
                  }}
                >
                  {currentResponse ||
                    "Start recording or type your response..."}
                </Paper>
              )}
            </Box>

            <Button
              onClick={submitResponse}
              variant="contained"
              disabled={!currentResponse.trim() || isPaused}
              startIcon={<Send />}
              sx={{ py: 1.2 }}
            >
              Submit Response
            </Button>
          </CardContent>
        </Card>

        <Dialog open={stopDialogOpen} onClose={() => setStopDialogOpen(false)}>
          <DialogTitle>Stop Interview</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to stop the interview? Your progress will be
              lost and you'll be returned to the setup screen.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setStopDialogOpen(false)}>
              No, Continue
            </Button>
            <Button onClick={stopInterview} color="error" variant="contained">
              Yes, Stop Interview
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }

  if (sessionState === "results") {
    const overallScore = calculateOverallScore();
    const decision = getInterviewDecision(overallScore);
    const isSelected = decision.includes("Selected");

    return (
      <Box
        sx={{
          p: 3,
          bgcolor: theme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Interview Results
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's how you performed in your interview.
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Overall Score" />
              <CardContent>
                <Typography variant="h3" fontWeight="bold" color="primary">
                  {overallScore}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={overallScore}
                  sx={{ mt: 2 }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Decision" />
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {isSelected ? (
                    <CheckCircle color="success" fontSize="large" />
                  ) : (
                    <Cancel color="error" fontSize="large" />
                  )}
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color={isSelected ? "success.main" : "error.main"}
                  >
                    {decision}
                  </Typography>
                </Box>
                {!isSelected && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Don't worry, you got this! Let's keep practicing.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card sx={{ mb: 4 }}>
          <CardHeader title="Interview Summary" />
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              You completed {responses.length} questions with an average score
              of {overallScore}%.
              {isSelected
                ? " Great job! Your responses showed strong communication skills and relevant experience."
                : " Focus on providing more specific examples and structured responses to improve your performance."}
            </Typography>
          </CardContent>
        </Card>

        {!isSelected && (
          <Card sx={{ mb: 4 }}>
            <CardHeader title="Recommendations for Improvement" />
            <CardContent>
              <List>
                {[
                  "Provide more specific examples from your experience",
                  "Use the STAR method (Situation, Task, Action, Result) for behavioral questions",
                  "Practice explaining technical concepts in simpler terms",
                  "Work on structuring your responses more clearly",
                  "Prepare stories that highlight your key achievements",
                ].map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemText primary={`• ${item}`} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader title="Question-by-Question Feedback" />
          <CardContent>
            {responses.map((response, index) => (
              <Accordion key={response.questionId}>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <Typography>
                      Q{index + 1}: {response.question}
                    </Typography>
                    <Chip
                      label={`${response.score}%`}
                      color={response.score >= 80 ? "success" : "warning"}
                      size="small"
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Paper
                    variant="outlined"
                    sx={{ p: 2, bgcolor: theme.palette.action.hover }}
                  >
                    <Typography variant="body2">{response.feedback}</Typography>
                  </Paper>
                </AccordionDetails>
              </Accordion>
            ))}
          </CardContent>
        </Card>

        <Box sx={{ display: "flex", gap: 3, mt: 4 }}>
          <Button variant="outlined" onClick={resetInterview} sx={{ flex: 1 }}>
            Practice Another Interview
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/dashboard")}
            startIcon={<ArrowBack />}
            sx={{ flex: 1 }}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Box>
    );
  }

  return null;
}
