import React, { useEffect, useState } from "react";
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
import { Card } from "react-bootstrap";
import Header from "@/components/shared/header/Header";
import { useSnackbar } from "notistack";
import "animate.css";
import {
  FaChartLine,
  FaClipboardList,
  FaUsers,
  FaUserTie,
} from "react-icons/fa6";
import httpClient from "@/utils/httpClinet";
import { Link, useNavigate } from "react-router-dom";

const CreateRecordModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    resumeFile: null,
    jobTitle: "",
    jobDescription: "",
  });
  const [errors, setErrors] = useState({
    jobTitle: "",
    jobDescription: "",
    resumeFile: "",
  });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validation logic
    let newErrors = { ...errors };
    if (name === "jobTitle") {
      if (!value.trim()) {
        newErrors.jobTitle = "Job Title is required";
      } else if (value.length < 3) {
        newErrors.jobTitle = "Job Title must be at least 3 characters";
      } else if (value.length > 100) {
        newErrors.jobTitle = "Job Title cannot exceed 100 characters";
      } else {
        newErrors.jobTitle = "";
      }
    } else if (name === "jobDescription") {
      if (!value.trim()) {
        newErrors.jobDescription = "Job Description is required";
      } else if (value.length < 10) {
        newErrors.jobDescription =
          "Job Description must be at least 10 characters";
      } else if (value.length > 2500) {
        newErrors.jobDescription =
          "Job Description cannot exceed 1000 characters";
      } else {
        newErrors.jobDescription = "";
      }
    }
    setErrors(newErrors);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    let newErrors = { ...errors };

    if (!file) {
      newErrors.resumeFile = "Resume file is required";
    } else if (!file.type.includes("pdf")) {
      newErrors.resumeFile = "Only PDF files are allowed";
    } else if (file.size > 5 * 1024 * 1024) {
      newErrors.resumeFile = "File size cannot exceed 5MB";
    } else {
      newErrors.resumeFile = "";
    }

    setFormData((prev) => ({ ...prev, resumeFile: file }));
    setErrors(newErrors);
  };

  const validateForm = () => {
    let newErrors = { ...errors };
    let isValid = true;

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job Title is required";
      isValid = false;
    } else if (formData.jobTitle.length < 3) {
      newErrors.jobTitle = "Job Title must be at least 3 characters";
      isValid = false;
    } else if (formData.jobTitle.length > 100) {
      newErrors.jobTitle = "Job Title cannot exceed 100 characters";
      isValid = false;
    }

    if (!formData.jobDescription.trim()) {
      newErrors.jobDescription = "Job Description is required";
      isValid = false;
    } else if (formData.jobDescription.length < 10) {
      newErrors.jobDescription =
        "Job Description must be at least 10 characters";
      isValid = false;
    } else if (formData.jobDescription.length > 2500) {
      newErrors.jobDescription =
        "Job Description cannot exceed 1000 characters";
      isValid = false;
    }

    if (!formData.resumeFile) {
      newErrors.resumeFile = "Resume file is required";
      isValid = false;
    } else if (!formData.resumeFile.type.includes("pdf")) {
      newErrors.resumeFile = "Only PDF files are allowed";
      isValid = false;
    } else if (formData.resumeFile.size > 5 * 1024 * 1024) {
      newErrors.resumeFile = "File size cannot exceed 5MB";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      enqueueSnackbar("Please fix the errors in the form", {
        variant: "error",
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      apiRequest(formData);
      onSave(formData);
    }, 1000); // Simulate API delay
  };

  const apiRequest = (data) => {
    const formDataToSend = new FormData();
    formDataToSend.append("resume", data.resumeFile);
    formDataToSend.append("jobTitle", data.jobTitle);
    formDataToSend.append("jobDescription", data.jobDescription);

    httpClient
      .post(`/upload-resume`, formDataToSend)
      .then((res) => {
        console.log("upload resume api res => ", res.data);
        enqueueSnackbar("Resume uploaded successfully", { variant: "success" });
        navigate("/resume", { state: { data: res.data?.data } });
      })
      .catch((err) => {
        console.log("upload resume api err => ", err);
        enqueueSnackbar(
          err.response?.data?.message || "Resume analysis failed",
          { variant: "error" }
        );
      })
      .finally(() => {
        setLoading(false);
        onClose();
        setFormData({ resumeFile: null, jobTitle: "", jobDescription: "" });
        setErrors({ jobTitle: "", jobDescription: "", resumeFile: "" });
      });
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
          minHeight: 600,
          maxHeight: 900,
          px: { xs: 2, sm: 4 },
          py: { xs: 2, sm: 3 },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: "1.7rem",
          color: "#4F46E5",
          marginLeft: "-1.5rem",
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
            pl: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              gap: 2,
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 1, fontSize: "1.2rem", color: "#4F46E5" }}
            >
              Upload Resume
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                component="label"
                size="small"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  // borderColor: errors.resumeFile ? "#EF4444" : "#4F46E5",
                  // color: errors.resumeFile ? "#EF4444" : "#4F46E5",
                  fontSize: "1.2rem",
                  // "&:hover": {
                  //   borderColor: errors.resumeFile ? "#EF4444" : "#6366F1",
                  //   backgroundColor: errors.resumeFile
                  //     ? alpha("#EF4444", 0.04)
                  //     : "#f3f4f6",
                  // },
                }}
              >
                Select File
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  aria-label="Resume file upload"
                />
              </Button>
              <Typography
                variant="body2"
                sx={{ color: "#6B7280", fontSize: "0.9rem" }}
              >
                (.pdf, .doc, .docx)
              </Typography>
              {formData.resumeFile && !errors.resumeFile && (
                <Typography variant="body1" sx={{ color: "#4F46E5" }}>
                  Selected file: {formData.resumeFile.name}
                </Typography>
              )}
            </Box>

            {/* Acceptable file types */}
          </Box>
          {/* Job Title Label and Field */}
          <Box>
            <Typography
              variant="h6"
              sx={{ mb: 1, fontSize: "1.2rem", color: "#4F46E5" }}
            >
              Job Title
            </Typography>
            <TextField
              // label="Enter Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleTextChange}
              placeholder="Enter or paste Job Title"
              fullWidth
              required
              error={!!errors.jobTitle}
              helperText={errors.jobTitle}
              InputProps={{ sx: { fontSize: "1rem" } }}
              InputLabelProps={{ sx: { fontSize: "0.95rem" } }}
              sx={{
                // opacity: 1.5,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": { borderColor: "#4F46E5" },
                  "&.Mui-focused fieldset": { borderColor: "#4F46E5" },
                },
              }}
              aria-label="Job title"
            />
          </Box>
          {/* Job Description Label and Field */}
          <Box>
            <Typography
              variant="h6"
              sx={{ mb: 1, fontSize: "1.2rem", color: "#4F46E5" }}
            >
              Job Description
            </Typography>
            <TextField
              // label="Enter Job Description"
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleTextChange}
              placeholder="Enter or paste Job Description"
              multiline
              minRows={10}
              fullWidth
              error={!!errors.jobDescription}
              helperText={errors.jobDescription}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  "&:hover fieldset": { borderColor: "#4F46E5" },
                  "&.Mui-focused fieldset": { borderColor: "#4F46E5" },
                },
              }}
              aria-label="Job description"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
            }}
          >
            {/* Error message */}
            {errors.resumeFile && (
              <Typography variant="body2" sx={{ color: "#EF4444", mt: 1 }}>
                {errors.resumeFile}
              </Typography>
            )}

            {/* Selected file display */}
          </Box>
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
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [records, setRecords] = useState([
    // {
    //   id: "1",
    //   serialNumber: 1,
    //   resumeFileName: "john_doe_resume_v2.pdf",
    //   jobTitle: "Senior Frontend Developer",
    //   companyName: "TechCorp Inc",
    //   lastModified: new Date("2024-01-15"),
    // },
    // {
    //   id: "2",
    //   serialNumber: 2,
    //   resumeFileName: "john_doe_resume_design.pdf",
    //   jobTitle: "Product Designer",
    //   companyName: "Design Studio",
    //   lastModified: new Date("2024-01-10"),
    // },
  ]);
  const [selectedRecord, setSelectedRecord] = useState(null);
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
    }, 1000);
  };

  const handleRecordSelection = (recordId) => {
    setSelectedRecord(recordId === selectedRecord ? null : recordId);
  };

  const hasSelectedRecord = selectedRecord !== null;

  const theme = createTheme({
    palette: {
      primary: { main: "#4F46E5" },
      secondary: { main: "#8B5CF6" },
      success: { main: "#10B981" },
      warning: { main: "#F59E0B" },
      error: { main: "#EF4444" },
      info: { main: "#3B82F6" },
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

  useEffect(() => {
    httpClient
      .get(`get-all-upload-resumes`)
      .then((res) => {
        console.log(res.data.data);
        setRecords(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          <Box className="d-flex align-items-center justify-content-between">
            <Box sx={{ mb: { xs: 4, md: 6 } }}>
              <Typography
                variant="h3"
                component="h1"
                fontWeight="bold"
                sx={{
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
          </Box>

          {/* Quick Stats */}
          <div className="my-5">
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
                    <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center p-4 position-relative">
                      <div style={{ width: 70, height: 70 }}>
                        {React.cloneElement(stat.icon, {
                          className: `text-${stat.color}`,
                          style: { fontSize: "3rem" },
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
              justifyContent: "space-between",
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
                width: { xs: "100%", sm: "auto" },
                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.3rem" },
                borderRadius: 5,
              }}
              aria-label="Create new record"
            >
              Create New Record
            </LoadingButton>
            <Box>
              <Typography
                color="primary"
                className="animate__animated animate__fadeInUp fs-5 fw-bold me-2"
                sx={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => navigate("/analytics")}
              >
                View Analytics
              </Typography>
            </Box>
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
                      Job Description
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.2rem" }}>
                      Last Modified
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {records.map((record, index) => (
                    <TableRow
                      key={record._id}
                      sx={{
                        "&:hover": {
                          bgcolor: alpha(theme.palette.primary.main, 0.02),
                        },
                        transition: "background-color 0.2s ease",
                      }}
                    >
                      <TableCell>
                        <Radio
                          checked={selectedRecord === record._id}
                          onChange={() => handleRecordSelection(record._id)}
                          sx={{
                            "&.Mui-checked": {
                              color: theme.palette.primary.main,
                            },
                            "&:hover": {
                              bgcolor: alpha(theme.palette.primary.main, 0.04),
                            },
                          }}
                          aria-label={`Select record ${index + 1}`}
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
                        {index + 1}
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
                        {record.resumeFile}
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
                        {record.jobDescription}
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
                        {record?.updatedAt?.substring(0, 10)}
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
