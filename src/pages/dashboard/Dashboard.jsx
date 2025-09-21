import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Radio,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  alpha,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import MailIcon from "@mui/icons-material/Mail";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import VideocamIcon from "@mui/icons-material/Videocam";
import DeleteIcon from "@mui/icons-material/Delete";
import WorkIcon from "@mui/icons-material/Work";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PeopleIcon from "@mui/icons-material/People";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import Header from "@/components/shared/header/Header";

import "animate.css";
import {
  FaChartLine,
  FaClipboardList,
  FaUsers,
  FaUserTie,
} from "react-icons/fa6";

// const CreateRecordModal = ({ isOpen, onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     resumeFile: null,
//     jobTitle: "",
//     companyName: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, resumeFile: e.target.files[0] }));
//   };

//   const handleTextChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = () => {
//     if (!formData.jobTitle.trim()) {
//       alert("Job title is required");
//       return;
//     }
//     setLoading(true);
//     setTimeout(() => {
//       onSave(formData);
//       setLoading(false);
//       onClose();
//       setFormData({ resumeFile: null, jobTitle: "", companyName: "" });
//     }, 1000); // Simulate API delay
//   };

//   return (
//     <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
//       <DialogTitle sx={{ fontWeight: 600, color: "#4F46E5" }}>
//         Create New Record
//       </DialogTitle>
//       <DialogContent>
//         <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
//           <TextField
//             label="Job Title"
//             name="jobTitle"
//             value={formData.jobTitle}
//             onChange={handleTextChange}
//             fullWidth
//             required
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: 2,
//                 "&:hover fieldset": { borderColor: "#4F46E5" },
//                 "&.Mui-focused fieldset": { borderColor: "#4F46E5" },
//               },
//             }}
//             aria-label="Job title"
//           />
//           <TextField
//             label="Company Name"
//             name="companyName"
//             value={formData.companyName}
//             onChange={handleTextChange}
//             fullWidth
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: 2,
//                 "&:hover fieldset": { borderColor: "#4F46E5" },
//                 "&.Mui-focused fieldset": { borderColor: "#4F46E5" },
//               },
//             }}
//             aria-label="Company name"
//           />
//           <TextField
//             type="file"
//             label="Resume File"
//             onChange={handleFileChange}
//             InputLabelProps={{ shrink: true }}
//             fullWidth
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: 2,
//                 "&:hover fieldset": { borderColor: "#4F46E5" },
//                 "&.Mui-focused fieldset": { borderColor: "#4F46E5" },
//               },
//             }}
//             aria-label="Resume file upload"
//           />
//         </Box>
//       </DialogContent>
//       <DialogActions>
//         <Button
//           onClick={onClose}
//           sx={{ textTransform: "none", color: "#4F46E5" }}
//           aria-label="Cancel"
//         >
//           Cancel
//         </Button>
//         <LoadingButton
//           onClick={handleSubmit}
//           loading={loading}
//           loadingPosition="start"
//           variant="contained"
//           sx={{
//             textTransform: "none",
//             bgcolor: "#4F46E5",
//             "&:hover": { bgcolor: "#6366F1" },
//           }}
//           aria-label="Save record"
//         >
//           Save
//         </LoadingButton>
//       </DialogActions>
//     </Dialog>
//   );
// };

const CreateRecordModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    resumeFile: null,
    jobTitle: "",
    jobDescription: "",
  });
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resumeFile: e.target.files[0] }));
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.jobTitle.trim()) {
      alert("Job title is required");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onSave(formData);
      setLoading(false);
      onClose();
      setFormData({ resumeFile: null, jobTitle: "", jobDescription: "" });
    }, 1000); // Simulate API delay
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          minHeight: 400,
          maxHeight: 600,
          px: { xs: 2, sm: 4 },
          py: { xs: 2, sm: 3 },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: "1.5rem",
          color: "#4F46E5",
          // mb: 1,
        }}
      >
        Create New Record
      </DialogTitle>

      <DialogContent sx={{ px: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mt: 1,
          }}
        >
          <TextField
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleTextChange}
            fullWidth
            required
            InputProps={{ sx: { fontSize: "1rem" } }}
            InputLabelProps={{ sx: { fontSize: "0.95rem" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": { borderColor: "#4F46E5" },
                "&.Mui-focused fieldset": { borderColor: "#4F46E5" },
              },
            }}
            aria-label="Job title"
          />

          <TextField
            label="Job Description"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleTextChange}
            multiline
            minRows={4}
            fullWidth
            // InputProps={{ sx: { fontSize: "1.1rem" } }}
            // InputLabelProps={{ sx: { fontSize: "0.95rem" } }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": { borderColor: "#4F46E5" },
                "&.Mui-focused fieldset": { borderColor: "#4F46E5" },
              },
            }}
            aria-label="Job description"
          />

          <Button
            variant="outlined"
            component="label"
            sx={{
              textTransform: "none",
              borderRadius: 2,
              borderColor: "#4F46E5",
              color: "#4F46E5",
              fontSize: "1.2rem",
              "&:hover": {
                // borderColor: "#6366F1",
                // backgroundColor: "#f3f4f6",
              },
            }}
          >
            Upload Resume File
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              aria-label="Resume file upload"
            />
          </Button>
          {formData.resumeFile && (
            <Typography variant="body2" sx={{ color: "#6B7280", ml: 1 }}>
              Selected file: {formData.resumeFile.name}
            </Typography>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 0, pt: 3 }}>
        <Button
          onClick={onClose}
          sx={{
            textTransform: "none",
            color: "#4F46E5",
            fontWeight: 500,
            fontSize: "1.2rem",
          }}
          aria-label="Cancel"
        >
          Cancel
        </Button>
        <LoadingButton
          onClick={handleSubmit}
          loading={loading}
          loadingPosition="start"
          variant="contained"
          sx={{
            textTransform: "none",
            bgcolor: "#4F46E5",
            fontSize: "1.2rem",
            fontWeight: 500,
            px: 3,
            "&:hover": { bgcolor: "#6366F1" },
          }}
          aria-label="Save record"
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [records, setRecords] = useState([
    {
      id: "1",
      serialNumber: 1,
      resumeFileName: "john_doe_resume_v2.pdf",
      jobTitle: "Senior Frontend Developer",
      companyName: "TechCorp Inc",
      lastModified: new Date("2024-01-15"),
    },
    {
      id: "2",
      serialNumber: 2,
      resumeFileName: "john_doe_resume_design.pdf",
      jobTitle: "Product Designer",
      companyName: "Design Studio",
      lastModified: new Date("2024-01-10"),
    },
  ]);
  const [selectedRecord, setSelectedRecord] = useState(null); // Single selection with radio buttons
  const [loading, setLoading] = useState(false);
  const username = "John";

  const stats = [
    {
      title: "Resume Updates",
      value: 12,
      icon: <FaClipboardList />,
      color: "primary",
    },
    { title: "Cover Letters", value: 5, icon: <FaUserTie />, color: "info" },
    { title: "Q&A Practice", value: 8, icon: <FaUsers />, color: "warning" },
    {
      title: "Interviews Conducted",
      value: "85%",
      icon: <FaChartLine />,
      color: "success",
    },
  ];

  const handleSaveRecord = (newRecord) => {
    setLoading(true);
    setTimeout(() => {
      const record = {
        id: Date.now().toString(),
        serialNumber: records.length + 1,
        resumeFileName: newRecord.resumeFile?.name || "No file uploaded",
        jobTitle: newRecord.jobTitle,
        companyName: newRecord.companyName || "Not specified",
        lastModified: new Date(),
      };
      setRecords((prev) => [record, ...prev]);
      setLoading(false);
    }, 1000); // Simulate API delay
  };

  const handleRecordSelection = (recordId) => {
    setSelectedRecord(recordId === selectedRecord ? null : recordId); // Toggle selection
  };

  const hasSelectedRecord = selectedRecord !== null;

  const theme = createTheme({
    palette: {
      primary: { main: "#4F46E5" }, // Modern indigo
      secondary: { main: "#8B5CF6" }, // Purple for accents
      success: { main: "#10B981" }, // Green for success
      warning: { main: "#F59E0B" }, // Amber for warnings
      error: { main: "#EF4444" }, // Red for errors
      info: { main: "#3B82F6" }, // Blue for info
      background: { paper: "#FFFFFF", default: "#F9FAFB" },
      text: { primary: "#1F2937", secondary: "#6B7280" },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      h4: { fontWeight: 700, letterSpacing: "-0.02em" },
      h6: { fontWeight: 600 },
      body2: { fontSize: "0.9rem", lineHeight: 1.6 },
      caption: { color: "#6B7280" },
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
    },
  });

  return (
    <>
      <Header />
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            flex: 1,
            p: { xs: 2, sm: 3, md: 6 },
            pt: { xs: 4, md: 15 },
            minHeight: "100vh",
            bgcolor: "background.default",
            backgroundImage: `linear-gradient(135deg, ${alpha(
              theme.palette.primary.main,
              0.05
            )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
          }}
        >
          {/* Welcome Section */}
          <Box sx={{ mb: { xs: 4, md: 6 } }}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight="bold"
              sx={{
                // background: `linear-gradient(10deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                // WebkitBackgroundClip: "text",
                // WebkitTextFillColor: "transparent",
                color: "#077fcf",
                mb: 1,
              }}
            >
              Welcome back,{" "}
              <span
                style={{
                  background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {username}!
              </span>
            </Typography>
            <Typography
              sx={{
                color: "#6B7280",
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.125rem" },
              }}
            >
              Manage your job applications and track your career progress.
            </Typography>
          </Box>

          {/* Quick Stats */}
          {/* <Grid
          display="flex"
          flexWrap="wrap"
          alignItems="flex-end"
          gap={2}
          sx={{ mb: { xs: 4, md: 6 } }}
        >
          {[
            {
              title: "Resume Updates",
              value: records.length,
              icon: <WorkIcon />,
              color: theme.palette.primary.main,
              bgColor: alpha(theme.palette.primary.main, 0.1),
            },
            {
              title: "Cover Letters",
              value: 2,
              icon: <CalendarMonthIcon />,
              color: theme.palette.info.main,
              bgColor: alpha(theme.palette.info.main, 0.1),
            },
            {
              title: "Q&A Practice",
              value: 1,
              icon: <PeopleIcon />,
              color: theme.palette.warning.main,
              bgColor: alpha(theme.palette.warning.main, 0.1),
            },
            {
              title: "Interviews Conducted",
              value: "85%",
              icon: <TrendingUpIcon />,
              color: theme.palette.success.main,
              bgColor: alpha(theme.palette.success.main, 0.1),
            },
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 1.5, sm: 3, md: 2 },
                  minWidth: { xs: 350, sm: 270, md: 450, lg: 300, xl: 350 },
                  borderRadius: 3,
                  background: "white",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                  },
                  minHeight: 180,
                  display: "flex",
                  justifyContent: "space-between",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "4px",
                    height: "100%",
                    background: stat.color,
                  },
                }}
                aria-label={`${stat.title}: ${stat.value}`}
              >
                <Box sx={{ textAlign: "left", maxWidth: "95%" }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "#6B7280",
                      mb: 1,
                      fontSize: { xs: "0.9rem", sm: "1rem", md: "1.3rem" },
                    }}
                  >
                    {stat.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      marginTop: "1.8rem",
                      color: "#1F2937",
                      paddingLeft: "10px",
                      fontSize: { xs: "1.5rem", sm: "1.7rem", md: "3rem" },
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    {stat.value}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: { xs: 48, sm: 56 },
                    height: { xs: 48, sm: 56 },
                    borderRadius: "12px",
                    bgcolor: stat.bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "scale(1.1)" },
                  }}
                >
                  {React.cloneElement(stat.icon, {
                    sx: {
                      color: stat.color,
                      fontSize: { xs: 24, sm: 28 },
                    },
                  })}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid> */}

          <div className=" my-5">
            <div className="row g-4">
              {stats.map((stat, index) => (
                <div
                  className={`col-12 col-sm-6 col-lg-3 animate__animated ${stat.animation}`}
                  key={index}
                >
                  <Card
                    className="shadow-lg border-0 h-100 position-relative overflow-hidden"
                    style={{
                      borderRadius: "1.2rem",
                      transition: "transform 0.4s ease, box-shadow 0.4s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(-8px) scale(1.05)";
                      e.currentTarget.style.boxShadow =
                        "0 15px 35px rgba(0,0,0,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 15px rgba(0,0,0,0.08)";
                    }}
                  >
                    {/* Animated gradient border */}
                    {/* <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      borderRadius: "1.2rem",
                      padding: "2px",
                      background:
                        "linear-gradient(135deg, #6a11cb, #2575fc, #00c6ff)",
                      WebkitMask:
                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      animation: "gradientBorder 4s ease infinite",
                    }}
                  ></div> */}

                    <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center p-4 position-relative">
                      <div
                        className={`bg-${stat.color} bg-opacity-10 d-flex align-items-center justify-content-center mb-3 animate__animated animate__pulse animate__infinite animate__slower rounded-circle`}
                        style={{ width: 70, height: 70 }}
                      >
                        {React.cloneElement(stat.icon, {
                          className: `text-${stat.color}`,
                          style: { fontSize: "2rem" },
                        })}
                      </div>
                      <Card.Title
                        className="fw-semibold text-dark mb-2 animate__animated animate__fadeInDown"
                        style={{ fontSize: "1.2rem" }}
                      >
                        {stat.title}
                      </Card.Title>
                      <Card.Text className="fs-2 fw-bold text-dark animate__animated animate__fadeIn animate__slower">
                        {stat.value}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>

            {/* Gradient border animation */}
            <style>{`
        @keyframes gradientBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .position-absolute[style*="linear-gradient"] {
          background-size: 300% 300%;
        }
      `}</style>
          </div>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              flexWrap: "wrap",
              gap: { xs: 2, sm: 3 },
              mb: { xs: 4, md: 6 },
            }}
          >
            <LoadingButton
              onClick={() => setIsModalOpen(true)}
              loading={loading}
              loadingPosition="start"
              startIcon={<AddIcon />}
              variant="contained"
              sx={{
                textTransform: "none",
                bgcolor: theme.palette.primary.main,
                "&:hover": { bgcolor: theme.palette.primary.dark },
                px: 3,
                // py: { xs: 1, sm: 1.5 },
                width: { xs: "100%", sm: "auto" },
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.3rem" },
                borderRadius: 5,
              }}
              aria-label="Create new record"
            >
              Create New Record
            </LoadingButton>
          </Box>

          {/* Records Table */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3, md: 2 },
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              background: "white",
              overflowX: { xs: "auto", sm: "visible" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                mb: { xs: 2, md: 3 },
                gap: { xs: 2, sm: 0 },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#1F2937",
                  fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.8rem" },
                }}
              >
                Resume Records
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Button
                  variant="outlined"
                  size="medium"
                  startIcon={<EditIcon />}
                  disabled={!hasSelectedRecord}
                  sx={{
                    textTransform: "none",
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    "&:hover": {
                      borderColor: theme.palette.primary.dark,
                      bgcolor: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                  aria-label="Resume update"
                >
                  Resume Update
                </Button>
                <Button
                  variant="outlined"
                  size="medium"
                  startIcon={<MailIcon />}
                  disabled={!hasSelectedRecord}
                  sx={{
                    textTransform: "none",
                    borderColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.main,
                    "&:hover": {
                      borderColor: theme.palette.secondary.dark,
                      bgcolor: alpha(theme.palette.secondary.main, 0.04),
                    },
                  }}
                  aria-label="Cover letter"
                >
                  Cover Letter
                </Button>
                <Button
                  variant="outlined"
                  size="medium"
                  startIcon={<QuestionAnswerIcon />}
                  disabled={!hasSelectedRecord}
                  sx={{
                    textTransform: "none",
                    borderColor: theme.palette.info.main,
                    color: theme.palette.info.main,
                    "&:hover": {
                      borderColor: theme.palette.info.dark,
                      bgcolor: alpha(theme.palette.info.main, 0.04),
                    },
                  }}
                  aria-label="Q&A practice"
                >
                  Q&A
                </Button>
                <Button
                  variant="outlined"
                  size="medium"
                  startIcon={<VideocamIcon />}
                  disabled={!hasSelectedRecord}
                  sx={{
                    textTransform: "none",
                    borderColor: theme.palette.warning.main,
                    color: theme.palette.warning.main,
                    "&:hover": {
                      borderColor: theme.palette.warning.dark,
                      bgcolor: alpha(theme.palette.warning.main, 0.04),
                    },
                  }}
                  aria-label="Timed interview"
                >
                  Interview
                </Button>
                <Button
                  variant="outlined"
                  size="medium"
                  startIcon={<DeleteIcon />}
                  disabled={!hasSelectedRecord}
                  sx={{
                    textTransform: "none",
                    borderColor: theme.palette.error.main,
                    color: theme.palette.error.main,
                    "&:hover": {
                      borderColor: theme.palette.error.dark,
                      bgcolor: alpha(theme.palette.error.main, 0.04),
                    },
                  }}
                  aria-label="Delete records"
                >
                  Delete
                </Button>
              </Box>
            </Box>
            {records.length === 0 ? (
              <Box sx={{ textAlign: "center", py: { xs: 8, sm: 10, md: 12 } }}>
                <Box
                  sx={{
                    mx: "auto",
                    mb: { xs: 2, md: 3 },
                    width: 64,
                    height: 64,
                    borderRadius: "16px",
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <AddIcon
                    sx={{ color: theme.palette.primary.main, fontSize: 32 }}
                  />
                </Box>
                <Typography
                  sx={{
                    mb: { xs: 1, md: 2 },
                    fontWeight: 600,
                    color: "#1F2937",
                    fontSize: "1.1rem",
                  }}
                >
                  No records yet
                </Typography>
                <Typography
                  sx={{
                    mb: { xs: 2, md: 4 },
                    color: "#6B7280",
                    maxWidth: 400,
                    mx: "auto",
                  }}
                >
                  Get started by creating your first job application record.
                </Typography>
                <LoadingButton
                  onClick={() => setIsModalOpen(true)}
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<AddIcon />}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    bgcolor: theme.palette.primary.main,
                    "&:hover": { bgcolor: theme.palette.primary.dark },
                    px: 3,
                    py: { xs: 1, sm: 1.5 },
                  }}
                  aria-label="Create new record"
                >
                  Create New Record
                </LoadingButton>
              </Box>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: 50 }}></TableCell>
                    <TableCell sx={{ fontSize: "1.2rem" }}>S.No</TableCell>
                    <TableCell sx={{ fontSize: "1.2rem" }}>
                      Resume File Name
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.2rem" }}>Job Title</TableCell>
                    <TableCell sx={{ fontSize: "1.2rem" }}>
                      Company Name
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.2rem" }}>
                      Last Modified
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {records.map((record) => (
                    <TableRow
                      key={record.id}
                      sx={{
                        "&:hover": {
                          bgcolor: alpha(theme.palette.primary.main, 0.02),
                        },
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      <TableCell>
                        <Radio
                          checked={selectedRecord === record.id}
                          onChange={() => handleRecordSelection(record.id)}
                          sx={{
                            "&.Mui-checked": {
                              color: theme.palette.primary.main,
                            },
                            "&:hover": {
                              bgcolor: alpha(theme.palette.primary.main, 0.04),
                            },
                          }}
                          aria-label={`Select record ${record.serialNumber}`}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: 500,
                          color: "#6B7280",
                          fontSize: {
                            xs: "0.8rem",
                            sm: "0.9rem",
                            md: "1.2rem",
                          },
                        }}
                      >
                        {record.serialNumber}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                          fontSize: {
                            xs: "0.8rem",
                            sm: "0.9rem",
                            md: "1.2rem",
                          },
                        }}
                      >
                        {record.resumeFileName}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#1F2937",
                          fontSize: {
                            xs: "0.8rem",
                            sm: "0.9rem",
                            md: "1.2rem",
                          },
                        }}
                      >
                        {record.jobTitle}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#1F2937",
                          fontSize: {
                            xs: "0.8rem",
                            sm: "0.9rem",
                            md: "1.2rem",
                          },
                        }}
                      >
                        {record.companyName}
                      </TableCell>
                      <TableCell
                        sx={{
                          color: "#6B7280",
                          fontSize: {
                            xs: "0.8rem",
                            sm: "0.9rem",
                            md: "1.2rem",
                          },
                        }}
                      >
                        {record.lastModified.toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Paper>
          <CreateRecordModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveRecord}
          />
        </Box>
      </ThemeProvider>
    </>
  );
}
