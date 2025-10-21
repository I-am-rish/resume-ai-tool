import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  useTheme,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { PlayArrow, Psychology } from "@mui/icons-material";

function BehavioralPractice({ onStart }) {
  const [duration, setDuration] = useState("20");
  const theme = useTheme();

  const handleStart = () => {
    onStart?.("behavioral", duration);
    console.log("Start behavioral practice with duration:", duration);
  };

  const durationDescription =
    duration === "20"
      ? "You’ll answer 4 behavioral questions."
      : "You’ll answer 6 behavioral questions.";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        p: 3,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 700,
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          background: "rgba(255,255,255,0.95)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.warning.main} 100%)`,
            color: "white",
            textAlign: "center",
            py: 4,
            borderRadius: "20px 20px 0 0",
          }}
        >
          <Psychology sx={{ fontSize: 48, mb: 1, display: "block" }} />
          <Typography variant="h4" fontWeight="bold">
            Behavioral Interview Practice
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
            Master storytelling and soft skills with real-world scenario questions.
          </Typography>
        </Box>

        {/* Content */}
        <CardContent sx={{ p: 4 }}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Interview Duration</InputLabel>
            <Select
              value={duration}
              label="Interview Duration"
              onChange={(e) => setDuration(e.target.value)}
              sx={{
                borderRadius: "12px",
                backgroundColor: "white",
              }}
            >
              <MenuItem value="20">20 minutes (4 questions)</MenuItem>
              <MenuItem value="30">30 minutes (6 questions)</MenuItem>
            </Select>
          </FormControl>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 3, textAlign: "center", fontWeight: 500 }}
          >
            {durationDescription}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, textAlign: "center", fontStyle: "italic" }}
          >
            Receive detailed feedback on your STAR responses and communication clarity.
          </Typography>
        </CardContent>

        {/* Actions */}
        <CardActions sx={{ p: 4, pt: 2, justifyContent: "center" }}>
          <Button
            onClick={handleStart}
            variant="contained"
            startIcon={<PlayArrow />}
            sx={{
              borderRadius: "12px",
              px: 4,
              fontWeight: 600,
              background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.warning.main} 100%)`,
              boxShadow: "0 4px 15px rgba(255,193,7,0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(255,193,7,0.4)",
              },
            }}
          >
            Start Practice
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default BehavioralPractice;
