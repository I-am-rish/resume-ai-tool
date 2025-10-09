// TechnicalPopup.jsx
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import { PlayArrow, Code } from "@mui/icons-material";

function TechnicalPopup({ open, onClose, onStart }) {
  const [duration, setDuration] = useState("20");
  const theme = useTheme();

  const handleStart = () => {
    onStart("technical", duration);
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          backdropFilter: "blur(20px)",
          background: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <DialogTitle
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
          color: "white",
          borderRadius: "20px 20px 0 0",
          py: 3,
          textAlign: "center",
        }}
      >
        <Code sx={{ fontSize: 48, mb: 1, display: "block" }} />
        <Typography variant="h4" fontWeight="bold">
          Technical Interview Practice
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
          Hone your technical skills with targeted coding and system design
          questions.
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ p: 4, pt: 2 }}>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Interview Duration</InputLabel>
          <Select
            value={duration}
            label="Interview Duration"
            onChange={(e) => setDuration(e.target.value)}
            sx={{ borderRadius: "12px" }}
          >
            <MenuItem value="20">20 minutes (4 questions)</MenuItem>
            <MenuItem value="30">30 minutes (6 questions)</MenuItem>
          </Select>
        </FormControl>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 2, textAlign: "center" }}
        >
          Get instant AI feedback on your problem-solving approach and code
          explanations.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 4, pb: 2, justifyContent: "center" }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ borderRadius: "12px", px: 4 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleStart}
          variant="contained"
          startIcon={<PlayArrow />}
          sx={{
            borderRadius: "12px",
            px: 4,
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
            boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
          }}
        >
          Start Practice
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TechnicalPopup;
