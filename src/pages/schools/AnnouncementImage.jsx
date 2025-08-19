import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Typography,  } from "@mui/material";
import { useParams } from "react-router-dom";
import httpClient from "@/utils/httpClinet";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";

const AnnouncementImage = ({ school = {}, loading = false }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imageFile, setImageFile] = useState(school.announcement_image);
  const [uploading, setUploading] = useState(false); // New state for upload loading
  const fileInputRef = useRef(null);
  const params = useParams();
   const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (school.announcement_image) {
      setPreviewUrl(school.announcement_image);
    }
    console.log("image => ", school);
  }, [school]);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleChooseClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = () => {
    if (imageFile) {
      setUploading(true); // Start the loader
      let fData = new FormData();
      fData.append("announcement_image", imageFile);
      httpClient
        .patch(`/school/update-school/${params.id}`, fData)
        .then((res) => {
          console.log("res => ", res);
          enqueueSnackbar("Image uploaded successfully", {
            variant: "success",
          })
        })
        .catch((err) => {
          console.log("err => ", err);
          enqueueSnackbar("Error uploading image", {
            variant: "error",
          })
        })
        .finally(() => {
          setUploading(false); // Stop the loader
        });
    }
  };

  const handleDelete = () => {
    setPreviewUrl(null);
    setImageFile(null);
    fileInputRef.current.value = null;
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "auto",
        border: "1px solid #ccc",
        borderRadius: 2,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h6">Image Preview</Typography>

      <Box
        sx={{
          width: "100%",
          height: 300,
          border: "1px solid #ddd",
          borderRadius: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          backgroundColor: "#f9f9f9",
        }}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          <Typography variant="body2" color="textSecondary">
            No image selected
          </Typography>
        )}
      </Box>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="contained" onClick={handleChooseClick}>
          Choose File
        </Button>
        <LoadingButton
          variant="contained"
          color="success"
          loading={uploading}
          onClick={handleUpload}
          disabled={!imageFile || uploading}
        >
          Upload Image
        </LoadingButton>
        {/* <Button
          variant="outlined"
          color="error"
          onClick={handleDelete}
          disabled={!previewUrl}
        >
          Delete Image
        </Button> */}
      </Box>
    </Box>
  );
};

export default AnnouncementImage;
