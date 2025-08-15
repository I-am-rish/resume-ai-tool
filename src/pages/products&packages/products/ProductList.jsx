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
import { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";
import { useSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import httpClient from "@/utils/httpClinet";

const ProductList = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedRows, setSelectedRows] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [schoolList, setSchoolList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [saving, setSaving] = useState(false);
  const [addImagePreviews, setAddImagePreviews] = useState([]);
  const [editImagePreviews, setEditImagePreviews] = useState([]);

  const initialProductState = {
    name: "",
    product_sku: "",
    productImages: [], // Changed to array for multiple file uploads
    price: "",
    deleted: 0,
    taxable: 1,
    hidden: 0,
    schoolId: [],
    categoryId: [], // Changed to array for multiple categories
  };

  const [newProduct, setNewProduct] = useState(initialProductState);
  const [editProduct, setEditProduct] = useState({
    ...initialProductState,
    id: null,
  });

  const menuProps = useMemo(
    () => ({
      PaperProps: {
        style: {
          maxHeight: 300,
          overflowY: "auto",
        },
      },
    }),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schoolsRes, categoriesRes] = await Promise.all([
          httpClient.get("/school/get-all-school/hj-tampa"),
          httpClient.get("/category/get-all-category/hj-tampa"),
        ]);
        setSchoolList(schoolsRes.data?.data || []);
        setCategories(categoriesRes.data?.data?.categories || []);
      } catch {
        enqueueSnackbar("Failed to fetch schools or categories", {
          variant: "error",
        });
      }
    };
    fetchData();
  }, [enqueueSnackbar]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await httpClient.get(
        `/product/get-all-products?wid=hj-tampa&page=${page}&pageSize=${pageSize}`
      );
      setRows(
        res.data?.data?.map((product) => ({
          id: product.productID,
          productImages: product.productImage || [], // Changed to productImages
          name: product.name || "N/A",
          product_sku: product.product_sku || "N/A",
          price: product.price || "0.00",
          deleted: product.deleted == 1 ? "Yes" : "No",
          taxable: product.taxable == 1 ? "Yes" : "No",
          hidden: product.hidden == 1 ? "Yes" : "No",
          categoryId: product.categoryID || [], // Array of category IDs
          schoolId: (product.schools || []).map((school) =>
            Number(school.schoolID)
          ),
        })) || []
      );
      setTotalRows(res.data?.data?.total || 0);
    } catch {
      enqueueSnackbar("Error fetching products", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, pageSize]);

  const handleInputChange = (e, setProduct) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSchoolChange = (event, setProduct) => {
    const selectedSchoolIds = event.target.value.map((id) => Number(id));
    setProduct((prev) => ({ ...prev, schoolId: selectedSchoolIds }));
  };

  const handleCategoryChange = (event, setProduct) => {
    const selectedCategoryIds = event.target.value.map((id) => Number(id));
    setProduct((prev) => ({ ...prev, categoryId: selectedCategoryIds }));
  };

  const handleFileChange = (e, setProduct, setImagePreviews) => {
    const files = Array.from(e.target.files || []);
    setProduct((prev) => ({ ...prev, productImages: files }));
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const validateProduct = (product) => {
    if (!product.name.trim()) {
      enqueueSnackbar("Product Name is required", { variant: "error" });
      return false;
    }
    if (product.categoryId.length === 0) {
      enqueueSnackbar("At least one category must be selected", {
        variant: "error",
      });
      return false;
    }
    if (product.schoolId.length === 0) {
      enqueueSnackbar("At least one school must be selected", {
        variant: "error",
      });
      return false;
    }
    if (product.price && isNaN(Number(product.price))) {
      enqueueSnackbar("Price must be a valid number", { variant: "error" });
      return false;
    }
    return true;
  };

  const handleCreateProduct = async () => {
    if (!validateProduct(newProduct)) return;

    setSaving(true);
    const payload = new FormData();
    Object.entries(newProduct).forEach(([key, value]) => {
      if (key === "productImages") {
        value.forEach((file, index) =>
          payload.append(`productImages[${index}]`, file)
        );
      } else if (key === "schoolId" || key === "categoryId") {
        value.forEach((id) => payload.append(`${key}[]`, id));
      } else if (value !== null && value !== undefined) {
        payload.append(key, value.toString());
      }
    });

    try {
      await httpClient.post(`/product/add-new-product`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      enqueueSnackbar("Product created successfully", { variant: "success" });
      handleCloseAddDialog();
      fetchProducts();
    } catch {
      enqueueSnackbar("Error creating product", { variant: "error" });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateProduct = async () => {
    if (!validateProduct(editProduct)) return;

    setSaving(true);
    const payload = new FormData();
    Object.entries(editProduct).forEach(([key, value]) => {
      if (key === "productImages") {
        value.forEach((file, index) =>
          payload.append(`productImages[${index}]`, file)
        );
      } else if (key === "schoolId" || key === "categoryId") {
        value.forEach((id) => payload.append(`${key}[]`, id));
      } else if (value !== null && value !== undefined && key !== "id") {
        payload.append(key, value.toString());
      }
    });

    try {
      await httpClient.patch(`/product/update/${editProduct.id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      enqueueSnackbar("Product updated successfully", { variant: "success" });
      handleCloseEditDialog();
      fetchProducts();
    } catch {
      enqueueSnackbar("Error updating product", { variant: "error" });
    } finally {
      setSaving(false);
    }
  };

  const editProductFunc = async (row) => {
    try {
      const res = await httpClient.get(`/product/get-single-product/${row.id}`);
      const product = res.data?.data;
      if (!product) {
        enqueueSnackbar("Failed to fetch product data", { variant: "error" });
        return;
      }
      setEditProduct({
        id: product.productID,
        name: product.name || "",
        product_sku: product.product_sku || "",
        productImages: [], // Files will be set via file input
        price: product.price || "",
        deleted: product.deleted || 0,
        taxable: product.taxable || 1,
        hidden: product.hidden || 0,
        schoolId: (product.schools || []).map((school) =>
          Number(school.schoolID)
        ),
        categoryId: product.categoryID || [], // Array of category IDs
      });
      setEditImagePreviews(
        Array.isArray(product.productImage) ? product.productImage : []
      );
      setOpenEditDialog(true);
    } catch {
      enqueueSnackbar("Error fetching product data", { variant: "error" });
    }
  };

  const deleteSingleProduct = async (id) => {
    try {
      await httpClient.delete(`/product/${id}`);
      enqueueSnackbar("Product deleted successfully", { variant: "success" });
      fetchProducts();
    } catch {
      enqueueSnackbar("Error deleting product", { variant: "error" });
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
        deleteSingleProduct(id);
      }
    });
  };

  const handleBulkDelete = () => {
    console.log("delete bulk products", selectedRows);
  };

  const columns = useMemo(
    () => [
      {
        field: "productImages",
        headerName: "Images",
        flex: 1,
        renderCell: ({ value }) => {
          if (!Array.isArray(value) || value.length === 0) return null;
          return (
            <div style={{ display: "flex", gap: "8px" }}>
              {value.map((imgSrc, index) => (
                <img
                  key={index}
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  src={imgSrc}
                  alt={`image-${index}`}
                />
              ))}
            </div>
          );
        },
      },
      { field: "name", headerName: "Name", flex: 1.4 },
      { field: "product_sku", headerName: "Product SKU", flex: 0.7 },
      { field: "price", headerName: "Price", flex: 0.6 },
      {
        field: "categories",
        headerName: "Categories",
        flex: 1,
        renderCell: ({ row }) => {
          const categoryNames = row.categoryId
            .map(
              (id) =>
                categories.find((c) => c.categoryID === id)?.categoryName ||
                "Unknown"
            )
            .join(", ");
          return categoryNames || "N/A";
        },
      },
      {
        field: "schools",
        headerName: "Schools",
        flex: 1.5,
        renderCell: ({ row }) => {
          const schoolNames = row.schoolId
            .map(
              (id) =>
                schoolList.find((s) => s.schoolID === id)?.school_name ||
                "Unknown"
            )
            .join(", ");
          return schoolNames || "N/A";
        },
      },
      { field: "deleted", headerName: "Deleted", flex: 0.5 },
      { field: "taxable", headerName: "Taxable", flex: 0.5 },
      { field: "hidden", headerName: "Hidden", flex: 0.5 },
      {
        field: "actions",
        headerName: "Actions",
        flex: 0.7,
        renderCell: ({ row }) => (
          <>
            <Button onClick={() => editProductFunc(row)}>Edit</Button>
            <Button onClick={() => confirmBeforeDelete(row.id)}>Delete</Button>
          </>
        ),
      },
    ],
    [categories, schoolList]
  );

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewProduct(initialProductState);
    setAddImagePreviews([]);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditProduct({ ...initialProductState, id: null });
    setEditImagePreviews([]);
  };

  const renderProductForm = (
    productData,
    setProductData,
    setImagePreviews,
    imagePreviews,
    isEdit
  ) => (
    <Box sx={{ p: 2 }}>
      <TextField
        fullWidth
        margin="normal"
        label="Product Name"
        name="name"
        value={productData.name}
        onChange={(e) => handleInputChange(e, setProductData)}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Product SKU"
        name="product_sku"
        value={productData.product_sku}
        onChange={(e) => handleInputChange(e, setProductData)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Price"
        name="price"
        type="number"
        value={productData.price}
        onChange={(e) => handleInputChange(e, setProductData)}
        inputProps={{ min: 0, step: "0.01" }}
      />
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Categories</InputLabel>
        <Select
          multiple
          value={productData.categoryId}
          label="Categories"
          onChange={(e) => handleCategoryChange(e, setProductData)}
          renderValue={(selected) =>
            selected
              .map(
                (id) =>
                  categories.find((c) => c.categoryID === id)?.categoryName ||
                  "Unknown"
              )
              .join(", ")
          }
          MenuProps={menuProps}
        >
          {categories.map((category) => (
            <MenuItem
              key={category.categoryID}
              value={Number(category.categoryID)}
            >
              <Checkbox
                checked={productData.categoryId.includes(
                  Number(category.categoryID)
                )}
              />
              {category.categoryName || "Unknown"}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" required>
        <InputLabel>Schools</InputLabel>
        <Select
          multiple
          value={productData.schoolId}
          label="Schools"
          onChange={(e) => handleSchoolChange(e, setProductData)}
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
            <MenuItem key={school.schoolID} value={Number(school.schoolID)}>
              <Checkbox
                checked={productData.schoolId.includes(Number(school.schoolID))}
              />
              {school.school_name || "Unknown"}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {["deleted", "taxable", "hidden"].map((field) => (
        <FormControlLabel
          key={field}
          control={
            <Checkbox
              name={field}
              checked={productData[field] === 1}
              onChange={(e) => handleInputChange(e, setProductData)}
            />
          }
          label={field.charAt(0).toUpperCase() + field.slice(1)}
        />
      ))}
      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" component="label">
          Upload Images
          <input
            hidden
            type="file"
            accept="image/*"
            multiple
            onChange={(e) =>
              handleFileChange(e, setProductData, setImagePreviews)
            }
          />
        </Button>
        {imagePreviews.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="caption">Image Previews:</Typography>
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWarp: "wrap",
                marginTop: "8px",
              }}
            >
              {imagePreviews.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`preview-${index}`}
                  style={{
                    maxWidth: "100px",
                    maxHeight: "100px",
                    objectFit: "contain",
                    borderRadius: "4px",
                  }}
                />
              ))}
            </div>
          </Box>
        )}
        {productData.productImages.length > 0 && (
          <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
            {productData.productImages.map((file) => file.name).join(", ")}
          </Typography>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ height: "auto", width: "100%", m: 2, p: 2, pb: 10 }}>
      <Box sx={{ mb: 2 }} className="d-flex justify-content-between">
        <Typography variant="h6" gutterBottom>
          Manage Products
        </Typography>
        <Box>
          {selectedRows.length > 0 && (
            <Button
              variant="contained"
              sx={{ mb: 2, mr: 2, backgroundColor: "red" }}
              onClick={handleBulkDelete}
            >
              Delete Products
            </Button>
          )}
          <Button
            variant="contained"
            sx={{ mb: 2 }}
            onClick={() => setOpenAddDialog(true)}
          >
            Add new Product
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
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          {renderProductForm(
            newProduct,
            setNewProduct,
            setAddImagePreviews,
            addImagePreviews,
            false
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <LoadingButton
            variant="contained"
            loading={saving}
            onClick={handleCreateProduct}
            disabled={
              !newProduct.name.trim() ||
              newProduct.categoryId.length === 0 ||
              newProduct.schoolId.length === 0
            }
          >
            Create Product
          </LoadingButton>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          {renderProductForm(
            editProduct,
            setEditProduct,
            setEditImagePreviews,
            editImagePreviews,
            true
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <LoadingButton
            variant="contained"
            loading={saving}
            onClick={handleUpdateProduct}
            disabled={
              !editProduct.name.trim() ||
              editProduct.categoryId630.length === 0 ||
              editProduct.schoolId.length === 0
            }
          >
            Update Product
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductList;
