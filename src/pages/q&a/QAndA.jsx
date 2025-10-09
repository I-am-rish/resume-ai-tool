import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  Divider,
  styled,
  createTheme,
  ThemeProvider,
  alpha,
  CircularProgress,
} from "@mui/material";
import {
  ArrowBack as ArrowLeftIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  SkipNext as SkipForwardIcon,
  Send as SendIcon,
  RestartAlt as RotateCcwIcon,
  ArrowBack,
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import TechnicalPopup from "./TechnicalPopup";
import BehavioralPopup from "./BehavioralPopup";
import { useSnackbar } from "notistack";
import httpClient from "@/utils/httpClinet";

// Custom MUI Theme
const theme = createTheme({
  palette: {
    primary: { main: "#3b82f6" },
    secondary: { main: "#10b981" },
    error: { main: "#ef4444" },
    warning: { main: "#f59e0b" },
    info: { main: "#14b8a6" },
    background: { paper: "#ffffff", default: "#f8fafc" },
    text: { primary: "#1e293b", secondary: "#64748b" },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif',
    h4: { fontWeight: 700, letterSpacing: "-0.02em", fontSize: "2rem" },
    h6: { fontWeight: 600, fontSize: "1.25rem" },
    body1: { fontSize: "1.1rem", lineHeight: 1.8 },
    body2: { fontSize: "0.9rem", lineHeight: 1.6 },
    caption: { color: "#64748b", fontSize: "0.8rem" },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 500,
          padding: "8px 16px",
          transition: "transform 0.2s ease, background-color 0.2s ease",
          "&:hover": {
            transform: "scale(1.02)",
            backgroundColor: "rgba(0, 0, 0, 0.05)",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "6px",
          fontWeight: 500,
          transition: "all 0.2s ease",
          "&:hover": { transform: "scale(1.05)" },
        },
      },
    },
  },
});

