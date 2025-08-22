import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import httpClient from "@/utils/httpClinet";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const OurPackage = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    sub_title: "",
    description: "",
    is_active: false,
    destination_url: "",
    sort_order: 0,
    key: "our-package",
    wid: "root",
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("file => ", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    // console.log("formData => ", formData.get("image"));
    let fData = new FormData();
    fData.append("key", formData.key);
    fData.append("wid", formData.wid);
    fData.append("image", formData.image);
    fData.append("title", formData.title);
    fData.append("sub_title", formData.sub_title);
    fData.append("description", formData.description);
    fData.append("is_active", formData.is_active);
    fData.append("destination_url", formData.destination_url);
    fData.append("sort_order", formData.sort_order);

    setLoading(true);
    httpClient
      .post(`/sitemap/add-content`, fData)
      .then((res) => {
        console.log("save refund api res => ", res);
        enqueueSnackbar("Content saved successfully", { variant: "success" });
      })
      .catch((err) => {
        console.log("save refund api err => ", err);
        enqueueSnackbar("Error saving content", { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
      });
  };

  useEffect(() => {
    httpClient
      .get(`/sitemap/get-content?wid=root&key=our-package`)
      .then((res) => {
        console.log("res => ", res.data.data[0]);
        setFormData(res.data.data[0]);
        setImagePreview(res.data.data[0].image);
      })
      .catch((err) => {
        console.log("err => ", err);
      });
  }, []);

  return (
    <>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          boxShadow: 3,
          paddingBottom: "2rem",
          paddingRight: "2rem",
        }}
      >
        {/* Update Button Inside Container */}
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setOpen(true)}
          >
            Update
          </Button>
        </Box>

        <Box sx={{ display: "flex", flex: 1 }}>
          {/* Left Side - Content */}
          <Box
            sx={{
              flex: 1,
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {formData.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {formData.sub_title}
            </Typography>

            <Box sx={{ mt: 2, fontSize: 14, color: "text.secondary" }}>
              <div>Sort Order: {formData.sort_order}</div>
              <div>Active: {formData.is_active ? "Yes" : "No"}</div>
              <div>
                Created: {new Date(formData.createdAt).toLocaleString()}
              </div>
              <div>
                Updated: {new Date(formData.updatedAt).toLocaleString()}
              </div>
            </Box>
          </Box>

          {/* Right Side - Image */}
          {formData.image && (
            <CardMedia
              component="img"
              image={formData.image}
              alt={formData.title}
              sx={{ width: { xs: "100%", md: 400 }, objectFit: "cover" }}
            />
          )}
        </Box>
      </Card>

      {/* Edit Popup */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Champion Card</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            margin="dense"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Subtitle"
            name="sub_title"
            value={formData.sub_title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            name="description"
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
          />

          {/* Image Upload */}
          <Box sx={{ my: 2 }}>
            <Button variant="outlined" component="label">
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
            </Button>
            {imagePreview && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8 }}
                />
              </Box>
            )}
          </Box>

          <TextField
            fullWidth
            margin="dense"
            label="Destination URL"
            name="destination_url"
            value={formData.destination_url}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Sort Order"
            name="sort_order"
            type="number"
            value={formData.sort_order}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.is_active}
                onChange={handleChange}
                name="is_active"
              />
            }
            label="Active"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            color="secondary"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            color="primary"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OurPackage;
