import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import httpClient from "@/utils/httpClinet";
import { useSnackbar } from "notistack";

const MotivationalServices = ({ onSave }) => {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false); // loader state
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Count words
  const wordCount =
    content.trim() === "" ? 0 : content.trim().split(/\s+/).length;

  // Save handler
  const handleSave = () => {
    const payload = {
      page_name: "motivational-services",
      page_content: content,
      wid: "hj-tampa",
    };

    setIsLoading(true); // show loader
    httpClient
      .post(`/sitemap/add-page-content`, payload)
      .then((res) => {
        console.log("save refund api res => ", res);
        enqueueSnackbar("Content saved successfully", { variant: "success" });
      })
      .catch((err) => {
        console.log("save refund api err => ", err);
        enqueueSnackbar("Error saving content", { variant: "error" });
      })
      .finally(() => {
        setIsLoading(false); // hide loader
      });
  };

  useEffect(() => {
    httpClient
      .get(
        `/sitemap/get-basic-page-content-by-name?wid=hj-tampa&page_name=motivational-services`
      )
      .then((res) => {
        console.log("refund api res => ", res);
        setContent(res.data?.data[0]?.page_content || "");
      })
      .catch((err) => {
        console.log("refund api err => ", err);
      });
  }, []);

  return (
    <Box sx={{ p: 3, width: "80%", position: "relative" }}>
      {/* Loader Overlay */}
      {isLoading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(255,255,255,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* Header with Title + Buttons */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Manage Content</Typography>
        <Box>
          <Button
            variant="outlined"
            sx={{ mr: 1, textTransform: "none" }}
            onClick={() => {
              setContent("");
              navigate(-1);
            }}
            disabled={isLoading} // disable during loading
          >
            Back
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={wordCount < 1 || isLoading}
            sx={{ textTransform: "none" }}
          >
            {isLoading ? "Saving..." : "Save Content"}
          </Button>
        </Box>
      </Box>

      {/* Textarea with Word Counter */}
      <TextField
        multiline
        minRows={15}
        fullWidth
        variant="outlined"
        placeholder="Write your content here (min 500 words)..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isLoading}
      />
      <Typography variant="body2" sx={{ mt: 1 }}>
        Word Count: {wordCount} / 500
      </Typography>
    </Box>
  );
};

export default MotivationalServices;
