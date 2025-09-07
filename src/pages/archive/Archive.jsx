import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import {
  ArrowLeft,
  ArrowUpward,
  ArrowDownward,
  SwapVert,
  ArrowBack,
} from "@mui/icons-material";

export default function Archive() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [sortField, setSortField] = useState("completedOn");
  const [sortDirection, setSortDirection] = useState("desc");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock data for demonstration
  const [records] = useState([
    {
      id: "1",
      serialNumber: 1,
      activityType: "Resume Update",
      resumeFileName: "John_Doe_Resume_v2.pdf",
      jobTitle: "Senior Software Engineer",
      completedOn: new Date("2024-01-15"),
      summary:
        "Updated resume for software engineering position with focus on React and TypeScript experience.",
    },
    {
      id: "2",
      serialNumber: 2,
      activityType: "Cover Letter Generation",
      resumeFileName: "John_Doe_Resume_v2.pdf",
      jobTitle: "Senior Software Engineer",
      completedOn: new Date("2024-01-16"),
      summary:
        "Generated tailored cover letter highlighting 5+ years of full-stack development experience.",
    },
    {
      id: "3",
      serialNumber: 3,
      activityType: "Q&A Practice",
      resumeFileName: "John_Doe_Resume_v3.pdf",
      jobTitle: "Frontend Developer",
      completedOn: new Date("2024-01-18"),
      summary:
        "Practiced 15 technical questions focusing on JavaScript, React, and system design.",
    },
    {
      id: "4",
      serialNumber: 4,
      activityType: "Interview",
      resumeFileName: "John_Doe_Resume_v3.pdf",
      jobTitle: "Frontend Developer",
      completedOn: new Date("2024-01-20"),
      summary:
        "Completed 30-minute technical interview simulation with 85% accuracy rate.",
    },
    {
      id: "5",
      serialNumber: 5,
      activityType: "Resume Update",
      resumeFileName: "John_Doe_Resume_v4.pdf",
      jobTitle: "Full Stack Developer",
      completedOn: new Date("2024-01-22"),
      summary:
        "Updated resume to emphasize backend development skills and database management.",
    },
  ]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) {
      return <SwapVert className="ml-2 h-4 w-4" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUpward className="ml-2 h-4 w-4" />
    ) : (
      <ArrowDownward className="ml-2 h-4 w-4" />
    );
  };

  const sortedRecords = [...records].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    if (sortField === "completedOn") {
      aValue = aValue.getTime();
      bValue = bValue.getTime();
    }
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
    setIsDialogOpen(true);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getActivityColor = (activityType) => {
    switch (activityType) {
      case "Resume Update":
        return theme.palette.primary.main;
      case "Cover Letter Generation":
        return theme.palette.secondary.main;
      case "Q&A Practice":
        return theme.palette.info.main;
      case "Interview":
        return theme.palette.success.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        p: { xs: 2, sm: 3, md: 4 },
        bgcolor: "background.default",
        backgroundImage: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.05
        )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
      }}
    >
      <Box sx={{ mb: 4 }}>
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
        >
          Back to Dashboard
        </Button>
        <Box>
          <Typography
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
            Archive
          </Typography>
          <Typography color="text.secondary">
            View all completed activities and their details.
          </Typography>
        </Box>
      </Box>

      <Card
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
        }}
      >
        <CardHeader
          title={
            <Typography variant="h6" fontWeight="bold">
              Activity History
            </Typography>
          }
        />
        <CardContent>
          {records.length === 0 ? (
            <Box textAlign="center" py={8}>
              <Typography color="text.secondary">
                No activities completed yet. Start practicing to see your
                history here.
              </Typography>
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ width: 80 }}>
                      <Button
                        variant="text"
                        onClick={() => handleSort("serialNumber")}
                        sx={{
                          p: 0,
                          fontWeight: "bold",
                          minWidth: "auto",
                          justifyContent: "flex-start",
                          textTransform: "none",
                        }}
                      >
                        S.No.
                        {getSortIcon("serialNumber")}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        onClick={() => handleSort("activityType")}
                        sx={{
                          p: 0,
                          fontWeight: "bold",
                          minWidth: "auto",
                          justifyContent: "flex-start",
                          textTransform: "none",
                        }}
                      >
                        Activity Type
                        {getSortIcon("activityType")}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        onClick={() => handleSort("resumeFileName")}
                        sx={{
                          p: 0,
                          fontWeight: "bold",
                          minWidth: "auto",
                          justifyContent: "flex-start",
                          textTransform: "none",
                        }}
                      >
                        Resume File Name
                        {getSortIcon("resumeFileName")}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        onClick={() => handleSort("jobTitle")}
                        sx={{
                          p: 0,
                          fontWeight: "bold",
                          minWidth: "auto",
                          justifyContent: "flex-start",
                          textTransform: "none",
                        }}
                      >
                        Job Title
                        {getSortIcon("jobTitle")}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        onClick={() => handleSort("completedOn")}
                        sx={{
                          p: 0,
                          fontWeight: "bold",
                          minWidth: "auto",
                          justifyContent: "flex-start",
                          textTransform: "none",
                        }}
                      >
                        Completed On
                        {getSortIcon("completedOn")}
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedRecords.map((record) => (
                    <TableRow
                      key={record.id}
                      hover
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleRecordClick(record)}
                    >
                      <TableCell sx={{ fontWeight: "medium" }}>
                        {record.serialNumber}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={record.activityType}
                          size="small"
                          sx={{
                            bgcolor: alpha(
                              getActivityColor(record.activityType),
                              0.1
                            ),
                            color: getActivityColor(record.activityType),
                            fontWeight: 500,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}
                      >
                        {record.resumeFileName}
                      </TableCell>
                      <TableCell>{record.jobTitle}</TableCell>
                      <TableCell>{formatDate(record.completedOn)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Activity Summary</DialogTitle>
        <DialogContent>
          {selectedRecord && (
            <Box sx={{ mt: 1 }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 2,
                  mb: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Activity Type
                  </Typography>
                  <Typography variant="body1">
                    {selectedRecord.activityType}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Job Title
                  </Typography>
                  <Typography variant="body1">
                    {selectedRecord.jobTitle}
                  </Typography>
                </Box>
                <Box sx={{ gridColumn: { xs: "1 / -1", sm: "1 / -1" } }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Resume File
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ fontFamily: "monospace", fontSize: "0.875rem" }}
                  >
                    {selectedRecord.resumeFileName}
                  </Typography>
                </Box>
                <Box sx={{ gridColumn: { xs: "1 / -1", sm: "1 / -1" } }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Completed On
                  </Typography>
                  <Typography variant="body1">
                    {formatDate(selectedRecord.completedOn)}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Summary
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {selectedRecord.summary}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
