import { useState } from "react";
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

// Custom MUI Theme
const theme = createTheme({
  palette: {
    primary: { main: "#3b82f6" }, // Modern blue
    secondary: { main: "#10b981" }, // Green for success and stop recording
    error: { main: "#ef4444" }, // Red for errors (not used for recording)
    warning: { main: "#f59e0b" }, // Amber for warnings
    info: { main: "#14b8a6" }, // Teal for recording indicator
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

// Keyframe for fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Keyframe for pulse animation
const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.7); }
  50% { transform: scale(1.5); box-shadow: 0 0 0 8px rgba(20, 184, 166, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(20, 184, 166, 0); }
`;

// Styled components
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
  const navigate = useNavigate();
  const [sessionState, setSessionState] = useState("setup");
  const [questionType, setQuestionType] = useState("behavioral");
  const [difficulty, setDifficulty] = useState("medium");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState(null);

  const getRandomQuestion = (type, level) => {
    const filteredQuestions = mockQuestions.filter(
      (q) => q.type === type && q.difficulty === level
    );
    return filteredQuestions[
      Math.floor(Math.random() * filteredQuestions.length)
    ];
  };

  const startPractice = () => {
    const question = getRandomQuestion(questionType, difficulty);
    setCurrentQuestion(question);
    setSessionState("question");
    setTranscript("");
    setFeedback(null);
  };

  const skipQuestion = () => {
    const question = getRandomQuestion(questionType, difficulty);
    setCurrentQuestion(question);
  };

  const startRecording = () => {
    setIsRecording(true);
    setSessionState("recording");
    setTimeout(() => {
      setTranscript(
        "This is a mock transcript. In a real implementation, this would be generated from speech-to-text..."
      );
    }, 2000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setSessionState("reviewing");
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
    setSessionState("setup");
    setCurrentQuestion(null);
    setTranscript("");
    setFeedback(null);
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case "easy":
        return { bgcolor: "success.light", color: "success.main" };
      case "medium":
        return { bgcolor: "#fef3c7", color: "#d97706" }; // Softer amber
      case "hard":
        return { bgcolor: "error.light", color: "error.main" };
      default:
        return { bgcolor: "grey.100", color: "grey.800" };
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
        <Box sx={{ maxWidth: "80vw", mx: "auto" }}>
          {/* <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}> */}
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate("/dashboard")}
            variant="outlined"
            sx={{
              mb: 2,
              borderRadius: 2,
              px: 3,
              py: 1,
              // backdropFilter: "blur(10px)",
              backgroundColor: alpha(theme.palette.background.paper, 0.7),
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            Back to Dashboard
          </Button>
          {/* </Box> */}

          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              sx={{
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                // mb: 1,
                fontWeight: 600,
              }}
            >
              Q&A Practice
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
              Practice common interview questions and improve your answers.
            </Typography>
          </Box>

          {sessionState === "setup" && (
            <AnimatedCard>
              <CardHeader
                title={
                  <Typography variant="h6">
                    Set Up Your Practice Session
                  </Typography>
                }
              />
              <CardContent>
                <Box
                  sx={{
                    display: "grid",
                    gap: 3,
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  }}
                >
                  <FormControl>
                    <InputLabel id="question-type-label">
                      Question Type
                    </InputLabel>
                    <Select
                      labelId="question-type-label"
                      value={questionType}
                      label="Question Type"
                      onChange={(e) => setQuestionType(e.target.value)}
                      sx={{ borderRadius: "8px" }}
                    >
                      <MenuItem value="behavioral">Behavioral</MenuItem>
                      <MenuItem value="technical">Technical</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <InputLabel id="difficulty-level-label">
                      Difficulty Level
                    </InputLabel>
                    <Select
                      labelId="difficulty-level-label"
                      value={difficulty}
                      label="Difficulty Level"
                      onChange={(e) => setDifficulty(e.target.value)}
                      sx={{ borderRadius: "8px" }}
                    >
                      <MenuItem value="easy">Easy</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="hard">Hard</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={startPractice}
                  sx={{ mt: 3, width: { xs: "100%", sm: "auto" }, py: 1.5 }}
                  aria-label="Start Practice Session"
                >
                  Start Practice Session
                </Button>
              </CardContent>
            </AnimatedCard>
          )}

          {(sessionState === "question" ||
            sessionState === "recording" ||
            sessionState === "reviewing") &&
            currentQuestion && (
              <Box sx={{ display: "grid", gap: 3 }}>
                <AnimatedCard>
                  <CardHeader
                    title={
                      <Typography variant="h6">Current Question</Typography>
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
                          }}
                        >
                          Skip Question
                        </Button>
                      )
                    }
                  />
                  <CardContent>
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <Chip
                        label={currentQuestion.type}
                        sx={{
                          textTransform: "capitalize",
                          bgcolor: "grey.100",
                          color: "grey.800",
                        }}
                      />
                      <Chip
                        label={currentQuestion.difficulty}
                        sx={{
                          textTransform: "capitalize",
                          ...getDifficultyColor(currentQuestion.difficulty),
                        }}
                      />
                    </Box>
                    <Typography variant="body1">
                      {currentQuestion.text}
                    </Typography>
                  </CardContent>
                </AnimatedCard>

                <AnimatedCard>
                  <CardHeader
                    title={<Typography variant="h6">Your Response</Typography>}
                  />
                  <CardContent sx={{ display: "grid", gap: 3 }}>
                    {sessionState === "question" && (
                      <Box sx={{ textAlign: "center", py: 4 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={startRecording}
                          startIcon={<MicIcon />}
                          size="large"
                          aria-label="Start Recording"
                          sx={{ py: 1.5 }}
                        >
                          Start Recording
                        </Button>
                        <Typography
                          variant="caption"
                          sx={{ mt: 2, display: "block" }}
                        >
                          Click to start recording your response
                        </Typography>
                      </Box>
                    )}

                    {sessionState === "recording" && (
                      <Box sx={{ display: "grid", gap: 3 }}>
                        <Box sx={{ textAlign: "center", py: 2 }}>
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

                        {transcript && (
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{ mb: 1, fontWeight: 500 }}
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
                              <Typography variant="body2">
                                {transcript}
                              </Typography>
                            </Box>
                          </Box>
                        )}

                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={stopRecording}
                          startIcon={<MicOffIcon />}
                          aria-label="Stop Recording"
                          sx={{ py: 1.5 }}
                        >
                          Stop Recording
                        </Button>
                      </Box>
                    )}

                    {sessionState === "reviewing" && (
                      <Box sx={{ display: "grid", gap: 3 }}>
                        <Box>
                          <Typography
                            variant="subtitle2"
                            sx={{ mb: 1, fontWeight: 500 }}
                          >
                            Edit Your Response
                          </Typography>
                          <TextField
                            value={transcript}
                            onChange={(e) => setTranscript(e.target.value)}
                            multiline
                            minRows={6}
                            fullWidth
                            placeholder="Your response transcript..."
                            sx={{
                              "& .MuiInputBase-root": { borderRadius: "8px" },
                            }}
                          />
                        </Box>
                        <Box sx={{ display: "flex", gap: 2 }}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={submitResponse}
                            startIcon={<SendIcon />}
                            aria-label="Submit Response"
                            sx={{ py: 1.5 }}
                          >
                            Submit Response
                          </Button>
                          <Button
                            variant="outlined"
                            onClick={startRecording}
                            startIcon={<MicIcon />}
                            aria-label="Record Again"
                            sx={{ py: 1.5 }}
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
                title={
                  <Typography variant="h6">Performance Feedback</Typography>
                }
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
                    <Typography variant="h6" color="primary">
                      {feedback.overallScore}%
                    </Typography>
                    <Typography variant="caption">Overall Score</Typography>
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
                    <Typography variant="h6" sx={{ color: "#d97706" }}>
                      {feedback.repetitiveWords}
                    </Typography>
                    <Typography variant="caption">Repetitive Words</Typography>
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
                    <Typography variant="h6" sx={{ color: "error.main" }}>
                      {feedback.fillerWords}
                    </Typography>
                    <Typography variant="caption">Filler Words</Typography>
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
                    <Typography variant="h6" sx={{ color: "#d97706" }}>
                      {feedback.weakWords}
                    </Typography>
                    <Typography variant="caption">Weak Words</Typography>
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
                    <Typography variant="body2" color="text.secondary">
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
                      sx={{ p: 2, bgcolor: "grey.100", borderRadius: "8px" }}
                    >
                      <Typography variant="body2">
                        {feedback.sampleResponse}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 2, pt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={practiceAnother}
                    startIcon={<RotateCcwIcon />}
                    aria-label="Practice Another Question"
                    sx={{ py: 1.5 }}
                  >
                    Practice Another Question
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={startPractice}
                    aria-label="Same Type & Difficulty"
                    sx={{ py: 1.5 }}
                  >
                    Same Type & Difficulty
                  </Button>
                </Box>
              </CardContent>
            </AnimatedCard>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
