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
  Checkbox,
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

const CreateRecordModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    resumeFile: null,
    jobTitle: "",
    companyName: "",
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
      setFormData({ resumeFile: null, jobTitle: "", companyName: "" });
    }, 1000); // Simulate API delay
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 600, color: "#4F46E5" }}>
        Create New Record
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleTextChange}
            fullWidth
            required
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
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleTextChange}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": { borderColor: "#4F46E5" },
                "&.Mui-focused fieldset": { borderColor: "#4F46E5" },
              },
            }}
            aria-label="Company name"
          />
          <TextField
            type="file"
            label="Resume File"
            onChange={handleFileChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover fieldset": { borderColor: "#4F46E5" },
                "&.Mui-focused fieldset": { borderColor: "#4F46E5" },
              },
            }}
            aria-label="Resume file upload"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{ textTransform: "none", color: "#4F46E5" }}
          aria-label="Cancel"
        >
          Cancel
        </Button>
        <LoadingButton
          onClick={handleSubmit}
          loading={loading}
          loadingPosition="start"
          startIcon={<AddIcon />}
          variant="contained"
          sx={{
            textTransform: "none",
            bgcolor: "#4F46E5",
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
  const [selectedRecords, setSelectedRecords] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const username = "John";

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

  const toggleRecordSelection = (recordId) => {
    const newSelected = new Set(selectedRecords);
    if (newSelected.has(recordId)) {
      newSelected.delete(recordId);
    } else {
      newSelected.add(recordId);
    }
    setSelectedRecords(newSelected);
  };

  const hasSelectedRecords = selectedRecords.size > 0;

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
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flex: 1,
          p: { xs: 2, sm: 3, md: 6 },
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
            // variant="h4"
            // sx={{
            //   fontWeight: 700,
            //   color: "#1F2937",
            //   mb: { xs: 1, md: 2 },
            //   fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.25rem" },
            // }}
            variant="h3"
            component="h1"
            fontWeight="bold"
            sx={{
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            Welcome back,{" "}<span
              style={{
                background: `linear-gradient( ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                // mb: 1,
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
        <Grid
          // container
          spacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{ mb: { xs: 4, md: 6 } }}
          display="flex"
          flexWrap={"wrap"}
          alignItems="flex-end"
          // justifyContent="center"
          gap={2}
        >
          {[
            {
              title: "Total Applications",
              value: records.length,
              icon: <WorkIcon />,
              color: theme.palette.primary.main,
              bgColor: alpha(theme.palette.primary.main, 0.1),
            },
            {
              title: "This Month",
              value: 2,
              icon: <CalendarMonthIcon />,
              color: theme.palette.info.main,
              bgColor: alpha(theme.palette.info.main, 0.1),
            },
            {
              title: "Interviews",
              value: 1,
              icon: <PeopleIcon />,
              color: theme.palette.warning.main,
              bgColor: alpha(theme.palette.warning.main, 0.1),
            },
            {
              title: "Success Rate",
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
                  minWidth: {
                    lxs: 900,
                    xs: 350,
                    sm: 270,
                    md: 400,
                    lg: 240,
                    xl: 270,
                  },
                  // width: 300,
                  // maxWidth: {
                  //   xs: 300,
                  //   sm: "100%",
                  //   md: 400,
                  //   lg: 420,
                  //   xl: 450,
                  // },
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
                      fontWeight: 600,
                      color: "#6B7280",
                      mb: 1,
                      fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                    }}
                  >
                    {stat.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      color: "#1F2937",
                      fontSize: { xs: "1.5rem", sm: "1.7rem", md: "2rem" },
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
        </Grid>

        {/* Action Buttons */}
        {/* <Box
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
              py: { xs: 1, sm: 1.5 },
              width: { xs: "100%", sm: "auto" },
            }}
            aria-label="Create new record"
          >
            Create New Record
          </LoadingButton>

          {hasSelectedRecords && (
            <>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{
                  textTransform: "none",
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  "&:hover": {
                    borderColor: theme.palette.primary.dark,
                    bgcolor: alpha(theme.palette.primary.main, 0.04),
                  },
                  px: 3,
                  py: { xs: 1, sm: 1.5 },
                  width: { xs: "100%", sm: "auto" },
                }}
                aria-label="Resume update"
              >
                Resume Update
              </Button>

              <Button
                variant="outlined"
                startIcon={<MailIcon />}
                sx={{
                  textTransform: "none",
                  borderColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.main,
                  "&:hover": {
                    borderColor: theme.palette.secondary.dark,
                    bgcolor: alpha(theme.palette.secondary.main, 0.04),
                  },
                  px: 3,
                  py: { xs: 1, sm: 1.5 },
                  width: { xs: "100%", sm: "auto" },
                }}
                aria-label="Cover letter"
              >
                Cover Letter
              </Button>

              <Button
                variant="outlined"
                startIcon={<QuestionAnswerIcon />}
                sx={{
                  textTransform: "none",
                  borderColor: theme.palette.info.main,
                  color: theme.palette.info.main,
                  "&:hover": {
                    borderColor: theme.palette.info.dark,
                    bgcolor: alpha(theme.palette.info.main, 0.04),
                  },
                  px: 3,
                  py: { xs: 1, sm: 1.5 },
                  width: { xs: "100%", sm: "auto" },
                }}
                aria-label="Q&A practice"
              >
                Q&A Practice
              </Button>

              <Button
                variant="outlined"
                startIcon={<VideocamIcon />}
                sx={{
                  textTransform: "none",
                  borderColor: theme.palette.warning.main,
                  color: theme.palette.warning.main,
                  "&:hover": {
                    borderColor: theme.palette.warning.dark,
                    bgcolor: alpha(theme.palette.warning.main, 0.04),
                  },
                  px: 3,
                  py: { xs: 1, sm: 1.5 },
                  width: { xs: "100%", sm: "auto" },
                }}
                aria-label="Timed interview"
              >
                Timed Interview
              </Button>

              <Button
                variant="outlined"
                startIcon={<DeleteIcon />}
                sx={{
                  textTransform: "none",
                  borderColor: theme.palette.error.main,
                  color: theme.palette.error.main,
                  "&:hover": {
                    borderColor: theme.palette.error.dark,
                    bgcolor: alpha(theme.palette.error.main, 0.04),
                  },
                  px: 3,
                  py: { xs: 1, sm: 1.5 },
                  width: { xs: "100%", sm: "auto" },
                }}
                aria-label="Delete records"
              >
                Delete
              </Button>
            </>
          )}
        </Box> */}

        {/* Records Table */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3, md: 4 },
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
                fontSize: { xs: "1.1rem", sm: "1.25rem", md: "1.5rem" },
              }}
            >
              Job Application Records
            </Typography>

            {hasSelectedRecords && (
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<EditIcon />}
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
                  Update
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<MailIcon />}
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
                  size="small"
                  startIcon={<QuestionAnswerIcon />}
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
                  size="small"
                  startIcon={<VideocamIcon />}
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
                  size="small"
                  startIcon={<DeleteIcon />}
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
            )}
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
                  <TableCell sx={{ width: 50 }}>
                    <Checkbox
                      checked={selectedRecords.size === records.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRecords(new Set(records.map((r) => r.id)));
                        } else {
                          setSelectedRecords(new Set());
                        }
                      }}
                      sx={{
                        "&.Mui-checked": { color: theme.palette.primary.main },
                        "&:hover": {
                          bgcolor: alpha(theme.palette.primary.main, 0.04),
                        },
                      }}
                      aria-label="Select all records"
                    />
                  </TableCell>
                  <TableCell>S.No</TableCell>
                  <TableCell>Resume File Name</TableCell>
                  <TableCell>Job Title</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Last Modified</TableCell>
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
                      <Checkbox
                        checked={selectedRecords.has(record.id)}
                        onChange={() => toggleRecordSelection(record.id)}
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
                        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                      }}
                    >
                      {record.serialNumber}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: theme.palette.primary.main,
                        fontWeight: 500,
                        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                      }}
                    >
                      {record.resumeFileName}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#1F2937",
                        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                      }}
                    >
                      {record.jobTitle}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#1F2937",
                        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                      }}
                    >
                      {record.companyName}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#6B7280",
                        fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
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
  );
}
