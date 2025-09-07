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
  Snackbar,
  Alert,
  styled,
  createTheme,
  ThemeProvider,
  alpha,
} from "@mui/material";
import {
  ArrowBack,
  ArrowBack as ArrowLeftIcon,
  FileDownload as DownloadIcon,
} from "@mui/icons-material";
import { keyframes } from "@emotion/react";

// Custom MUI Theme
const theme = createTheme({
  palette: {
    primary: { main: "#3b82f6" }, // Modern blue
    secondary: { main: "#10b981" }, // Green for success
    background: { paper: "#ffffff", default: "#f8fafc" },
    text: { primary: "#1e293b", secondary: "#64748b" },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif',
    h4: { fontWeight: 700, letterSpacing: "-0.02em" },
    h6: { fontWeight: 600 },
    body2: { fontSize: "0.9rem", lineHeight: 1.6 },
    caption: { color: "#64748b" },
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
          "&:hover": {
            transform: "scale(1.02)",
            transition: "transform 0.2s ease",
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
  },
});

// Keyframe for fade-in animation
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled components
const AnimatedCard = styled(Card)(({ theme }) => ({
  animation: `${fadeIn} 0.5s ease-out`,
}));

const stylingOptions = [
  { value: "short-formal", label: "Short Formal" },
  { value: "long-formal", label: "Long Formal" },
  { value: "short-informal", label: "Short Informal" },
  { value: "long-informal", label: "Long Informal" },
];

const sampleCoverLetters = {
  "short-formal": `Dear Hiring Manager,

I am writing to express my strong interest in the Software Engineer position at TechCorp. With 5 years of experience in full-stack development and a proven track record of delivering scalable solutions, I am confident I would be a valuable addition to your team.

My expertise in React, Node.js, and cloud technologies aligns perfectly with your requirements. I am particularly drawn to TechCorp's innovative approach to software development and would welcome the opportunity to contribute to your continued success.

Thank you for considering my application. I look forward to discussing how my skills can benefit your organization.

Sincerely,
John Doe`,
  "long-formal": `Dear Hiring Manager,

I am writing to formally express my interest in the Software Engineer position at TechCorp, as advertised on your company website. With over five years of comprehensive experience in full-stack software development, I am excited about the opportunity to contribute my technical expertise and passion for innovation to your esteemed organization.

Throughout my career, I have developed proficiency in a wide range of technologies including React, Angular, Node.js, Python, and various cloud platforms such as AWS and Azure. My experience spans from developing responsive web applications to designing robust backend systems that serve millions of users. At my current position with InnovateTech, I successfully led a team of four developers in creating a customer relationship management system that increased client satisfaction by 35% and reduced processing time by 50%.

I am particularly impressed by TechCorp's commitment to cutting-edge technology and sustainable software practices. Your recent initiative in AI-driven solutions aligns perfectly with my interests and experience in machine learning integration. I believe my strong analytical skills, combined with my ability to work collaboratively in agile environments, would make me a valuable asset to your development team.

I am eager to discuss how my technical skills, leadership experience, and passion for innovation can contribute to TechCorp's continued success. Thank you for your time and consideration. I look forward to the opportunity to speak with you further about this exciting position.

Respectfully yours,
John Doe`,
  "short-informal": `Hi there!

I hope this message finds you well. I'm reaching out about the Software Engineer role at TechCorp – it looks like an amazing opportunity that I'd love to be part of!

I've been building cool stuff with code for about 5 years now, working with everything from React frontends to Node.js backends. What really excites me about TechCorp is how you're pushing boundaries in tech while keeping things human-centered.

I'd love to chat more about how I can help your team build awesome products. Thanks for taking the time to consider my application!

Best regards,
John`,
  "long-informal": `Hey Team,

I hope you're all doing well! I came across the Software Engineer position at TechCorp and honestly, I got pretty excited about it. Your company's approach to innovation and the collaborative culture you've built really resonates with me.

Over the past five years, I've been having a blast working on everything from sleek React applications to robust backend systems. I've had the chance to work with amazing teams at companies like InnovateTech, where we built some pretty cool solutions that made a real difference for our users. One project I'm particularly proud of involved creating a system that helped reduce customer wait times by half – seeing the positive impact on real people's lives was incredibly rewarding.

What draws me to TechCorp isn't just the cutting-edge technology (though that's definitely exciting!), but also your commitment to doing things the right way. I've been following your blog posts about sustainable development practices and your recent AI initiatives, and I think there's a great alignment with my own interests and experience.

I'm a firm believer that the best software comes from diverse perspectives and collaborative teamwork. I love the problem-solving aspect of development, but I also really enjoy mentoring junior developers and contributing to a positive team culture.

I'd be thrilled to chat more about how I might fit into the TechCorp family. Thanks so much for considering my application – I'm looking forward to hopefully hearing from you soon!

Cheers,
John`,
};

export default function CoverLetter() {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState("short-formal");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleExport = () => {
    const content = sampleCoverLetters[selectedStyle];
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cover-letter.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setSnackbar({
      open: true,
      message: "Cover letter exported successfully!",
      severity: "success",
    });
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
        <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2}}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate("/dashboard")}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 3,
                py: 1,
                backdropFilter: "blur(10px)",
                backgroundColor: alpha(theme.palette.background.paper, 0.7),
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              Back to Dashboard
            </Button>
          </Box>

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
              }}
            >
              Cover Letter
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Generate and customize cover letters with different styling
              options.
            </Typography>
          </Box>

          <Box sx={{ display: "grid", gap: 3 }}>
            <AnimatedCard>
              <CardHeader
                title={<Typography variant="h6">Cover Letter Style</Typography>}
              />
              <CardContent>
                <FormControl sx={{ minWidth: { xs: "100%", sm: 300 } }}>
                  <InputLabel id="cover-letter-style-label">
                    Select a style
                  </InputLabel>
                  <Select
                    labelId="cover-letter-style-label"
                    value={selectedStyle}
                    label="Select a style"
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    sx={{ borderRadius: "8px" }}
                  >
                    {stylingOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </CardContent>
            </AnimatedCard>

            <AnimatedCard>
              <CardHeader
                title={
                  <Typography variant="h6">Generated Cover Letter</Typography>
                }
                action={
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleExport}
                    startIcon={<DownloadIcon />}
                    aria-label="Export Cover Letter"
                  >
                    Export
                  </Button>
                }
              />
              <CardContent>
                <Box
                  sx={{
                    bgcolor: "background.paper",
                    borderRadius: "8px",
                    p: 3,
                    border: 1,
                    borderColor: "divider",
                    whiteSpace: "pre-wrap",
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    color: "text.primary",
                  }}
                >
                  {sampleCoverLetters[selectedStyle]}
                </Box>
              </CardContent>
            </AnimatedCard>
          </Box>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            TransitionComponent={theme.transitions.create("transform", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            })}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              sx={{ width: "100%", borderRadius: "8px" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
