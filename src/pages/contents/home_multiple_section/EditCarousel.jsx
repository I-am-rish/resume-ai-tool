import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import httpClient from "@/utils/httpClinet";
import { useSnackbar } from "notistack";

const EditCarousel = ({ id, onBack }) => {
  const [formData, setFormData] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const { enqueueSnackbar } = useSnackbar();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const response = await httpClient.get(
          `/sitemap/get-content?wid=root&key=carousel`
        );
        console.log("id => ", params.id);

        const requiredCarousel = response.data.data.find(
          (carousel) => carousel.id === Number(params.id)
        );

        // console.log("find => ", requiredCarousel);
        setFormData(requiredCarousel);
        setPreview(requiredCarousel.image);
      } catch (error) {
        console.error("Error fetching carousel data:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchCarousel();
  }, [params.id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result);
        setFormData((prev) => ({ ...prev, image: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
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
    try {
      const response = await httpClient.patch(
        `/sitemap/update-content/${params.id}`,
        fData
      );
      console.log("save refund api res => ", response);
      enqueueSnackbar("Content saved successfully", { variant: "success" });
      navigate(-1); //back
    } catch (error) {
      console.log("save refund api err => ", error);
      enqueueSnackbar("Error saving content", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!formData) {
    return (
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" color="error">
          Failed to load carousel data.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      {/* Full-width top image */}
      {preview && (
        <Box mb={2}>
          <img
            src={preview}
            alt="preview"
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        </Box>
      )}

      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <CardHeader
          title="Edit Carousel"
          subheader="Update carousel details and save changes"
        />
        <CardContent>
          <Button variant="outlined" component="label" sx={{ mt: 2 }}>
            Upload New Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>

          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Sub Title"
            name="sub_title"
            value={formData.sub_title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            multiline
            rows={3}
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Destination URL"
            name="destination_url"
            value={formData.destination_url}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            type="number"
            label="Sort Order"
            name="sort_order"
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
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button variant="outlined" onClick={() => navigate(-1)} fullWidth>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={loading}
              fullWidth
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditCarousel;
