import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Switch,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import httpClient from "@/utils/httpClinet";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const CarouselList = () => {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    key: "carousel",
    wid: "root",
    image: "",
    title: "",
    sub_title: "",
    description: "",
    is_active: false,
    destination_url: "",
    sort_order: 0,
  });

  const [rows, setRows] = useState([]);
  const navigate = useNavigate();
  const [status, setStatus] = useState(0);

  const deleteSingleSection = (id) => {
    setLoading(true);
    httpClient
      .delete(`/sitemap/delete-content/${id}`)
      .then((res) => {
        enqueueSnackbar("Section deleted successfully", { variant: "success" });
        setStatus((prev) => prev + 1);
      })
      .catch((err) => {
        enqueueSnackbar("Error deleting section", { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 120,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="carousel"
          style={{ width: 50, height: 50, borderRadius: 4 }}
        />
      ),
    },
    { field: "title", headerName: "Title", width: 200 },
    { field: "sub_title", headerName: "Sub Title", width: 200 },
    { field: "description", headerName: "Description", width: 250 },
    {
      field: "is_active",
      headerName: "Active",
      width: 120,
      renderCell: (params) => <Switch checked={params.value} disabled />,
    },
    {
      field: "destination_url",
      headerName: "Destination URL",
      width: 220,
      renderCell: (params) => {
        const url = params.value?.startsWith("http")
          ? params.value
          : `https://${params.value}`;
        return (
          <a href={url} target="_blank" rel="noreferrer">
            {params.value}
          </a>
        );
      },
    },
    { field: "sort_order", headerName: "Sort Order", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 230,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            size="small"
            onClick={() =>
              navigate(`/contents/carousel/edit-carousel/${params.id}`)
            }
            style={{
              marginRight: ".8rem",
            }}
          >
            Edit
          </Button>

          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={() => deleteSingleSection(params.id)}
          >
            Deleting
          </Button>
        </div>
      ),
    },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      console.log("file => ", reader);
      reader.onloadend = () => {
        setPreview(reader.result);
        setFormData((prev) => ({ ...prev, image: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addNewCarousel = async () => {
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
        setStatus((prev) => prev + 1);
      })
      .catch((err) => {
        console.log("save refund api err => ", err);
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
        // handleClose();
      });
  };

  useEffect(() => {
    httpClient
      .get(`sitemap/get-content?wid=root&key=carousel`)
      .then((res) => {
        console.log("get carousel => ", res.data.data);
        setRows(
          res?.data?.data?.map((carousel) => {
            return {
              id: carousel?.id,
              image: carousel?.image || "N/A",
              destination_url: carousel?.destination_url || "N/A",
              title: carousel?.title || "N/A",
              sub_title: carousel?.sub_title,
              description: carousel?.description || "N/A",
              is_active: carousel?.is_active === 1 ? "Yes" : "No",
              sort_order: carousel?.sort_order || 0,
            };
          })
        );
      })
      .catch((err) => {
        console.log("error in get carouser  => ", err);
        setRows([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [status]);

  return (
    <Box sx={{ height: 500, width: "100%", p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6">Carousel List</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Carousel
        </Button>
      </Box>
      <DataGrid
        sx={{
          "& .MuiDataGrid-row:nth-of-type(2n)": {
            backgroundColor: "#d5dbd6",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#d5dbd6",
            outline: "none !important",
          },
          "& .MuiDataGrid-cell": {
            outline: "none !important",
          },
        }}
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        pagination
        disableColumnMenu
        autoHeight
        loading={loading}
      />

      {/* Add Carousel Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Carousel</DialogTitle>
        <DialogContent dividers>
          <Button variant="outlined" component="label" sx={{ mt: 2 }}>
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />
          </Button>
          {preview && (
            <Box mt={2}>
              <img
                src={preview}
                alt="preview"
                style={{ maxWidth: "100%", height: 150, borderRadius: 4 }}
              />
            </Box>
          )}
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
            label="Sub Title"
            name="sub_title"
            value={formData.sub_title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={addNewCarousel}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CarouselList;
