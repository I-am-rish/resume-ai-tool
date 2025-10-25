import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import { PlayArrow, Code } from "@mui/icons-material";

function TechPopup({ onStart }) {
  const [duration, setDuration] = useState("20");
  const theme = useTheme();

  const handleStart = () => {
    onStart?.("technical", duration);
    console.log("Start technical practice with duration:", duration);
  };

  const durationDescription =
    duration === "20"
      ? "You’ll face 4 coding questions."
      : "You’ll face 6 coding questions.";

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
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          background: "rgba(255,255,255,0.96)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
            color: "white",
            textAlign: "center",
            py: 4,
            borderRadius: "20px 20px 0 0",
          }}
        >
          <Code sx={{ fontSize: 48, mb: 1, display: "block" }} />
          <Typography variant="h4" fontWeight="bold">
            Technical Interview Practice
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9, mt: 1 }}>
            Hone your coding and problem-solving skills with AI-guided feedback.
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
              <MenuItem value="20">20 minutes </MenuItem>
              <MenuItem value="30">30 minutes </MenuItem>
            </Select>
          </FormControl>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 3, textAlign: "center", fontWeight: 500 }}
          >
            {/* {durationDescription} */}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1, textAlign: "center", fontStyle: "italic" }}
          >
            Get instant AI feedback on your code and explanations.
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
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.info.main} 100%)`,
              boxShadow: "0 4px 15px rgba(59,130,246,0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(59,130,246,0.4)",
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

export default TechPopup;
