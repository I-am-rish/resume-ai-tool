import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Fade,
  Slide,
  styled,
  createTheme,
  ThemeProvider,
  alpha,
  Chip,
  Divider,
  LinearProgress,
} from "@mui/material";
import {
  ArrowBack as ArrowLeftIcon,
  FileDownload as DownloadIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Warning as AlertCircleIcon,
  Close as XIcon,
  Save as SaveIcon,
  Lightbulb as LightbulbIcon,
  Insights as InsightsIcon,
  Assignment as AssignmentIcon,
  Star as StarIcon,
  ErrorOutline as ErrorOutlineIcon,
  ArrowBack,
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import httpClient from "@/utils/httpClinet";

// Enhanced MUI Theme with meaningful colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#4F46E5", // Deep indigo for primary actions
      light: alpha("#4F46E5", 0.1),
      dark: "#4338CA",
    },
    secondary: {
      main: "#10B981", // Emerald green for success elements
      light: alpha("#10B981", 0.1),
      dark: "#059669",
    },
    info: {
      main: "#3B82F6", // Bright blue for information
      light: alpha("#3B82F6", 0.1),
    },
    warning: {
      main: "#F59E0B", // Amber for warnings
      light: alpha("#F59E0B", 0.1),
    },
    error: {
      main: "#EF4444", // Red for errors
      light: alpha("#EF4444", 0.1),
    },
    background: {
      paper: "#FFFFFF",
      default: "#F9FAFB",
    },
    text: {
      primary: "#1F2937", // Dark gray for primary text
      secondary: "#6B7280", // Medium gray for secondary text
    },
    divider: "#E5E7EB", // Light gray for dividers
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      color: "#111827",
    },
    h6: {
      fontWeight: 600,
      color: "#1F2937",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
      color: "#4B5563",
    },
    caption: {
      color: "#6B7280",
      fontSize: "0.75rem",
    },
    subtitle1: {
      fontWeight: 500,
      color: "#374151",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          transition: "all 0.3s ease",
          overflow: "hidden",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
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
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "translateY(-1px)",
          },
        },
        contained: {
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: "6px",
        },
      },
    },
  },
});

// Keyframe for subtle fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled components with enhanced styling
const AnimatedCard = styled(Card)(({ theme }) => ({
  animation: `${fadeIn} 0.5s ease-out`,
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "4px",
    height: "100%",
    background: theme.palette.primary.main,
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: "8px",
  padding: "6px 16px",
  marginBottom: "8px",
  /* boxShadow: "1px 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)", */
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
    transform: "translateX(4px)",
  },
}));

const ScoreCard = styled(Card)(({ theme }) => ({
  /* background: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.main,
    0.05
  )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`, */
}));

const StrengthCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.secondary.main,
    0.05
  )} 0%, ${alpha(theme.palette.secondary.main, 0.01)} 100%)`,
  border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
}));

const GapCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.warning.main,
    0.05
  )} 0%, ${alpha(theme.palette.warning.main, 0.01)} 100%)`,
  border: `1px solid ${alpha(theme.palette.warning.main, 0.1)}`,
}));

const ErrorCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.error.main,
    0.05
  )} 0%, ${alpha(theme.palette.error.main, 0.01)} 100%)`,
  border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`,
}));

const RecommendationCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.info.main,
    0.05
  )} 0%, ${alpha(theme.palette.info.main, 0.01)} 100%)`,
  border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
}));

// Updated data with better color scheme
const scoreData = [
  { name: "Match", value: 78, fill: "#4F46E5" },
  { name: "Gap", value: 22, fill: "#E5E7EB" },
];

const keyStrengths = [
  "5+ years of software development experience",
  "Strong React and TypeScript expertise",
  "Leadership experience managing development teams",
  "Cloud architecture and AWS certifications",
];

const skillsGap = [
  "Python programming for data analysis",
  "Machine learning frameworks (TensorFlow, PyTorch)",
  "DevOps tools (Docker, Kubernetes)",
  "Agile project management certification",
];

const ATSRecommendation = [
  "Quantified impact of software improvements",
  "Cost savings or revenue generation metrics",
  "Team size and project scope details",
  "Performance optimization results",
];

const recommendations = [
  'Add specific metrics showing impact of your projects (e.g., "40% performance improvement")',
  "Include Python and ML experience from personal projects or coursework",
  "Highlight any containerization or deployment experience",
  "Quantify team leadership experience with specific numbers",
];

const updatedResumeChanges = [
  {
    section: "Professional Summary",
    original:
      "Experienced software developer with 5+ years of experience in web development.",
    updated:
      "Results-driven Senior Software Engineer with 5+ years of experience delivering high-performance web applications, achieving 40% performance improvements and leading cross-functional teams of 6+ developers.",
  },
  {
    section: "Technical Skills",
    original: "React, TypeScript, JavaScript, HTML, CSS",
    updated:
      "React, TypeScript, JavaScript, Python, HTML, CSS, TensorFlow, Docker, AWS, Kubernetes",
  },
  {
    section: "Key Achievements",
    original: "Built various web applications and improved system performance.",
    updated:
      "• Optimized application performance resulting in 40% faster load times and $50K annual cost savings\n• Led development team of 6 engineers on 3 major product releases\n• Implemented ML-powered features increasing user engagement by 25%",
  },
];
const atsData = [
  { metric: "Skills Match", value: 85 },
  { metric: "Keyword Match", value: 72 },
  { metric: "Experience Relevance", value: 90 },
  { metric: "Education Fit", value: 65 },
  { metric: "Overall Alignment", value: 80 },
];

export default function Resume() {
  const navigate = useNavigate();
  const location = useLocation();
  const responseData = location.state?.data;
  console.log("response props==>", responseData);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [changesSaved, setChangesSaved] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [resume, setResume] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const fetchResume = async () => {
    return httpClient
      .get(`/get-resume/68e010029199f38a9ae080ed`)
      .then((res) => {
        console.log("resume api res => ", res.data?.data);
        setResume(res.data.data);
      })
      .catch((err) => {
        console.log("resume api err => ", err);
      });
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const handleUpdateResume = () => {
    setChangesSaved(false);
    setShowReviewDialog(true);
  };

  const fetchAnalysis = async () => {
    httpClient
      .get(`/analysis-resume/68e010029199f38a9ae080ed`)
      .then((res) => {
        console.log("resume  analysis api res => ", res.data.data);
        setAnalysisData(res.data.data);
      })
      .catch((err) => {
        console.log("resume analysis api err => ", err);
      });
  };

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const handleSaveChanges = () => {
    setChangesSaved(true);
    setSnackbar({
      open: true,
      message: "Your resume has been updated with the recommended changes.",
      severity: "success",
    });
    console.log("Resume changes saved");
  };

  const handleDownloadResume = () => {
    console.log("Downloading updated resume");
    setSnackbar({
      open: true,
      message: "Your updated resume is being downloaded.",
      severity: "info",
    });
  };

  const handleCancelChanges = () => {
    setShowReviewDialog(false);
    setChangesSaved(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
        <Box sx={{ maxWidth: "1400px", }}>
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 4,
              mt: 2,
            }}
          >
            <Box>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
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
              <Typography
                variant="h3"
                component="h1"
                fontWeight="bold"
                sx={{
                  /* background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent", */
                  color: "#077fcf",
                  mb: 1,
                }}
              >
                Resume Analysis
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Comprehensive evaluation of your resume against job requirements
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
                Selected Resume: Tyagi_resume.pdf
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateResume}
              sx={{
                fontWeight: 600,
                fontSize: "1.1rem",
                px: 3,
                py: 1.5,
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
              aria-label="Update Resume Automatically"
            >
            Sample updated resume
            </Button>
          </Box>

          {/* Main Content Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "2fr", lg: "2fr 1fr 1fr" },
              gap: 2,
            }}
          >
            {/* Summary Card */}
            <AnimatedCard>
              <CardHeader
                title={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <InsightsIcon color="primary" />
                    <Typography variant="h5" fontWeight="600">
                      Job Fit Analysis Summary
                    </Typography>
                  </Box>
                }
              />
              <CardContent>
                <Typography
                  /* variant="h6" */
                  /* color="text.secondary" */
                  sx={{ mb: 2, fontWeight: 400, fontSize: "1.2rem" }}
                >
                  {analysisData?.fit_analysis}
                </Typography>
              </CardContent>
            </AnimatedCard>

            {/*ATS Score Card */}
            <ScoreCard>
              <CardHeader
                title={
                  <Typography variant="h5" fontWeight="600">
                    ATS Score
                  </Typography>
                }
              />
              <CardContent>
                <Box sx={{ height: 220 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "Match",
                            value: Number(analysisData?.ats_score),
                            fill: "#4F46E5",
                          },
                          {
                            name: "Gap",
                            value: 100 - Number(analysisData?.ats_score),
                            fill: "#E5E7EB",
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        // innerRadius={50}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {scoreData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: "8px",
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Typography variant="h4" color="primary" fontWeight={700}>
                    {analysisData?.ats_score ?? 0}/100
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Strong Match
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={78}
                    sx={{
                      mt: 1.5,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    }}
                  />
                </Box>
              </CardContent>
            </ScoreCard>

            {/* Score Card */}
            <ScoreCard>
              <CardHeader
                title={
                  <Typography variant="h5" fontWeight="600">
                    Job Fit Score
                  </Typography>
                }
              />
              <CardContent>
                <Box sx={{ height: 220 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "Match",
                            value: Number(analysisData?.fit_score),
                            fill: "#4F46E5",
                          },
                          {
                            name: "Gap",
                            value: 100 - Number(analysisData?.fit_score),
                            fill: "#E5E7EB",
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {[
                          {
                            name: "Match",
                            value: Number(analysisData?.fit_score),
                            fill: "#4F46E5",
                          },
                          {
                            name: "Gap",
                            value: 100 - Number(analysisData?.fit_score),
                            fill: "#E5E7EB",
                          },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          borderRadius: "8px",
                          boxShadow:
                            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                <Box sx={{ textAlign: "center", mt: 2 }}>
                  <Typography variant="h4" color="primary" fontWeight={700}>
                    {analysisData?.fit_score ?? 0}/100
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Strong Match
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={78}
                    sx={{
                      mt: 1.5,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    }}
                  />
                </Box>
              </CardContent>
            </ScoreCard>
          </Box>

          {/* Strengths and Gaps Section */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
              gap: 3,
              mt: 3,
            }}
          >
            {/* Key Strengths Card */}
            <StrengthCard>
              <CardHeader
                title={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <CheckCircleIcon color="secondary" />
                    <Typography variant="h5" fontWeight="600">
                      Key Strengths
                    </Typography>
                  </Box>
                }
              />
              <CardContent>
                <List disablePadding>
                  {keyStrengths.map((strength, index) => (
                    <StyledListItem key={index} disablePadding>
                      <ListItemIcon>
                        <CheckCircleIcon color="secondary" fontSize="medium" />
                      </ListItemIcon>
                      <ListItemText
                        primary={strength}
                        /* primaryTypographyProps={{ variant: "body1" }} */
                      />
                    </StyledListItem>
                  ))}
                </List>
              </CardContent>
            </StrengthCard>

            {/* Skills Gap Card */}
            <GapCard>
              <CardHeader
                title={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <AlertCircleIcon sx={{ color: "warning.main" }} />
                    <Typography variant="h5" fontWeight="600">
                      Missing Skills
                    </Typography>
                  </Box>
                }
              />
              <CardContent>
                <List disablePadding>
                  {analysisData?.["missing_skills"]?.map((skill, index) => (
                    <StyledListItem key={index} disablePadding>
                      <ListItemIcon>
                        <AlertCircleIcon
                          sx={{ color: "warning.main" }}
                          fontSize="medium"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={skill}
                        /* primaryTypographyProps={{ variant: "body2" }} */
                      />
                    </StyledListItem>
                  ))}
                </List>
              </CardContent>
            </GapCard>
          </Box>

          {/* Missing Achievements and Recommendations Section */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
              gap: 3,
              mt: 3,
            }}
          >
            {/* Missing Achievements Card */}
            <ErrorCard>
              <CardHeader
                title={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <ErrorOutlineIcon sx={{ color: "error.main" }} />
                    <Typography variant="h5" fontWeight="600">
                      ATS Recommendation
                    </Typography>
                  </Box>
                }
              />
              <CardContent>
                <List disablePadding>
                  {analysisData?.["ats_compliance_recommendations"]?.map(
                    (achievement, index) => (
                      <StyledListItem key={index} disablePadding>
                        <ListItemIcon>
                          <ErrorOutlineIcon
                            sx={{ color: "error.main" }}
                            fontSize="medium"
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={achievement}
                          /* primaryTypographyProps={{ variant: "body2" }} */
                        />
                      </StyledListItem>
                    )
                  )}
                </List>
              </CardContent>
            </ErrorCard>

            {/* Recommendations Card */}
            <RecommendationCard>
              <CardHeader
                title={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <LightbulbIcon color="info" />
                    <Typography variant="h5" fontWeight="600">
                      Key Recommendations
                    </Typography>
                  </Box>
                }
              />
              <CardContent>
                <List disablePadding>
                  {analysisData?.["recommended_updates"]?.map(
                    (recommendation, index) => (
                      <StyledListItem key={index} disablePadding>
                        <ListItemIcon>
                          <LightbulbIcon color="info" fontSize="medium" />
                        </ListItemIcon>
                        <ListItemText
                          primary={recommendation}
                          /* primaryTypographyProps={{ variant: "body2" }} */
                        />
                      </StyledListItem>
                    )
                  )}
                </List>
              </CardContent>
            </RecommendationCard>
          </Box>

          {/* Review Dialog */}
          <Dialog
            open={showReviewDialog}
            onClose={() => setShowReviewDialog(false)}
            maxWidth="lg"
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 400 }}
            PaperProps={{
              sx: {
                borderRadius: "16px",
                p: 2,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <DialogTitle
              sx={{
                fontWeight: 600,
                fontSize: "1.5rem",
                pb: 1,
                borderBottom: `1px solid ${theme.palette.divider}`,
              }}
            >
              Review Resume Changes
            </DialogTitle>
            <DialogContent sx={{ maxHeight: "70vh", overflowY: "auto", pt: 2 }}>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                {changesSaved
                  ? "Your resume has been successfully updated with the recommended changes. You can now download the updated version."
                  : "Review the proposed changes to your resume based on the job requirements and recommendations."}
              </Typography>

              {updatedResumeChanges.map((change, index) => (
                <Card
                  key={index}
                  sx={{
                    mb: 3,
                    borderRadius: "12px",
                    boxShadow:
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    overflow: "hidden",
                  }}
                >
                  <CardHeader
                    title={
                      <Typography variant="h5" fontWeight={600}>
                        {change.section}
                      </Typography>
                    }
                    sx={{ pb: 1 }}
                  />
                  <CardContent>
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle2"
                        color="error.main"
                        sx={{ mb: 1, fontWeight: 500, fontSize: "1.1rem" }}
                      >
                        Original:
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          p: 2,
                          bgcolor: alpha(theme.palette.error.main, 0.05),
                          borderRadius: "8px",
                          border: 1,
                          borderColor: theme.palette.error.main,
                          whiteSpace: "pre-line",
                          fontWeight: 400,
                        }}
                      >
                        {change.original}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="subtitle2"
                        color="secondary.main"
                        sx={{ mb: 1, fontWeight: 500, fontSize: "1.1rem" }}
                      >
                        Updated:
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          p: 2,
                          bgcolor: alpha(theme.palette.secondary.main, 0.05),
                          borderRadius: "8px",
                          border: 1,
                          borderColor: theme.palette.secondary.main,
                          whiteSpace: "pre-line",
                          /* fontSize: "1rem" */
                          fontWeight: 400,
                        }}
                      >
                        {change.updated}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </DialogContent>
            <DialogActions sx={{ gap: 1, px: 3, pb: 2, pt: 1 }}>
              {changesSaved ? (
                <>
                  <Button
                    variant="outlined"
                    onClick={() => setShowReviewDialog(false)}
                    sx={{ borderRadius: "8px" }}
                    aria-label="Close Dialog"
                  >
                    Close
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDownloadResume}
                    startIcon={<DownloadIcon />}
                    sx={{ borderRadius: "8px", fontSize: "1rem" }}
                    aria-label="Download Updated Resume"
                  >
                    Download Resume
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleCancelChanges}
                    startIcon={<XIcon />}
                    sx={{ borderRadius: "8px" }}
                    aria-label="Cancel Changes"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveChanges}
                    startIcon={<SaveIcon />}
                    sx={{ borderRadius: "8px", fontSize: "1rem" }}
                    aria-label="Save changes to resume"
                  >
                    Save changes to resume
                  </Button>
                </>
              )}
            </DialogActions>
          </Dialog>

          {/* Snackbar */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            TransitionComponent={Slide}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              sx={{
                width: "100%",
                borderRadius: "8px",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
