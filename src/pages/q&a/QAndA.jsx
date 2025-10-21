import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardHeader, CardContent, Typography, FormControl, InputLabel, Select, MenuItem, TextField, Chip, Divider, styled, createTheme, ThemeProvider, alpha, CircularProgress, } from "@mui/material";
import { ArrowBack as ArrowLeftIcon, Mic as MicIcon, MicOff as MicOffIcon, SkipNext as SkipForwardIcon, Send as SendIcon, RestartAlt as RotateCcwIcon, ArrowBack, Refresh as RefreshIcon } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import TechnicalPopup from "./TechnicalPopup";
import BehavioralPopup from "./BehavioralPopup";
import { useSnackbar } from "notistack";
import httpClient from "@/utils/httpClinet";

// Custom MUI Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#3b82f6"
    },
    secondary: {
      main: "#10b981"
    },
    error: {
      main: "#ef4444"
    },
    warning: {
      main: "#f59e0b"
    },
    info: {
      main: "#14b8a6"
    },
    background: {
      paper: "#ffffff",
      default: "#f8fafc"
    },
    text: {
      primary: "#1e293b",
      secondary: "#64748b"
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      fontSize: "2rem"
    },
    h6: {
      fontWeight: 600,
      fontSize: "1.25rem"
    },
    body1: {
      fontSize: "1.1rem",
      lineHeight: 1.8
    },
    body2: {
      fontSize: "0.9rem",
      lineHeight: 1.6
    },
    caption: {
      color: "#64748b",
      fontSize: "0.8rem"
    },
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
          "&:hover": {
            transform: "scale(1.05)"
          },
        },
      },
    },
  },
});