// Keyframe animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.7); }
  50% { transform: scale(1.5); box-shadow: 0 0 0 8px rgba(20, 184, 166, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(20, 184, 166, 0); }
`;

const AnimatedCard = styled(Card)(({ theme }) => ({
  animation: `${fadeIn} 0.5s ease-out`,
}));

const mockQuestions = [
  {
    id: "1",
    type: "behavioral",
    difficulty: "easy",
    text: "Tell me about yourself and your background.",
  },
  {
    id: "2",
    type: "behavioral",
    difficulty: "medium",
    text: "Describe a time when you had to work with a difficult team member. How did you handle the situation?",
  },
  {
    id: "3",
    type: "behavioral",
    difficulty: "hard",
    text: "Tell me about a time when you had to make a difficult decision with limited information. What was your process and what was the outcome?",
  },
  {
    id: "4",
    type: "technical",
    difficulty: "easy",
    text: "What is the difference between let, const, and var in JavaScript?",
  },
  {
    id: "5",
    type: "technical",
    difficulty: "medium",
    text: "Explain the concept of closures in JavaScript and provide an example.",
  },
  {
    id: "6",
    type: "technical",
    difficulty: "hard",
    text: "Design a system that can handle 1 million concurrent users. What are the key considerations and how would you architect it?",
  },
];

export default function QA() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [sessionState, setSessionState] = useState("setup");
  const [questionType, setQuestionType] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [show, setShow] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [recognition, setRecognition] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ loader state
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);

  const questionKeys = ["Q1", "Q2", "Q3"];

  useEffect(() => {
    let type = "";
    if (questionType === "behavioral") {
      type = "Behavioral";
    } else if (questionType === "technical") {
      type = "Technical";
    } else {
      return;
    }

    setLoading(true);
    httpClient
      .get(`/qnaQuestion/68e010029199f38a9ae080ed/${type}`)
      .then((res) => {
        console.log("res", res.data.data);
        setQuestions(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
        enqueueSnackbar("Failed to fetch questions", { variant: "error" });
      })
      .finally(() => setLoading(false));
  }, [questionType]);

  // console.log("questions", questions["Q1"]);
  // console.log("currentQuestion", currentQuestion);
  // console.log("sessionState", sessionState);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = true;
      recog.interimResults = true;
      recog.lang = "en-US";
      setRecognition(recog);
    } else {
      enqueueSnackbar("Speech recognition not supported in your browser.", {
        variant: "warning",
      });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    setQuestionType(window.location.pathname.substring(1));
    setShow(true);
  }, [window.location.pathname]);

  useEffect(() => {
    if (sessionState === "question" && currentQuestion) {
      readQuestionAloud(currentQuestion.text);
    }
  }, [sessionState, currentQuestion]);

  const getRandomQuestion = () => {
    const randIndex = Math.floor(Math.random() * questionKeys.length);
    return { index: randIndex, text: questions[questionKeys[randIndex]] };
  };

  const startPractice = () => {
    setCurrentKeyIndex(0);
    setCurrentQuestion({ text: questions[questionKeys[0]] });
    setSessionState("question");
    setFinalTranscript("");
    setInterimTranscript("");
    setFeedback(null);
    setShow(false);
  };

  // console.log("questions", questions);
  // console.log("currentQuestion", currentQuestion);

  const skipQuestion = () => {
    const nextIndex = (currentKeyIndex + 1) % questionKeys.length;
    setCurrentKeyIndex(nextIndex);
    setCurrentQuestion({ text: questions[questionKeys[nextIndex]] });
  };

  const startRecording = () => {
    if (recognition) {
      setIsRecording(true);
      setSessionState("recording");
      setFinalTranscript("");
      setInterimTranscript("");
      recognition.onresult = (event) => {
        let interim = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setFinalTranscript((prev) => prev + transcriptPart + " ");
            setInterimTranscript("");
          } else {
            interim = transcriptPart;
          }
        }
        setInterimTranscript(interim);
      };

      recognition.onerror = (event) => {
        enqueueSnackbar(`Speech recognition error: ${event.error}`, {
          variant: "error",
        });
        setIsRecording(false);
        setSessionState("question");
      };

      recognition.onend = () => {
        if (isRecording) {
          try {
            recognition.start();
          } catch (error) {
            enqueueSnackbar("Failed to restart recording.", {
              variant: "error",
            });
            setIsRecording(false);
            setSessionState("question");
          }
        }
      };

      try {
        recognition.start();
      } catch (error) {
        enqueueSnackbar(
          "Failed to start recording. Please check microphone permissions.",
          { variant: "error" }
        );
        setIsRecording(false);
        setSessionState("question");
      }
    } else {
      enqueueSnackbar("Speech recognition not available.", {
        variant: "warning",
      });
    }
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
    }
    setIsRecording(false);
    setSessionState("reviewing");
    setInterimTranscript("");
  };

  const submitResponse = () => {
    const mockFeedback = {
      overallScore: Math.floor(Math.random() * 40) + 60,
      repetitiveWords: Math.floor(Math.random() * 10) + 2,
      fillerWords: Math.floor(Math.random() * 15) + 5,
      weakWords: Math.floor(Math.random() * 8) + 3,
      summary:
        "Your response demonstrates good structure and relevant examples. Focus on reducing filler words and providing more specific details. Your communication style is clear and professional.",
      sampleResponse:
        "Here's a sample response: I believe this situation requires a structured approach. First, I would gather all relevant information, then analyze the options available, and finally make a decision based on the data and potential outcomes...",
    };
    setFeedback(mockFeedback);
    setSessionState("feedback");
  };

  const practiceAnother = () => {
    const randQ = getRandomQuestion();
    setCurrentKeyIndex(randQ.index);
    setCurrentQuestion({ text: randQ.text });
    setSessionState("question");
    setFinalTranscript("");
    setInterimTranscript("");
    setFeedback(null);
  };

  const readQuestionAloud = (question) => {
    if ("speechSynthesis" in window) {
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

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          backgroundImage: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.05
          )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          p: { xs: 2, md: 4 },
        }}
      >
        <Box sx={{ maxWidth: "100vw", mx: "auto" }}>
          {loading ? (
            <Box
              sx={{
                height: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress color="primary" size={70} thickness={5} />
            </Box>
          ) : (
            <>
              {questionType === "behavioral" && (
                <BehavioralPopup
                  show={show}
                  onClose={() => {
                    setSessionState("setup");
                    setShow(false);
                  }}
                  onStart={startPractice}
                />
              )}
              {questionType === "technical" && (
                <TechnicalPopup
                  show={show}
                  onClose={() => {
                    setSessionState("setup");
                    setShow(false);
                  }}
                  onStart={startPractice}
                />
              )}
              {/* --- Rest of your existing UI remains unchanged --- */}
              {(sessionState === "question" ||
                sessionState === "recording" ||
                sessionState === "reviewing") &&
                currentQuestion && (
                  <Box sx={{ display: "grid", gap: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mt: 1,
                      }}
                    >
                      <Button
                        startIcon={<ArrowBack />}
                        onClick={() => navigate("/dashboard")}
                        variant="outlined"
                        sx={{
                          mb: 2,
                          borderRadius: 2,
                          px: 3,
                          py: 1,
                          backdropFilter: "blur(10px)",
                          backgroundColor: alpha(
                            theme.palette.background.paper,
                            0.7
                          ),
                          "&:hover": {
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.1
                            ),
                          },
                        }}
                        aria-label="Back to Dashboard"
                      >
                        Back to Dashboard
                      </Button>
                    </Box>
                    <AnimatedCard>
                      <CardHeader
                        title={
                          <Typography variant="h5" sx={{ fontWeight: "600" }}>
                            Question
                          </Typography>
                        }
                        action={
                          sessionState === "question" && (
                            <Button
                              variant="outlined"
                              onClick={skipQuestion}
                              startIcon={<SkipForwardIcon />}
                              aria-label="Skip Question"
                              sx={{
                                color: "text.secondary",
                                borderColor: "grey.300",
                                fontSize: "1.2rem",
                              }}
                            >
                              Skip Question
                            </Button>
                          )
                        }
                      />
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: "400" }}>
                          {currentQuestion.text}
                        </Typography>
                      </CardContent>
                    </AnimatedCard>

                    <AnimatedCard>
                      <CardHeader
                        title={
                          <Typography variant="h5" sx={{ fontWeight: "600" }}>
                            Your Response
                          </Typography>
                        }
                      />
                      <CardContent sx={{ display: "grid", gap: 3 }}>
                        {sessionState === "question" && (
                          <Box sx={{ textAlign: "center", py: 4 }}>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={startRecording}
                              startIcon={<MicIcon />}
                              size="large"
                              aria-label="Start Recording"
                              sx={{ py: 1.5, fontSize: "1.2rem" }}
                            >
                              Start Recording
                            </Button>
                            <Typography
                              variant="caption"
                              sx={{ mt: 2, display: "block", fontSize: "1rem" }}
                            >
                              Click to start recording your response
                            </Typography>
                          </Box>
                        )}

                        {sessionState === "recording" && (
                          <Box sx={{ display: "grid", gap: 3 }}>
                            <Box
                              sx={{
                                textAlign: "center",
                                py: 2,
                                fontSize: "1.2rem",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 1,
                                  px: 3,
                                  py: 1,
                                  bgcolor: "info.light",
                                  color: "#0f766e",
                                  borderRadius: "16px",
                                  fontWeight: 500,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 8,
                                    height: 8,
                                    bgcolor: "#0f766e",
                                    borderRadius: "50%",
                                    animation: `${pulse} 1.5s infinite`,
                                  }}
                                />
                                Recording in progress...
                              </Box>
                            </Box>

                            {(finalTranscript || interimTranscript) && (
                              <Box>
                                <Typography
                                  sx={{
                                    mb: 1,
                                    fontWeight: 400,
                                    fontSize: "1.2rem",
                                  }}
                                >
                                  Live Transcript
                                </Typography>
                                <Box
                                  sx={{
                                    p: 2,
                                    bgcolor: "grey.100",
                                    borderRadius: "8px",
                                  }}
                                >
                                  <Typography
                                    variant="h6"
                                    sx={{ fontWeight: "400" }}
                                  >
                                    {finalTranscript + interimTranscript}
                                  </Typography>
                                </Box>
                              </Box>
                            )}

                            <Button
                              variant="outlined"
                              color="error"
                              onClick={stopRecording}
                              startIcon={<MicOffIcon />}
                              aria-label="Stop Recording"
                              sx={{ py: 1.5, fontSize: "1.2rem" }}
                            >
                              Stop Recording
                            </Button>
                          </Box>
                        )}

                        {sessionState === "reviewing" && (
                          <Box sx={{ display: "grid", gap: 3 }}>
                            <Box>
                              <Typography
                                sx={{
                                  mb: 1,
                                  fontWeight: 400,
                                  fontSize: "1.2rem",
                                }}
                              >
                                Edit Your Response
                              </Typography>
                              <TextField
                                value={finalTranscript}
                                onChange={(e) =>
                                  setFinalTranscript(e.target.value)
                                }
                                multiline
                                minRows={6}
                                fullWidth
                                placeholder="Your response transcript..."
                                sx={{
                                  fontWeight: 400,
                                  fontSize: "6rem",
                                  "& .MuiInputBase-root": {
                                    borderRadius: "8px",
                                  },
                                }}
                              />
                            </Box>
                            <Box sx={{ display: "flex", gap: 2 }}>
                              <Button
                                variant="outlined"
                                color="primary"
                                onClick={submitResponse}
                                startIcon={<SendIcon />}
                                aria-label="Submit Response"
                                sx={{ py: 1.5, fontSize: "1.2rem" }}
                              >
                                Submit Response
                              </Button>
                              <Button
                                variant="outlined"
                                onClick={startRecording}
                                startIcon={<MicIcon />}
                                aria-label="Record Again"
                                sx={{ py: 1.5, fontSize: "1.2rem" }}
                              >
                                Record Again
                              </Button>
                            </Box>
                          </Box>
                        )}
                      </CardContent>
                    </AnimatedCard>
                  </Box>
                )}

              {sessionState === "feedback" && feedback && (
                <AnimatedCard>
                  <CardHeader
                    title={<Typography variant="h6">Feedback</Typography>}
                  />
                  <CardContent sx={{ display: "grid", gap: 3 }}>
                    <Box
                      sx={{
                        display: "grid",
                        gap: 2,
                        gridTemplateColumns: {
                          xs: "1fr",
                          sm: "1fr 1fr",
                          lg: "1fr 1fr 1fr 1fr",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          textAlign: "center",
                          p: 3,
                          bgcolor:
                            "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
                          borderRadius: "8px",
                          transition: "all 0.2s ease",
                          "&:hover": { transform: "scale(1.03)" },
                        }}
                      >
                        <Typography variant="h4" color="primary">
                          {feedback.overallScore}%
                        </Typography>
                        <Typography variant="h6">Overall Score</Typography>
                      </Box>
                      <Box
                        sx={{
                          textAlign: "center",
                          p: 3,
                          bgcolor:
                            "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
                          borderRadius: "8px",
                          transition: "all 0.2s ease",
                          "&:hover": { transform: "scale(1.03)" },
                        }}
                      >
                        <Typography variant="h4" sx={{ color: "error.main" }}>
                          {feedback.fillerWords}
                        </Typography>
                        <Typography variant="h6">Filler Words</Typography>
                      </Box>
                      <Box
                        sx={{
                          textAlign: "center",
                          p: 3,
                          bgcolor:
                            "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                          borderRadius: "8px",
                          transition: "all 0.2s ease",
                          "&:hover": { transform: "scale(1.03)" },
                        }}
                      >
                        <Typography variant="h4" sx={{ color: "#d97706" }}>
                          {feedback.weakWords}
                        </Typography>
                        <Typography variant="h6">Weak Words</Typography>
                      </Box>
                    </Box>

                    <Divider />

                    <Box sx={{ display: "grid", gap: 3 }}>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          Summary
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {feedback.summary}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          Sample Response
                        </Typography>
                        <Box
                          sx={{
                            p: 2,
                            bgcolor: "grey.100",
                            borderRadius: "8px",
                          }}
                        >
                          <Typography variant="body1">
                            {feedback.sampleResponse}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", gap: 2, pt: 2 }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={practiceAnother}
                        startIcon={<RotateCcwIcon />}
                        aria-label="Practice Another Question"
                        sx={{ py: 1.5, fontSize: "1.2rem" }}
                      >
                        Practice Another Question
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={startPractice}
                        aria-label="Same Type & Difficulty"
                        sx={{ py: 1.5, fontSize: "1.2rem" }}
                      >
                        Same Type & Difficulty
                      </Button>
                    </Box>
                  </CardContent>
                </AnimatedCard>
              )}
            </>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
