import React from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import DescriptionIcon from "@mui/icons-material/Description";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import ArticleIcon from "@mui/icons-material/Article";
import WorkIcon from "@mui/icons-material/Work";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { motion } from "framer-motion";

const features = [
  {
    title: "Smart Resume Analysis",
    description:
      "AI-powered analysis identifies gaps and suggests improvements to make your resume stand out.",
    tag: "ATS Optimized",
    icon: DescriptionIcon,
    color: "#1976d2", // Blue for documents
  },
  {
    title: "AI Interview Practice",
    description:
      "Practice with our AI Interviewer for behavioral and technical questions with real-time feedback.",
    tag: "Voice Enabled",
    icon: RecordVoiceOverIcon,
    color: "#4caf50", // Green for communication
  },
  {
    title: "Custom Cover Letters",
    description:
      "Generate tailored cover letters in multiple styles - formal, casual, short, or detailed.",
    tag: "Multiple Styles",
    icon: ArticleIcon,
    color: "#ff9800", // Orange for writing
  },
  {
    title: "Job-Specific Optimization",
    description:
      "Match your resume perfectly to job descriptions with AI-powered keyword optimization.",
    tag: "Smart Matching",
    icon: WorkIcon,
    color: "#9c27b0", // Purple for work
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your improvement with detailed analytics and personalized career insights.",
    tag: "Analytics",
    icon: TrendingUpIcon,
    color: "#f44336", // Red for growth
  },
  {
    title: "Mock Interviews",
    description:
      "Complete 30 or 60-minute timed interviews with comprehensive performance analysis.",
    tag: "Timed Sessions",
    icon: QuestionAnswerIcon,
    color: "#009688", // Teal for Q&A
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const CareerLanding = () => {
  const buttonBaseStyles = {
    textTransform: "none",
    fontSize: "1rem",
    fontWeight: 600,
    px: 4,
    py: 1.5,
    borderRadius: 3,
    transition: "transform 0.3s ease, color 0.3s ease, background 0.3s ease",
    ":hover": {
      transform: "scale(1.1)",
    },
  };

  return (
    <Box>
      {/* Hero Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            py: { xs: 8, md: 12 },
            px: 2,
            backgroundColor: "white",
          }}
        >
          <Typography
            variant="h2"
            sx={{ fontWeight: 800, mb: 3, color: "text.primary" }}
          >
            Land Your Dream Job with AI
          </Typography>

          <Typography
            variant="h6"
            sx={{
              maxWidth: 700,
              mx: "auto",
              mb: 5,
              color: "text.secondary",
              lineHeight: 1.6,
            }}
          >
            Transform your resume, practice interviews, and get personalized
            insights with our AI-powered career platform. Join thousands who've
            accelerated their career success.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            justifyContent="center"
          >
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  ...buttonBaseStyles,
                  background: "linear-gradient(90deg, #6a11cb, #2575fc)",
                  ":hover": {
                    ...buttonBaseStyles[":hover"],
                    background: "linear-gradient(90deg, #5b0ec9, #1e63d9)",
                  },
                }}
              >
                Start Free Today
              </Button>
            </motion.div>

            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Button
                variant="outlined"
                size="large"
                startIcon={<PlayArrowIcon />}
                sx={{
                  ...buttonBaseStyles,
                  border: "2px solid #2575fc",
                  ":hover": {
                    ...buttonBaseStyles[":hover"],
                    color: "#2575fc",
                  },
                }}
              >
                Watch Demo
              </Button>
            </motion.div>
          </Stack>
        </Box>
      </motion.div>

      {/* Features Section */}
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: 700, mb: 2 }}
          >
            Everything You Need to Succeed
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{
              mb: 8,
              color: "text.secondary",
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Our comprehensive AI platform covers every aspect of your job search
            journey
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 4,
            justifyContent: "center",
          }}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    boxShadow: 4,
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    ":hover": {
                      transform: "translateY(-10px)",
                      boxShadow: 8,
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        mb: 3,
                        display: "inline-flex",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.2)",
                        },
                      }}
                    >
                      <IconComponent
                        sx={{ fontSize: 48, color: feature.color }}
                      />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ mb: 3, color: "text.secondary", lineHeight: 1.6 }}
                    >
                      {feature.description}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "primary.main", fontWeight: 700 }}
                    >
                      {feature.tag}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </Box>
      </Container>

      {/* CTA Section */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Box
          sx={{
            textAlign: "center",
            py: { xs: 8, md: 12 },
            backgroundColor: "white",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 3,
            }}
          >
            Ready to Accelerate Your Career?
          </Typography>
          <Typography
            variant="h6"
            sx={{
              maxWidth: 700,
              mx: "auto",
              mb: 5,
              color: "text.secondary",
              lineHeight: 1.6,
            }}
          >
            Join thousands of professionals who've transformed their job search
            with AI
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              ...buttonBaseStyles,
              background: "linear-gradient(90deg, #6a11cb, #2575fc)",
              ":hover": {
                ...buttonBaseStyles[":hover"],
                background: "linear-gradient(90deg, #5b0ec9, #1e63d9)",
              },
            }}
          >
            Start Your Success Story
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
};

export default CareerLanding;
