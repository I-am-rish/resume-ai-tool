import {
  Box,
  Button,
  Divider,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import httpClient from "@/utils/httpClinet";

const CategoryList = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedRows, setSelectedRows] = useState([]);
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [newCategoryData, setNewCategoryData] = useState({
    categoryName: "",
    description: "",
    categoryImage: null,
    schoolId: [],
    isPackage: 0,
  });
  const [editCategoryData, setEditCategoryData] = useState({
    categoryID: null,
    categoryName: "",
    description: "",
    categoryImage: null,
    schoolId: [],
    isPackage: 0,
  });
  const [saving, setSaving] = useState(false);
  const [addImagePreview, setAddImagePreview] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const navigate = useNavigate();
  const [schoolList, setSchoolList] = useState([]);
  // Pagination states
  const [page, setPage] = useState(1); // 1-based page index
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);

  // Define MenuProps for scrollable dropdown
  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 300, // Set maximum height for dropdown
        overflowY: "auto", // Enable vertical scrolling
      },
    },
  };

  useEffect(() => {
    httpClient
      .get("/school/get-all-school/hj-tampa")
      .then((res) => {
        console.log("School list:", res.data?.data);
        setSchoolList(res.data?.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch schools:", err);
        enqueueSnackbar("Failed to fetch schools", { variant: "error" });
      });
  }, []);

  const addCategory = () => {
    setOpenAddPopup(true);
  };

  const handleCloseAddPopup = () => {
    setOpenAddPopup(false);
    setAddImagePreview(null);
    setNewCategoryData({
      categoryName: "",
      description: "",
      categoryImage: null,
      schoolId: [],
      isPackage: 0,
    });
  };

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
    setEditImagePreview(null);
  };

  const handleAddInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewCategoryData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSchoolChange = (event, isEdit = false) => {
    const selectedSchoolIds = event.target.value.map((id) => Number(id));
    if (isEdit) {
      setEditCategoryData((prevData) => ({
        ...prevData,
        schoolId: selectedSchoolIds,
      }));
    } else {
      setNewCategoryData((prevData) => ({
        ...prevData,
        schoolId: selectedSchoolIds,
      }));
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditCategoryData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleAddFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setNewCategoryData((prevData) => ({
      ...prevData,
      categoryImage: file,
    }));
    setAddImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setEditCategoryData((prevData) => ({
      ...prevData,
      categoryImage: file,
    }));
    setEditImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleCreateCategory = () => {
    if (!newCategoryData.categoryName.trim()) {
      enqueueSnackbar("Category Name is required", { variant: "error" });
      return;
    }
    if (newCategoryData.schoolId.length === 0) {
      enqueueSnackbar("At least one school must be selected", {
        variant: "error",
      });
      return;
    }

    setSaving(true);
    const payload = new FormData();
    Object.entries(newCategoryData).forEach(([key, value]) => {
      if (key === "schoolId" && Array.isArray(value)) {
        value.forEach((schoolId) => payload.append("schoolId[]", schoolId));
      } else if (value !== null && value !== undefined) {
        payload.append(key, value instanceof File ? value : value.toString());
      }
    });

    httpClient
      .post(`/category/add-new-category/hj-tampa`, payload)
      .then((res) => {
        enqueueSnackbar("Category created successfully", {
          variant: "success",
        });
        handleCloseAddPopup();
        refreshCategories();
      })
      .catch((err) => {
        console.error("Create category error:", err);
        enqueueSnackbar("Error creating category", { variant: "error" });
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const handleUpdateCategory = () => {
    console.log("editCategoryData => ", editCategoryData);
    setSaving(true);
    const payload = new FormData();
    Object.entries(editCategoryData).forEach(([key, value]) => {
      if (key === "schoolId" && Array.isArray(value)) {
        value.forEach((schoolId) => payload.append("schoolId[]", schoolId));
      } else if (
        value !== null &&
        value !== undefined &&
        key !== "categoryID"
      ) {
        payload.append(key, value instanceof File ? value : value.toString());
      }
    });

    httpClient
      .patch(
        `/category/update-category/${editCategoryData.categoryID}`,
        payload
      )
      .then((res) => {
        enqueueSnackbar("Category updated successfully", {
          variant: "success",
        });
        handleCloseEditPopup();
        refreshCategories();
      })
      .catch((err) => {
        console.error("Update category error:", err);
        enqueueSnackbar("Error updating category", { variant: "error" });
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const refreshCategories = () => {
    setLoading(true);
    httpClient
      .get(
        `/category/get-all-category/hj-tampa?page=${page}&pageSize=${pageSize}`
      )
      .then((res) => {
        console.log("res => ", res.data);
        setRows(
          res?.data?.data?.categories?.map((category) => ({
            id: category.categoryID,
            categoryImage: category.categoryImage || "N/A",
            categoryName: category.categoryName || "N/A",
            description: category.description || "false",
            isDeleted: category.isDeleted == 0 ? "No" : "Yes",
            visible: category.visible == 0 ? "No" : "Yes",
            isPackage: category.isPackage == 0 ? "No" : "Yes",
            isSchoolSelected: category.isSchoolSelected == 0 ? "No" : "Yes",
            schoolId: (category.schools || []).map((school) =>
              Number(school.schoolID)
            ),
          }))
        );
        setTotalRows(res?.data?.data?.total || 0);
      })
      .catch((err) => {
        console.error("Refresh categories error:", err);
        enqueueSnackbar("Error fetching categories", { variant: "error" });
      })
      .finally(() => setLoading(false));
  };

  const editCategory = (row) => {
    httpClient
      .get(`/category/get-single-category/${row.id}`)
      .then((res) => {
        const category = res.data?.data;
        if (!category) {
          enqueueSnackbar("Failed to fetch category data", {
            variant: "error",
          });
          return;
        }
        setEditCategoryData({
          categoryID: category.categoryID,
          categoryName: category.categoryName || "",
          description: category.description || "",
          categoryImage: category.categoryImage || null,
          schoolId: (category.schools || []).map((school) =>
            Number(school.schoolID)
          ),
          isPackage: category.isPackage ? 1 : 0,
        });
        setEditImagePreview(
          category.categoryImage && category.categoryImage !== "N/A"
            ? category.categoryImage
            : null
        );
        setOpenEditPopup(true);
      })
      .catch((err) => {
        console.error("Fetch single category error:", err);
        enqueueSnackbar("Error fetching category data", { variant: "error" });
      });
  };

  const deleteStudent = (row) => {
    confirmBeforeDelete(row?.id);
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
        deleteSingleStudent(id);
      }
    });
  };

  const deleteSingleStudent = (id) => {
    httpClient
      .delete(`/category/delete-category/${id}`)
      .then((res) => {
        enqueueSnackbar("Category deleted successfully", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.error("Delete category error:", err);
        enqueueSnackbar("Error deleting category", { variant: "error" });
      })
      .finally(() => {
        refreshCategories();
      });
  };

  const handleBulkDelete = () => {
    console.log("delete bulk users", selectedRows);
  };

  const columns = [
    {
      field: "categoryImage",
      headerName: "Logo",
      flex: 0.5,
      renderCell: (params) => {
        return (
          params.formattedValue &&
          params.formattedValue !== "N/A" && (
            <img
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                objectFit: "cover",
                cursor: "pointer",
              }}
              src={params.row?.categoryImage}
              alt="logo"
            />
          )
        );
      },
    },
    {
      field: "categoryName",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1.5,
    },
    {
      field: "isDeleted",
      headerName: "Deleted",
      flex: 0.5,
    },
    {
      field: "visible",
      headerName: "Visible",
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.7,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => editCategory(params.row)}>Edit</Button>
            <Button onClick={() => deleteStudent(params.row)}>Delete</Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    refreshCategories();
  }, [page, pageSize]);

  return (
    <>
      <Box
        sx={{
          height: "auto",
          width: "100%",
          m: 2,
          p: 2,
          pb: 10,
        }}
      >
        <Box sx={{ mb: 2 }} className="d-flex justify-content-between">
          <Typography variant="h6" gutterBottom>
            Manage Categories
          </Typography>
          <Box>
            {selectedRows.length > 0 && (
              <Button
                variant="contained"
                sx={{ mb: 2, mr: 2, backgroundColor: "red" }}
                onClick={() => handleBulkDelete()}
              >
                Delete Categories
              </Button>
            )}
            <Button variant="contained" sx={{ mb: 2 }} onClick={addCategory}>
              Add new Category
            </Button>
          </Box>
        </Box>
        <DataGrid
          // checkboxSelection
          rows={rows}
          columns={columns}
          loading={loading}
          paginationMode="server"
          rowCount={totalRows}
          paginationModel={{ page: page - 1, pageSize: pageSize }}
          pageSizeOptions={[10, 25, 50]}
          onPaginationModelChange={(model) => {
            setPage(model.page + 1); // Convert to 1-based index
            setPageSize(model.pageSize);
          }}
          disableSelectionOnClick
          disableRowSelectionOnClick
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
          sx={{
            "& .MuiDataGrid-virtualScroller": {
              outline: "none !important",
              backgroundColor: "#ffff !important",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              fontWeight: "bold",
              outline: "none !important",
            },
            "& .MuiDataGrid-columnHeader": {
              outline: "none !important",
            },
            "& .MuiDataGrid-cell": {
              outline: "none !important",
            },
          }}
        />
      </Box>

      {/* Add Category Popup */}
      <Dialog
        open={openAddPopup}
        onClose={handleCloseAddPopup}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Category Name"
              name="categoryName"
              value={newCategoryData.categoryName}
              onChange={handleAddInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              name="description"
              value={newCategoryData.description}
              onChange={handleAddInputChange}
              multiline
              rows={3}
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Schools</InputLabel>
              <Select
                multiple
                value={newCategoryData.schoolId}
                label="Schools"
                onChange={(e) => handleSchoolChange(e, false)}
                renderValue={(selected) =>
                  selected
                    .map(
                      (id) =>
                        schoolList.find((school) => school.schoolID === id)
                          ?.school_name || "Unknown"
                    )
                    .join(", ")
                }
                MenuProps={menuProps}
              >
                {schoolList.map((school) => (
                  <MenuItem
                    key={school?.schoolID}
                    value={Number(school?.schoolID)}
                  >
                    <Checkbox
                      checked={newCategoryData.schoolId.includes(
                        Number(school?.schoolID)
                      )}
                    />
                    {school?.school_name || "Unknown"}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ mt: 2 }}>
              <Button variant="outlined" component="label">
                Choose Image
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleAddFileChange}
                />
              </Button>
              {addImagePreview && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption">Image Preview:</Typography>
                  <img
                    src={addImagePreview}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "150px",
                      objectFit: "contain",
                      marginTop: "8px",
                    }}
                  />
                </Box>
              )}
              {newCategoryData.categoryImage && (
                <Typography variant="caption" sx={{ ml: 2 }}>
                  {newCategoryData.categoryImage.name}
                </Typography>
              )}
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  name="isPackage"
                  checked={newCategoryData.isPackage === 1}
                  onChange={handleAddInputChange}
                />
              }
              label="Is Package"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddPopup}>Cancel</Button>
          <LoadingButton
            variant="contained"
            loading={saving}
            onClick={handleCreateCategory}
            disabled={
              !newCategoryData.categoryName.trim() ||
              newCategoryData.schoolId.length === 0
            }
          >
            Create Category
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* Edit Category Popup */}
      <Dialog
        open={openEditPopup}
        onClose={handleCloseEditPopup}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Category</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Category Name"
              name="categoryName"
              value={editCategoryData.categoryName}
              onChange={handleEditInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              name="description"
              value={editCategoryData.description}
              onChange={handleEditInputChange}
              multiline
              rows={3}
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Schools</InputLabel>
              <Select
                multiple
                value={editCategoryData.schoolId}
                label="Schools"
                onChange={(e) => handleSchoolChange(e, true)}
                renderValue={(selected) =>
                  selected
                    .map(
                      (id) =>
                        schoolList.find((school) => school.schoolID === id)
                          ?.school_name || "Unknown"
                    )
                    .join(", ")
                }
                MenuProps={menuProps}
              >
                {schoolList.map((school) => (
                  <MenuItem
                    key={school?.schoolID}
                    value={Number(school?.schoolID)}
                  >
                    <Checkbox
                      checked={editCategoryData.schoolId.includes(
                        Number(school?.schoolID)
                      )}
                    />
                    {school?.school_name || "Unknown"}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ mt: 2 }}>
              <Button variant="outlined" component="label">
                Choose New Image
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleEditFileChange}
                />
              </Button>
              {editImagePreview && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption">Image Preview:</Typography>
                  <img
                    src={editImagePreview}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "150px",
                      objectFit: "contain",
                      marginTop: "8px",
                    }}
                  />
                </Box>
              )}
              {editCategoryData.categoryImage && (
                <Typography variant="caption" sx={{ ml: 2 }}>
                  {typeof editCategoryData.categoryImage === "string"
                    ? "Current Image URL"
                    : editCategoryData.categoryImage.name}
                </Typography>
              )}
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  name="isPackage"
                  checked={editCategoryData.isPackage === 1}
                  onChange={handleEditInputChange}
                />
              }
              label="Is Package"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditPopup}>Cancel</Button>
          <LoadingButton
            variant="contained"
            loading={saving}
            onClick={handleUpdateCategory}
          >
            Update Category
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CategoryList;
