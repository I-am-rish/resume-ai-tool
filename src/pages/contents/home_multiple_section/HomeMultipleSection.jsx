import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import httpClient from "@/utils/httpClinet";

const HomeMultipleSection = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedRows, setSelectedRows] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [saving, setSaving] = useState(false);

  const initialSectionState = {
    key: "",
    wid: "root",
    image: null,
    title: "",
    sub_title: "",
    description: "",
    is_active: true,
    destination_url: "",
    sort_order: 1,
  };

  const [newSection, setNewSection] = useState(initialSectionState);
  const [editSection, setEditSection] = useState({
    ...initialSectionState,
    id: null,
  });

  const fetchSections = async () => {
    setLoading(true);
    try {
      const res = await httpClient.get(
        `/sitemap/get-content?wid=root&key=championring&page=${page}&pageSize=${pageSize}`
      );
      setRows(
        res.data?.data?.map((section) => ({
          id: section.id,
          key: section.key || "N/A",
          wid: section.wid || "N/A",
          image: section.image || "",
          title: section.title || "N/A",
          sub_title: section.sub_title || "N/A",
          description: section.description || "N/A",
          is_active: section.is_active ? "Yes" : "No",
          destination_url: section.destination_url || "N/A",
          sort_order: section.sort_order || 0,
          createdAt: section.createdAt
            ? new Date(section.createdAt).toLocaleString()
            : "N/A",
          updatedAt: section.updatedAt
            ? new Date(section.updatedAt).toLocaleString()
            : "N/A",
        })) || []
      );
      setTotalRows(res.data?.data?.total || 0);
    } catch {
      enqueueSnackbar("Error fetching sections", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, [page, pageSize]);

  const handleInputChange = (e, setSection) => {
    const { name, value, type, checked } = e.target;
    setSection((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e, setSection, setPreview) => {
    const file = e.target.files?.[0];
    if (file) {
      setSection((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateSection = (section) => {
    if (!section.key.trim()) {
      enqueueSnackbar("Key is required", { variant: "error" });
      return false;
    }
    if (!section.title.trim()) {
      enqueueSnackbar("Title is required", { variant: "error" });
      return false;
    }
    if (isNaN(Number(section.sort_order)) || Number(section.sort_order) < 1) {
      enqueueSnackbar("Sort order must be a positive number", {
        variant: "error",
      });
      return false;
    }
    return true;
  };

  const handleCreateSection = async () => {
    if (!validateSection(newSection)) return;
    console.log("newSection => ", newSection);

    setSaving(true);
    const payload = new FormData();
    Object.entries(newSection).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        payload.append(key, key === "image" ? value : value.toString());
      }
    });

    try {
      await httpClient.post(`/sitemap/add-content`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      enqueueSnackbar("Section created successfully", { variant: "success" });
      handleCloseAddDialog();
      fetchSections();
    } catch {
      enqueueSnackbar("Error creating section", { variant: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateSection = async () => {
    if (!validateSection(editSection)) return;

    setSaving(true);
    const payload = new FormData();
    Object.entries(editSection).forEach(([key, value]) => {
      if (key !== "id" && value !== null && value !== undefined) {
        payload.append(key, key === "image" ? value : value.toString());
      }
    });

    try {
      await httpClient.patch(`/sitemap/update-content/${editSection.id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      enqueueSnackbar("Section updated successfully", { variant: "success" });
      handleCloseEditDialog();
      fetchSections();
    } catch {
      enqueueSnackbar("Error updating section", { variant: "error" });
    } finally {
      setSaving(false);
    }
  };

  const editSectionFunc = async (row) => {
    try {
      const res = await httpClient.get(
        `/sitemap/get-content?wid=${row?.wid}&key=${row?.key}`
      );
      console.log("section =>", res);
      const section = res.data?.data[0];
      if (!section) {
        enqueueSnackbar("Failed to fetch section data", { variant: "error" });
        return;
      }
      setEditSection({
        id: section.id,
        key: section.key || "",
        wid: section.wid || "root",
        image: null,
        title: section.title || "",
        sub_title: section.sub_title || "",
        description: section.description || "",
        is_active: section.is_active || false,
        destination_url: section.destination_url || "",
        sort_order: section.sort_order || 1,
      });
      setImagePreview(section.image || "");
      setOpenEditDialog(true);
    } catch {
      enqueueSnackbar("Error fetching section data", { variant: "error" });
    }
  };

  const deleteSingleSection = async (id) => {
    try {
      await httpClient.delete(`/sitemap/delete-content/${id}`);
      enqueueSnackbar("Section deleted successfully", { variant: "success" });
      fetchSections();
    } catch {
      enqueueSnackbar("Error deleting section", { variant: "error" });
    }
  };

  const confirmBeforeDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSingleSection(id);
      }
    });
  };

  const handleBulkDelete = () => {
    console.log("delete bulk sections", selectedRows);
  };

  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: "Image",
        flex: 1,
        renderCell: ({ value }) =>
          value ? (
            <img
              src={value}
              alt="section"
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "4px",
                objectFit: "cover",
              }}
            />
          ) : (
            "N/A"
          ),
      },
      { field: "key", headerName: "Key", flex: 0.8 },
      // { field: "wid", headerName: "WID", flex: 0.6 },
      { field: "title", headerName: "Title", flex: 1.2 },
      // { field: "sub_title", headerName: "Sub Title", flex: 1 },
      // {
      //   field: "description",
      //   headerName: "Description",
      //   flex: 1.5,
      //   renderCell: ({ value }) => (
      //     <div style={{ whiteSpace: "pre-wrap" }}>{value}</div>
      //   ),
      // },
      { field: "is_active", headerName: "Active", flex: 0.5 },
      // { field: "destination_url", headerName: "Destination URL", flex: 1 },
      { field: "sort_order", headerName: "Sort Order", flex: 0.5 },
      { field: "createdAt", headerName: "Created At", flex: 1 },
      { field: "updatedAt", headerName: "Updated At", flex: 1 },
      {
        field: "actions",
        headerName: "Actions",
        flex: 0.7,
        renderCell: ({ row }) => (
          <>
            <Button onClick={() => editSectionFunc(row)}>Edit</Button>
            <Button onClick={() => confirmBeforeDelete(row.id)}>Delete</Button>
          </>
        ),
      },
    ],
    []
  );

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewSection(initialSectionState);
    setImagePreview("");
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditSection({ ...initialSectionState, id: null });
    setImagePreview("");
  };

  const renderSectionForm = (sectionData, setSectionData, isEdit) => (
    <Box sx={{ p: 2 }}>
      <TextField
        fullWidth
        margin="normal"
        label="Key"
        name="key"
        value={sectionData.key}
        onChange={(e) => handleInputChange(e, setSectionData)}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="WID"
        name="wid"
        value={sectionData.wid}
        onChange={(e) => handleInputChange(e, setSectionData)}
        disabled={isEdit}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Title"
        name="title"
        value={sectionData.title}
        onChange={(e) => handleInputChange(e, setSectionData)}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Sub Title"
        name="sub_title"
        value={sectionData.sub_title}
        onChange={(e) => handleInputChange(e, setSectionData)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Description"
        name="description"
        value={sectionData.description}
        onChange={(e) => handleInputChange(e, setSectionData)}
        multiline
        rows={4}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Destination URL"
        name="destination_url"
        value={sectionData.destination_url}
        onChange={(e) => handleInputChange(e, setSectionData)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Sort Order"
        name="sort_order"
        type="number"
        value={sectionData.sort_order}
        onChange={(e) => handleInputChange(e, setSectionData)}
        inputProps={{ min: 1 }}
        required
      />
      <FormControlLabel
        control={
          <Checkbox
            name="is_active"
            checked={sectionData.is_active}
            onChange={(e) => handleInputChange(e, setSectionData)}
          />
        }
        label="Active"
      />
      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" component="label">
          Upload Image
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleFileChange(e, setSectionData, setImagePreview)
            }
          />
        </Button>
        {imagePreview && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption">Image Preview:</Typography>
            <img
              src={imagePreview}
              alt="preview"
              style={{
                maxWidth: "100px",
                maxHeight: "100px",
                objectFit: "contain",
                borderRadius: "4px",
                marginTop: "8px",
              }}
            />
          </Box>
        )}
        {sectionData.image && (
          <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
            Selected: {sectionData.image.name}
          </Typography>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ height: "auto", width: "100%", m: 2, p: 2, pb: 10 }}>
      <Box sx={{ mb: 2 }} className="d-flex justify-content-between">
        <Typography variant="h6" gutterBottom>
          Manage Home Sections
        </Typography>
        <Box>
          {selectedRows.length > 0 && (
            <Button
              variant="contained"
              sx={{ mb: 2, mr: 2, backgroundColor: "red" }}
              onClick={handleBulkDelete}
            >
              Delete Sections
            </Button>
          )}
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => setOpenAddDialog(true)}
          >
            Add New Section
          </Button>
        </Box>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        paginationMode="server"
        rowCount={totalRows}
        paginationModel={{ page: page - 1, pageSize }}
        pageSizeOptions={[10, 25, 50]}
        onPaginationModelChange={(model) => {
          setPage(model.page + 1);
          setPageSize(model.pageSize);
        }}
        disableRowSelectionOnClick
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        onRowSelectionModelChange={setSelectedRows}
        sx={{
          "& .MuiDataGrid-virtualScroller": {
            outline: "none !important",
            backgroundColor: "#fff !important",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            fontWeight: "bold",
            outline: "none !important",
          },
          "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
            outline: "none !important",
          },
        }}
      />
      <Dialog
        open={openAddDialog}
        onClose={handleCloseAddDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Section</DialogTitle>
        <DialogContent>
          {renderSectionForm(newSection, setNewSection, false)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <LoadingButton
            variant="contained"
            loading={saving}
            onClick={handleCreateSection}
            disabled={
              !newSection.key.trim() ||
              !newSection.title.trim() ||
              isNaN(Number(newSection.sort_order)) ||
              Number(newSection.sort_order) < 1
            }
          >
            Create Section
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Section</DialogTitle>
        <DialogContent>
          {renderSectionForm(editSection, setEditSection, true)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <LoadingButton
            variant="contained"
            loading={saving}
            onClick={handleUpdateSection}
            disabled={
              !editSection.key.trim() ||
              !editSection.title.trim() ||
              isNaN(Number(editSection.sort_order)) ||
              Number(editSection.sort_order) < 1
            }
          >
            Update Section
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HomeMultipleSection;
