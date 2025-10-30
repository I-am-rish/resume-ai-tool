import { useEffect, useState, useCallback, useMemo } from "react";
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
  CircularProgress,
} from "@mui/material";
import { ArrowBack, FileDownload as DownloadIcon } from "@mui/icons-material";
import { keyframes } from "@emotion/react";
import httpClient from "@/utils/httpClinet";

// -------------------------
// THEME CONFIGURATION
// -------------------------
const theme = createTheme({
  palette: {
    primary: { main: "#3b82f6" },
    secondary: { main: "#10b981" },
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
          borderRadius: 12,
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
          borderRadius: 8,
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
  },
});

// -------------------------
// STYLES & ANIMATIONS
// -------------------------
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AnimatedCard = styled(Card)`
  animation: ${fadeIn} 0.5s ease-out;
`;

// -------------------------
// MAIN COMPONENT
// -------------------------
const stylingOptions = [
  { value: "short_formal", label: "Short Formal" },
  { value: "long_formal", label: "Long Formal" },
  { value: "short_informal", label: "Short Informal" },
  { value: "long_informal", label: "Long Informal" },
];

export default function CoverLetter() {
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState("short_formal");
  const [coverLetters, setCoverLetters] = useState({});
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // -------------------------
  // FETCH COVER LETTER DATA
  // -------------------------
  useEffect(() => {
    const fetchCoverLetter = async () => {
      try {
        const res = await httpClient.post(
          `/write-cover-letter/68e010029199f38a9ae080ed`
        );
        console.log("cover letter api res =>", res.data.data);
        setCoverLetters(res.data.data || {});
      } catch (err) {
        console.error("cover letter api error =>", err);
        setSnackbar({
          open: true,
          message: "Failed to load cover letter.",
          severity: "error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCoverLetter();
  }, []);

  // -------------------------
  // EXPORT HANDLER
  // -------------------------
  const handleExport = useCallback(() => {
    const selectedLetter = coverLetters[selectedStyle]?.cover_letter;
    if (!selectedLetter) return;

    const blob = new Blob([selectedLetter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cover-letter-${selectedStyle}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    setSnackbar({
      open: true,
      message: "Cover letter exported successfully!",
      severity: "success",
    });
  }, [coverLetters, selectedStyle]);

  // -------------------------
  // SNACKBAR CLOSE HANDLER
  // -------------------------
  const handleCloseSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  // -------------------------
  // MEMOIZED CURRENT LETTER
  // -------------------------
  const currentLetter = useMemo(
    () =>
      coverLetters[selectedStyle]?.cover_letter ||
      "No cover letter available for this style.",
    [coverLetters, selectedStyle]
  );

  // -------------------------
  // RENDER
  // -------------------------
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
        <Box sx={{ maxWidth: "1400px",}}>
          {/* HEADER */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <Button
              startIcon={<ArrowBack />}
              variant="outlined"
              onClick={() => navigate("/dashboard")}
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

          {/* TITLE */}
          <Typography
            variant="h3"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Cover Letter
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={3}>
            Generate and customize cover letters with different styling options
          </Typography>

          {/* SELECT STYLE CARD */}
          <AnimatedCard>
            <CardHeader
              title={
                <Typography variant="h5" fontWeight="600">
                  Cover Letter Style
                </Typography>
              }
            />
            <CardContent>
              <FormControl sx={{ minWidth: { xs: "100%", sm: 200 } }}>
                <InputLabel>Select a style</InputLabel>
                <Select
                  value={selectedStyle}
                  label="Select a style"
                  onChange={(e) => setSelectedStyle(e.target.value)}
                >
                  {stylingOptions.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
          </AnimatedCard>

          {/* GENERATED LETTER CARD */}
          <AnimatedCard sx={{ mt: 3 }}>
            <CardHeader
              title={
                <Typography variant="h5" fontWeight="600">
                  Generated Cover Letter
                </Typography>
              }
              action={
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DownloadIcon />}
                  onClick={handleExport}
                  disabled={loading || !coverLetters[selectedStyle]}
                >
                  Download
                </Button>
              }
            />
            <CardContent>
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Box
                  sx={{
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    p: 3,
                    border: 1,
                    borderColor: "divider",
                    whiteSpace: "pre-wrap",
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: "1rem",
                    lineHeight: 1.6,
                    color: "text.primary",
                  }}
                >
                  {currentLetter}
                </Box>
              )}
            </CardContent>
          </AnimatedCard>

          {/* SNACKBAR */}
          <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbar.severity}
              sx={{ borderRadius: 2, width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