// Keyframe animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.7);
  }
  50% {
    transform: scale(1.5);
    box-shadow: 0 0 0 8px rgba(20, 184, 166, 0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(20, 184, 166, 0);
  }
`;

const AnimatedCard = styled(Card)(({ theme }) => ({
  animation: `${fadeIn} 0.5s ease-out`,
}));

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
  const [loading, setLoading] = useState(false);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [recordingTimeout, setRecordingTimeout] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  const questionKeys = ["Q1", "Q2", "Q3"];

  // Utility function to stop speech synthesis
  const stopSpeechSynthesis = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Cleanup speech synthesis and recording when component unmounts
  useEffect(() => {
    return () => {
      stopSpeechSynthesis();
      if (recordingTimeout) {
        clearTimeout(recordingTimeout);
      }
    };
  }, [recordingTimeout]);

  // Handle navigation cleanup and question type setting
  useEffect(() => {
    stopSpeechSynthesis();
    const type = window.location.pathname.substring(5);
    console.log("type", type);
    setQuestionType(type);
    setShow(true);
  }, []);

  // Fetch questions when question type changes
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
        enqueueSnackbar("Failed to fetch questions", {
          variant: "error"
        });
      })
      .finally(() => setLoading(false));
  }, [questionType, enqueueSnackbar]);

  // Initialize speech recognition with better configuration
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recog = new SpeechRecognition();
      recog.continuous = true;
      recog.interimResults = true;
      recog.lang = "en-US";
      recog.maxAlternatives = 1;
      
      // Configure timeouts if supported
      if (recog.hasOwnProperty('silenceTimeout')) {
        recog.silenceTimeout = 3000; // 3 seconds of silence
      }
      
      setRecognition(recog);
    } else {
      enqueueSnackbar("Speech recognition not supported in your browser.", {
        variant: "warning",
      });
    }
  }, [enqueueSnackbar]);

  // Read question aloud when session state changes to question
  useEffect(() => {
    if (sessionState === "question" && currentQuestion) {
      const timer = setTimeout(() => {
        readQuestionAloud(currentQuestion.text);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [sessionState, currentQuestion]);

  // Stop speech when session state changes to setup or show becomes false
  useEffect(() => {
    if (sessionState === "setup" || !show) {
      stopSpeechSynthesis();
    }
  }, [sessionState, show]);

  const getRandomQuestion = () => {
    const randIndex = Math.floor(Math.random() * questionKeys.length);
    return {
      index: randIndex,
      text: questions[questionKeys[randIndex]]
    };
  };

  const startPractice = () => {
    stopSpeechSynthesis();
    if (recordingTimeout) {
      clearTimeout(recordingTimeout);
      setRecordingTimeout(null);
    }
    setCurrentKeyIndex(0);
    setCurrentQuestion({ text: questions[questionKeys[0]] });
    setSessionState("question");
    setFinalTranscript("");
    setInterimTranscript("");
    setFeedback(null);
    setShow(false);
  };

  const skipQuestion = () => {
    stopSpeechSynthesis();
    if (recordingTimeout) {
      clearTimeout(recordingTimeout);
      setRecordingTimeout(null);
    }
    const nextIndex = (currentKeyIndex + 1) % questionKeys.length;
    setCurrentKeyIndex(nextIndex);
    setCurrentQuestion({ text: questions[questionKeys[nextIndex]] });
  };

  const restartRecording = () => {
    stopRecording();
    setTimeout(startRecording, 100);
  };

  const startRecording = () => {
    stopSpeechSynthesis();
    
    // Clear any existing timeout
    if (recordingTimeout) {
      clearTimeout(recordingTimeout);
      setRecordingTimeout(null);
    }
    
    if (recognition) {
      setIsRecording(true);
      setSessionState("recording");
      setFinalTranscript("");
      setInterimTranscript("");

      // Clear any existing event handlers
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      recognition.onstart = null;

      recognition.onresult = (event) => {
        let interim = "";
        let final = finalTranscript;
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            final += transcriptPart + " ";
          } else {
            interim += transcriptPart + " ";
          }
        }
        console.log("interim => ", interim)
        
        setFinalTranscript(final.trim());
        setInterimTranscript(interim.trim());
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        enqueueSnackbar(`Speech recognition error: ${event.error}`, {
          variant: "error",
        });
        
        // Handle specific errors
        if (event.error === 'network') {
          // Network error - try to restart
          setTimeout(() => {
            if (isRecording) {
              recognition.start();
            }
          }, 1000);
        } else if (event.error === 'no-speech') {
          // No speech detected - continue listening
          if (isRecording) {
            setTimeout(() => {
              recognition.start();
            }, 500);
          }
        } else {
          // Other errors stop recording
          setIsRecording(false);
          setSessionState("question");
        }
      };

      recognition.onstart = () => {
        console.log("Speech recognition started");
      };

      const handleRecognitionEnd = () => {
        console.log("Speech recognition ended");
        
        if (isRecording) {
          setTimeout(() => {
            if (isRecording && recognition) {
              try {
                recognition.start();
                console.log("Speech recognition restarted");
              } catch (error) {
                console.error("Failed to restart recognition:", error);
                enqueueSnackbar("Recording interrupted. Please try again.", {
                  variant: "error",
                });
                setIsRecording(false);
                setSessionState("question");
              }
            }
          }, 100);
        }
      };

      recognition.onend = handleRecognitionEnd;

      try {
        recognition.start();
        console.log("Initial speech recognition start");

        // Safety timeout to prevent infinite recording (5 minutes)
        const timeoutId = setTimeout(() => {
          if (isRecording) {
            enqueueSnackbar("Recording timeout reached (5 minutes). Please stop and restart if needed.", {
              variant: "warning",
            });
            // Don't automatically stop, let user decide
          }
        }, 5 * 60 * 1000);
        
        setRecordingTimeout(timeoutId);
      } catch (error) {
        console.error("Failed to start recognition:", error);
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
    stopSpeechSynthesis();
    
    // Clear recording timeout
    if (recordingTimeout) {
      clearTimeout(recordingTimeout);
      setRecordingTimeout(null);
    }
    
    if (recognition) {
      try {
        recognition.stop();
      } catch (error) {
        console.error("Error stopping recognition:", error);
      }
      
      // Clear event handlers
      recognition.onresult = null;
      recognition.onerror = null;
      recognition.onend = null;
      recognition.onstart = null;
    }
    
    setIsRecording(false);
    setSessionState("reviewing");
    setInterimTranscript("");
  };

 

  const submitResponse = async() => {
    stopSpeechSynthesis();
    setSubmitting(true);
    
    console.log("currentQuestion => ", currentQuestion);
    console.log("finalTranscript => ", finalTranscript);
     httpClient.post("/qnaFeedback", {question: currentQuestion.text, answer: finalTranscript}).then(res => {
      console.log("res", res);
      const feedback = res.data.data;
      const mockFeedback = {
      overallScore: feedback?.response_score,
      // repetitiveWords: Math.floor(Math.random() * 10) + 2,
      fillerWords: feedback?.filler_words_count,
      weakWords: feedback?.weak_words_count,
      summary: feedback?.summary,
      sampleResponse: feedback?.sample_response,
    };
    setFeedback(mockFeedback);
    setSessionState("feedback");
    }).catch(err => {
      console.log("err", err);
      enqueueSnackbar("Failed to submit response", {
        variant: "error"
      });
    }).finally(() => {
      setSubmitting(false);
    });
    
    // const mockFeedback = {
    //   overallScore: Math.floor(Math.random() * 40) + 60,
    //   // repetitiveWords: Math.floor(Math.random() * 10) + 2,
    //   fillerWords: Math.floor(Math.random() * 15) + 5,
    //   weakWords: Math.floor(Math.random() * 8) + 3,
    //   summary: "Your response demonstrates good structure and relevant examples. Focus on reducing filler words and providing more specific details. Your communication style is clear and professional.",
    //   sampleResponse: "Here's a sample response: I believe this situation requires a structured approach. First, I would gather all relevant information, then analyze the options available, and finally make a decision based on the data and potential outcomes...",
    // };
    // setFeedback(mockFeedback);
    // setSessionState("feedback");
  };

  const practiceAnother = () => {
    stopSpeechSynthesis();
    if (recordingTimeout) {
      clearTimeout(recordingTimeout);
      setRecordingTimeout(null);
    }
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
      stopSpeechSynthesis();
      
      const utterance = new SpeechSynthesisUtterance(question);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onend = () => {
        console.log("Speech synthesis finished");
      };
      
      utterance.onerror = (event) => {
        console.log("Speech synthesis error:", event.error);
      };
      
      speechSynthesis.speak(utterance);
    } else {
      enqueueSnackbar("Speech synthesis not supported in your browser.", {
        variant: "warning",
      });
    }
  };

  const handleBackToDashboard = () => {
    stopSpeechSynthesis();
    if (recordingTimeout) {
      clearTimeout(recordingTimeout);
      setRecordingTimeout(null);
    }
    if (recognition) {
      try {
        recognition.stop();
      } catch (error) {
        console.error("Error stopping recognition on navigation:", error);
      }
    }
    navigate("/dashboard");
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
                    stopSpeechSynthesis();
                    if (recordingTimeout) {
                      clearTimeout(recordingTimeout);
                      setRecordingTimeout(null);
                    }
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
                    stopSpeechSynthesis();
                    if (recordingTimeout) {
                      clearTimeout(recordingTimeout);
                      setRecordingTimeout(null);
                    }
                    setSessionState("setup");
                    setShow(false);
                  }}
                  onStart={startPractice}
                />
              )}

              {(sessionState === "question" ||
                sessionState === "recording" ||
                sessionState === "reviewing") &&
                currentQuestion && (
                <Box sx={{ display: "grid", gap: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
                    <Button
                      startIcon={<ArrowBack />}
                      onClick={handleBackToDashboard}
                      variant="outlined"
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
                            Click to start recording your response. Recording will continue until you stop it.
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
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                Recording in progress... (Continuous)
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                            <Button
                              variant="outlined"
                              size="small"
                              onClick={restartRecording}
                              startIcon={<RefreshIcon />}
                              aria-label="Restart Recording"
                            >
                              Restart
                            </Button>
                          </Box>

                          {(finalTranscript || interimTranscript) && (
                            <Box>
                              <Typography
                                sx={{ mb: 1, fontWeight: 400, fontSize: "1.2rem" }}
                              >
                                Live Transcript
                              </Typography>
                              <Box sx={{ 
                                p: 2, 
                                bgcolor: "grey.50", 
                                borderRadius: "8px",
                                maxHeight: "400px",
                                overflowY: "auto",
                                border: "2px solid",
                                borderColor: isRecording ? "info.main" : "grey.300",
                                position: "relative",
                                "&::before": {
                                  content: '""',
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                  width: 10,
                                  height: 10,
                                  bgcolor: "info.main",
                                  borderRadius: "50%",
                                  animation: `${pulse} 1.5s infinite`,
                                  margin: 1
                                }
                              }}>
                                <Typography 
                                  variant="body1" 
                                  sx={{ 
                                    fontWeight: "400",
                                    whiteSpace: "pre-wrap",
                                    lineHeight: 1.6
                                  }}
                                >
                                  <span style={{ color: "black" }}>
                                    {finalTranscript}
                                  </span>
                                  {interimTranscript && (
                                    <span style={{ 
                                      color: "#1976d2", 
                                      fontStyle: "italic",
                                      backgroundColor: alpha("#1976d2", 0.1),
                                      padding: "2px 4px",
                                      borderRadius: "4px"
                                    }}>
                                      {"\n" + interimTranscript}
                                    </span>
                                  )}
                                </Typography>
                              </Box>
                              {interimTranscript && (
                                <Typography variant="caption" color="info.main" sx={{ mt: 1, display: "block" }}>
                                  🔴 Live transcription - keep speaking...
                                </Typography>
                              )}
                              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: "block" }}>
                                Final words: {finalTranscript.split(' ').length} | Total characters: {finalTranscript.length}
                              </Typography>
                            </Box>
                          )}

                          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={stopRecording}
                              startIcon={<MicOffIcon />}
                              size="large"
                              aria-label="Stop Recording"
                              sx={{ py: 1.5, fontSize: "1.2rem" }}
                            >
                              Stop Recording
                            </Button>
                          </Box>
                        </Box>
                      )}

                      {sessionState === "reviewing" && (
                        <Box sx={{ display: "grid", gap: 3 }}>
                          <Box>
                            <Typography
                              sx={{ mb: 1, fontWeight: 400, fontSize: "1.2rem" }}
                            >
                              Review & Edit Your Response
                            </Typography>
                            <TextField
                              value={finalTranscript}
                              onChange={(e) => setFinalTranscript(e.target.value)}
                              multiline
                              minRows={6}
                              fullWidth
                              placeholder="Your response transcript..."
                              sx={{
                                fontWeight: 400,
                                fontSize: "1rem",
                                "& .MuiInputBase-root": {
                                  borderRadius: "8px",
                                },
                              }}
                            />
                          </Box>
                          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={submitResponse}
                              startIcon={!submitting && <SendIcon />}
                              size="large"
                              aria-label="Submit Response"
                              sx={{ py: 1.5, fontSize: "1.2rem", minWidth: "180px" }}
                              disabled={submitting}
                            >
                              {submitting ? (
                                <CircularProgress size={24} color="primary" thickness={4} />
                              ) : (
                                "Submit Response"
                              )}
                            </Button>

                            <Button
                              variant="outlined"
                              onClick={startRecording}
                              startIcon={<MicIcon />}
                              size="large"
                              aria-label="Record Again"
                              sx={{ py: 1.5, fontSize: "1.2rem" }}
                              disabled={submitting}
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
                  <CardHeader title={<Typography variant="h6">Feedback</Typography>} />
                  <CardContent sx={{ display: "grid", gap: 3 }}>
                    <Box
                      sx={{
                        display: "grid",
                        gap: 2,
                        gridTemplateColumns: {
                          xs: "1fr",
                          sm: "1fr 1fr",
                          lg: "1fr 1fr 1fr",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          textAlign: "center",
                          p: 3,
                          bgcolor: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)",
                          borderRadius: "8px",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform: "scale(1.03)",
                          },
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
                          bgcolor: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",
                          borderRadius: "8px",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform: "scale(1.03)",
                          },
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
                          bgcolor: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
                          borderRadius: "8px",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            transform: "scale(1.03)",
                          },
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
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                          Summary
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {feedback.summary}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                          Sample Response
                        </Typography>
                        <Box sx={{ p: 2, bgcolor: "grey.100", borderRadius: "8px" }}>
                          <Typography variant="body1">
                            {feedback.sampleResponse}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 2, pt: 2, justifyContent: "center" }}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={practiceAnother}
                        startIcon={<RotateCcwIcon />}
                        size="large"
                        aria-label="Practice Another Question"
                        sx={{ py: 1.5, fontSize: "1.2rem" }}
                      >
                        Practice Another Question
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={startPractice}
                        size="large"
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