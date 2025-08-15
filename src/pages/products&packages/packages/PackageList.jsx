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

const PackageList = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedRows, setSelectedRows] = useState([]);
  const [openAddPopup, setOpenAddPopup] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [newPackageData, setNewPackageData] = useState({
    name: "",
    package_sku: "",
    packageprice: "",
    package_image: null,
    schoolIds: [],
    productIds: [],
    package_typeID: "",
    requires_handling: 0,
    vposOnly: 0,
    taxable: 0,
  });
  const [editPackageData, setEditPackageData] = useState({
    packageID: null,
    name: "",
    package_sku: "",
    packageprice: "",
    package_image: null,
    schoolIds: [],
    productIds: [],
    package_typeID: "",
    requires_handling: 0,
    vposOnly: 0,
    taxable: 0,
  });
  const [saving, setSaving] = useState(false);
  const [addImagePreview, setAddImagePreview] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const navigate = useNavigate();
  const [schoolList, setSchoolList] = useState([]);
  const [productList, setProductList] = useState([]);
  // Static package types (replace with API if available)
  const [packageTypes, setPackageTypes] = useState([]);
  // const packageTypes = [
  //   { id: 1, name: "Standard" },
  //   { id: 2, name: "Premium" },
  // ];
  // Pagination states
  const [page, setPage] = useState(1); // 1-based page index
  const [pageLimit, setPageLimit] = useState(10);
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
      .get(`/package/get-all-types/hj-tampa`)
      .then((res) => {
        console.log("Package types:", res.data?.data);
        setPackageTypes(res.data?.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch package types:", err);
        enqueueSnackbar("Failed to fetch package types", { variant: "error" });
      });
  }, []);

  // Fetch schools
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

  // Fetch products
  useEffect(() => {
    httpClient
      .get(`/product/get-all-products?wid=hj-tampa`)
      .then((res) => {
        console.log("Product list:", res.data?.data);
        setProductList(res.data?.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        enqueueSnackbar("Failed to fetch products", { variant: "error" });
      });
  }, []);

  const addPackage = () => {
    setOpenAddPopup(true);
  };

  const handleCloseAddPopup = () => {
    setOpenAddPopup(false);
    setAddImagePreview(null);
    setNewPackageData({
      name: "",
      package_sku: "",
      packageprice: "",
      package_image: null,
      schoolIds: [],
      productIds: [],
      package_typeID: "",
      requires_handling: 0,
      vposOnly: 0,
      taxable: 0,
    });
  };

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
    setEditImagePreview(null);
  };

  const handleAddInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPackageData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSchoolChange = (event, isEdit = false) => {
    const selectedSchoolIds = event.target.value.map((id) => Number(id));
    if (isEdit) {
      setEditPackageData((prevData) => ({
        ...prevData,
        schoolIds: selectedSchoolIds,
      }));
    } else {
      setNewPackageData((prevData) => ({
        ...prevData,
        schoolIds: selectedSchoolIds,
      }));
    }
  };

  const handleProductChange = (event, isEdit = false) => {
    const selectedProductIds = event.target.value.map((id) => Number(id));
    if (isEdit) {
      setEditPackageData((prevData) => ({
        ...prevData,
        productIds: selectedProductIds,
      }));
    } else {
      setNewPackageData((prevData) => ({
        ...prevData,
        productIds: selectedProductIds,
      }));
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditPackageData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleAddFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setNewPackageData((prevData) => ({
      ...prevData,
      package_image: file,
    }));
    setAddImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleEditFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setEditPackageData((prevData) => ({
      ...prevData,
      package_image: file,
    }));
    setEditImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleCreatePackage = () => {
    if (!newPackageData.name.trim()) {
      enqueueSnackbar("Package Name is required", { variant: "error" });
      return;
    }
    if (!newPackageData.package_sku.trim()) {
      enqueueSnackbar("Package SKU is required", { variant: "error" });
      return;
    }
    if (
      !newPackageData.packageprice ||
      isNaN(newPackageData.packageprice) ||
      Number(newPackageData.packageprice) <= 0
    ) {
      enqueueSnackbar("Valid Package Price is required", { variant: "error" });
      return;
    }
    if (newPackageData.schoolIds.length === 0) {
      enqueueSnackbar("At least one school must be selected", {
        variant: "error",
      });
      return;
    }
    if (newPackageData.productIds.length === 0) {
      enqueueSnackbar("At least one product must be selected", {
        variant: "error",
      });
      return;
    }
    if (!newPackageData.package_typeID) {
      enqueueSnackbar("Package Type is required", { variant: "error" });
      return;
    }

    setSaving(true);
    const payload = new FormData();
    Object.entries(newPackageData).forEach(([key, value]) => {
      if (key === "schoolIds" && Array.isArray(value)) {
        value.forEach((schoolId) => payload.append("schoolIds[]", schoolId));
      } else if (key === "productIds" && Array.isArray(value)) {
        value.forEach((productId) => payload.append("productIds[]", productId));
      } else if (value !== null && value !== undefined) {
        payload.append(key, value instanceof File ? value : value.toString());
      }
    });

    httpClient
      .post(`/package/add-new-package/hj-tampa`, payload)
      .then((res) => {
        enqueueSnackbar("Package created successfully", { variant: "success" });
        handleCloseAddPopup();
        refreshPackages();
      })
      .catch((err) => {
        console.error("Create package error:", err);
        enqueueSnackbar("Error creating package", { variant: "error" });
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const handleUpdatePackage = () => {
    if (!editPackageData.name.trim()) {
      enqueueSnackbar("Package Name is required", { variant: "error" });
      return;
    }
    if (!editPackageData.package_sku.trim()) {
      enqueueSnackbar("Package SKU is required", { variant: "error" });
      return;
    }
    if (
      !editPackageData.packageprice ||
      isNaN(editPackageData.packageprice) ||
      Number(editPackageData.packageprice) <= 0
    ) {
      enqueueSnackbar("Valid Package Price is required", { variant: "error" });
      return;
    }
    if (editPackageData.schoolIds.length === 0) {
      enqueueSnackbar("At least one school must be selected", {
        variant: "error",
      });
      return;
    }
    if (editPackageData.productIds.length === 0) {
      enqueueSnackbar("At least one product must be selected", {
        variant: "error",
      });
      return;
    }
    if (!editPackageData.package_typeID) {
      enqueueSnackbar("Package Type is required", { variant: "error" });
      return;
    }

    setSaving(true);
    const payload = new FormData();
    Object.entries(editPackageData).forEach(([key, value]) => {
      if (key === "schoolIds" && Array.isArray(value)) {
        value.forEach((schoolId) => payload.append("schoolIds[]", schoolId));
      } else if (key === "productIds" && Array.isArray(value)) {
        value.forEach((productId) => payload.append("productIds[]", productId));
      } else if (value !== null && value !== undefined && key !== "packageID") {
        payload.append(key, value instanceof File ? value : value.toString());
      }
    });

    httpClient
      .patch(`/package/update-package/${editPackageData.packageID}`, payload)
      .then((res) => {
        enqueueSnackbar("Package updated successfully", { variant: "success" });
        handleCloseEditPopup();
        refreshPackages();
      })
      .catch((err) => {
        console.error("Update package error:", err);
        enqueueSnackbar("Error updating package", { variant: "error" });
      })
      .finally(() => {
        setSaving(false);
      });
  };

  const refreshPackages = () => {
    setLoading(true);
    httpClient
      .get(
        `/package/get-all-package/hj-tampa?page=${page}&pageLimit=${pageLimit}`
      )
      .then((res) => {
        console.log("Packages response:", res.data); // Debug API response
        setRows(
          res?.data?.data?.map((pack) => ({
            id: pack.packageID,
            package_image: pack.package_image || "N/A",
            name: pack.name || "N/A",
            package_sku: pack.package_sku || "N/A",
            packageprice: `$${pack.packageprice}` || "N/A",
            deleted: pack.deleted === 1 ? "Yes" : "No",
            hidden: pack.hidden === 1 ? "Yes" : "No",
            schoolIds: (pack.schools || []).map((school) =>
              Number(school.schoolID)
            ),
            productIds: (pack.products || []).map((product) =>
              Number(product.productID)
            ),
            package_typeID: pack.package_typeID || "",
            requires_handling: pack.requires_handling || 0,
            vposOnly: pack.vposOnly || 0,
          }))
        );
        setTotalRows(res?.data?.total || 0);
      })
      .catch((err) => {
        console.error("Refresh packages error:", err);
        enqueueSnackbar("Error fetching packages", { variant: "error" });
      })
      .finally(() => setLoading(false));
  };

  const editPackage = (row) => {
    httpClient
      .get(`/package/get-single-package/${row.id}`)
      .then((res) => {
        const pack = res.data?.data;
        console.log("Single package response:", res.data); // Debug API response
        if (!pack) {
          enqueueSnackbar("Failed to fetch package data", { variant: "error" });
          return;
        }
        setEditPackageData({
          packageID: pack.packageID || null,
          name: pack.name || "",
          package_sku: pack.package_sku || "",
          packageprice: pack.packageprice || "",
          package_image: pack.package_image || null,
          schoolIds: (pack.schools || []).map((school) =>
            Number(school.schoolID)
          ),
          productIds: (pack.products || []).map((product) =>
            Number(product.productID)
          ),
          package_typeID: pack.package_typeID || "",
          requires_handling: pack.requires_handling ? 1 : 0,
          vposOnly: pack.vposOnly ? 1 : 0,
          taxable: pack.taxable ? 1 : 0,
        });
        setEditImagePreview(
          pack.package_image && pack.package_image !== "N/A"
            ? pack.package_image
            : null
        );
        setOpenEditPopup(true);
      })
      .catch((err) => {
        console.error("Fetch single package error:", err);
        enqueueSnackbar("Error fetching package data", { variant: "error" });
      });
  };

  const deletePackage = (row) => {
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
        deleteSinglePackage(id);
      }
    });
  };

  const deleteSinglePackage = (id) => {
    httpClient
      .delete(`/package/delete-package/${id}`)
      .then((res) => {
        enqueueSnackbar("Package deleted successfully", { variant: "success" });
        refreshPackages();
      })
      .catch((err) => {
        console.error("Delete package error:", err);
        enqueueSnackbar("Error deleting package", { variant: "error" });
      });
  };

  const handleBulkDelete = () => {
    console.log("delete bulk packages", selectedRows);
    enqueueSnackbar("Bulk delete not implemented", { variant: "warning" });
  };

  const columns = [
    {
      field: "package_image",
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
              src={params.row?.package_image}
              alt="logo"
            />
          )
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "package_sku",
      headerName: "Package SKU",
      flex: 1,
    },
    {
      field: "packageprice",
      headerName: "Package Price",
      flex: 0.5,
    },
    {
      field: "deleted",
      headerName: "Deleted",
      flex: 0.5,
    },
    {
      field: "hidden",
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
            <Button onClick={() => editPackage(params.row)}>Edit</Button>
            <Button onClick={() => deletePackage(params.row)}>Delete</Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    refreshPackages();
  }, [page, pageLimit]);

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
            Manage Packages
          </Typography>
          <Box>
            {selectedRows.length > 0 && (
              <Button
                variant="contained"
                sx={{ mb: 2, mr: 2, backgroundColor: "red" }}
                onClick={() => handleBulkDelete()}
              >
                Delete Packages
              </Button>
            )}
            <Button variant="contained" sx={{ mb: 2 }} onClick={addPackage}>
              Add New Package
            </Button>
          </Box>
        </Box>
        <DataGrid
          checkboxSelection
          rows={rows}
          columns={columns}
          loading={loading}
          paginationMode="server"
          rowCount={totalRows}
          paginationModel={{ page: page - 1, pageSize: pageLimit }}
          pageSizeOptions={[10, 25, 50]}
          onPaginationModelChange={(model) => {
            setPage(model.page + 1); // Convert to 1-based index
            setPageLimit(model.pageSize);
          }}
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

      {/* Add Package Popup */}
      <Dialog
        open={openAddPopup}
        onClose={handleCloseAddPopup}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Package</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Package Name"
              name="name"
              value={newPackageData.name}
              onChange={handleAddInputChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Package SKU"
              name="package_sku"
              value={newPackageData.package_sku}
              onChange={handleAddInputChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Package Price"
              name="packageprice"
              type="number"
              value={newPackageData.packageprice}
              onChange={handleAddInputChange}
              required
              inputProps={{ min: 0, step: "0.01" }}
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Schools</InputLabel>
              <Select
                multiple
                value={newPackageData.schoolIds}
                label="Schools"
                onChange={(e) => handleSchoolChange(e, false)}
                renderValue={(selected) =>
                  selected.length > 0
                    ? selected
                        .map(
                          (id) =>
                            schoolList.find(
                              (school) => school.schoolID === Number(id)
                            )?.school_name || `Unknown (${id})`
                        )
                        .join(", ")
                    : "None selected"
                }
                MenuProps={menuProps}
              >
                {schoolList.map((school) => (
                  <MenuItem
                    key={school?.schoolID}
                    value={Number(school?.schoolID)}
                  >
                    <Checkbox
                      checked={newPackageData.schoolIds.includes(
                        Number(school?.schoolID)
                      )}
                    />
                    {school?.school_name || `Unknown (${school?.schoolID})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Products</InputLabel>
              <Select
                multiple
                value={newPackageData.productIds}
                label="Products"
                onChange={(e) => handleProductChange(e, false)}
                renderValue={(selected) =>
                  selected.length > 0
                    ? selected
                        .map(
                          (id) =>
                            productList.find(
                              (product) => product.productID === Number(id)
                            )?.name || `Unknown (${id})`
                        )
                        .join(", ")
                    : "None selected"
                }
                MenuProps={menuProps}
              >
                {productList.map((product) => (
                  <MenuItem
                    key={product?.productID}
                    value={Number(product?.productID)}
                  >
                    <Checkbox
                      checked={newPackageData.productIds.includes(
                        Number(product?.productID)
                      )}
                    />
                    {product?.name || `Unknown (${product?.productID})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Package Type</InputLabel>
              <Select
                value={newPackageData.package_typeID}
                label="Package Type"
                name="package_typeID"
                onChange={handleAddInputChange}
              >
                {packageTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  name="requires_handling"
                  checked={newPackageData.requires_handling === 1}
                  onChange={handleAddInputChange}
                />
              }
              label="Requires Handling"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="vposOnly"
                  checked={newPackageData.vposOnly === 1}
                  onChange={handleAddInputChange}
                />
              }
              label="VPOS Only"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="taxable"
                  checked={newPackageData.taxable === 1}
                  onChange={handleAddInputChange}
                />
              }
              label="Taxable"
            />
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
              {newPackageData.package_image && (
                <Typography variant="caption" sx={{ ml: 2 }}>
                  {newPackageData.package_image.name}
                </Typography>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddPopup}>Cancel</Button>
          <LoadingButton
            variant="contained"
            loading={saving}
            onClick={handleCreatePackage}
            disabled={
              !newPackageData.name.trim() ||
              !newPackageData.package_sku.trim() ||
              !newPackageData.packageprice ||
              isNaN(newPackageData.packageprice) ||
              Number(newPackageData.packageprice) <= 0 ||
              newPackageData.schoolIds.length === 0 ||
              newPackageData.productIds.length === 0 ||
              !newPackageData.package_typeID
            }
          >
            Create Package
          </LoadingButton>
        </DialogActions>
      </Dialog>

      {/* Edit Package Popup */}
      <Dialog
        open={openEditPopup}
        onClose={handleCloseEditPopup}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Package</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <TextField
              fullWidth
              margin="normal"
              label="Package Name"
              name="name"
              value={editPackageData.name}
              onChange={handleEditInputChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Package SKU"
              name="package_sku"
              value={editPackageData.package_sku}
              onChange={handleEditInputChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Package Price"
              name="packageprice"
              type="number"
              value={editPackageData.packageprice}
              onChange={handleEditInputChange}
              required
              inputProps={{ min: 0, step: "0.01" }}
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Schools</InputLabel>
              <Select
                multiple
                value={editPackageData.schoolIds}
                label="Schools"
                onChange={(e) => handleSchoolChange(e, true)}
                renderValue={(selected) =>
                  selected.length > 0
                    ? selected
                        .map(
                          (id) =>
                            schoolList.find(
                              (school) => school.schoolID === Number(id)
                            )?.school_name || `Unknown (${id})`
                        )
                        .join(", ")
                    : "None selected"
                }
                MenuProps={menuProps}
              >
                {schoolList.map((school) => (
                  <MenuItem
                    key={school?.schoolID}
                    value={Number(school?.schoolID)}
                  >
                    <Checkbox
                      checked={editPackageData.schoolIds.includes(
                        Number(school?.schoolID)
                      )}
                    />
                    {school?.school_name || `Unknown (${school?.schoolID})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Products</InputLabel>
              <Select
                multiple
                value={editPackageData.productIds}
                label="Products"
                onChange={(e) => handleProductChange(e, true)}
                renderValue={(selected) =>
                  selected.length > 0
                    ? selected
                        .map(
                          (id) =>
                            productList.find(
                              (product) => product.productID === Number(id)
                            )?.name || `Unknown (${id})`
                        )
                        .join(", ")
                    : "None selected"
                }
                MenuProps={menuProps}
              >
                {productList.map((product) => (
                  <MenuItem
                    key={product?.productID}
                    value={Number(product?.productID)}
                  >
                    <Checkbox
                      checked={editPackageData.productIds.includes(
                        Number(product?.productID)
                      )}
                    />
                    {product?.name || `Unknown (${product?.productID})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" required>
              <InputLabel>Package Type</InputLabel>
              <Select
                value={editPackageData.package_typeID}
                label="Package Type"
                name="package_typeID"
                onChange={handleEditInputChange}
              >
                {packageTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  name="requires_handling"
                  checked={editPackageData.requires_handling === 1}
                  onChange={handleEditInputChange}
                />
              }
              label="Requires Handling"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="vposOnly"
                  checked={editPackageData.vposOnly === 1}
                  onChange={handleEditInputChange}
                />
              }
              label="VPOS Only"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="taxable"
                  checked={editPackageData.taxable === 1}
                  onChange={handleEditInputChange}
                />
              }
              label="Taxable"
            />
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
              {editPackageData.package_image && (
                <Typography variant="caption" sx={{ ml: 2 }}>
                  {typeof editPackageData.package_image === "string"
                    ? "Current Image URL"
                    : editPackageData.package_image?.name || "No file name"}
                </Typography>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditPopup}>Cancel</Button>
          <LoadingButton
            variant="contained"
            loading={saving}
            onClick={handleUpdatePackage}
            disabled={
              !editPackageData.name.trim() ||
              !editPackageData.package_sku.trim() ||
              !editPackageData.packageprice ||
              isNaN(editPackageData.packageprice) ||
              Number(editPackageData.packageprice) <= 0 ||
              editPackageData.schoolIds.length === 0 ||
              editPackageData.productIds.length === 0 ||
              !editPackageData.package_typeID
            }
          >
            Update Package
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PackageList;
