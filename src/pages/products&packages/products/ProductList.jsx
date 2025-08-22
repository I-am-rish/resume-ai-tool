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

// Add Product Dialog Component
const AddProductDialog = ({
  open,
  onClose,
  schoolList,
  categories,
  menuProps,
  onCreate,
  saving,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [newProduct, setNewProduct] = useState({
    name: "",
    product_sku: "",
    productImages: [],
    price: "",
    deleted: 0,
    taxable: 0,
    hidden: 0,
    schoolId: [],
    categoryId: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSchoolChange = (event) => {
    const selectedSchoolIds = event.target.value.map((id) => Number(id));
    setNewProduct((prev) => ({ ...prev, schoolId: selectedSchoolIds }));
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryIds = event.target.value.map((id) => Number(id));
    setNewProduct((prev) => ({ ...prev, categoryId: selectedCategoryIds }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setNewProduct((prev) => ({ ...prev, productImages: files }));
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const validateProduct = () => {
    if (!newProduct.name.trim()) {
      enqueueSnackbar("Product Name is required", { variant: "error" });
      return false;
    }
    if (newProduct.categoryId.length === 0) {
      enqueueSnackbar("At least one category must be selected", {
        variant: "error",
      });
      return false;
    }
    if (newProduct.schoolId.length === 0) {
      enqueueSnackbar("At least one school must be selected", {
        variant: "error",
      });
      return false;
    }
    if (newProduct.price && isNaN(Number(newProduct.price))) {
      enqueueSnackbar("Price must be a valid number", { variant: "error" });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateProduct()) return;

    const payload = new FormData();
    Object.entries(newProduct).forEach(([key, value]) => {
      if (key === "productImages") {
        value.forEach((file, index) =>
          payload.append(`productImages[${index}]`, file)
        );
      } else if (key === "schoolId" && Array.isArray(value)) {
        value.forEach((id) => payload.append(`schoolId[]`, id));
      } else if (key === "categoryId" && Array.isArray(value)) {
        value.forEach((id) => payload.append(`categoryId[]`, id));
      } else if (value !== null && value !== undefined) {
        payload.append(key, value.toString());
      }
    });

    try {
      await onCreate(payload);
      onClose();
      setNewProduct({
        name: "",
        product_sku: "",
        productImages: [],
        price: "",
        deleted: 0,
        taxable: 0,
        hidden: 0,
        schoolId: [],
        categoryId: [],
      });
      setImagePreviews([]);
    } catch {
      enqueueSnackbar("Error creating product", { variant: "error" });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Product Name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Product SKU"
            name="product_sku"
            value={newProduct.product_sku}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            name="price"
            type="number"
            value={newProduct.price}
            onChange={handleInputChange}
            inputProps={{ min: 0, step: "0.01" }}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={newProduct.categoryId}
              label="Categories"
              onChange={handleCategoryChange}
              renderValue={(selected) =>
                selected.length > 0
                  ? selected
                      .map(
                        (id) =>
                          categories.find((c) => c.categoryID === Number(id))
                            ?.categoryName || `Unknown (${id})`
                      )
                      .join(", ")
                  : "None selected"
              }
              MenuProps={menuProps}
            >
              {categories.length > 0 ? (
                categories.map((category) => (
                  <MenuItem
                    key={category.categoryID || `category-${Math.random()}`}
                    value={Number(category.categoryID)}
                  >
                    <Checkbox
                      checked={newProduct.categoryId.includes(
                        Number(category.categoryID)
                      )}
                    />
                    {category.categoryName ||
                      `Unknown (${category.categoryID})`}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No categories available</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Schools</InputLabel>
            <Select
              multiple
              value={newProduct.schoolId}
              label="Schools"
              onChange={handleSchoolChange}
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
              {schoolList.length > 0 ? (
                schoolList.map((school) => (
                  <MenuItem
                    key={school.schoolID || `school-${Math.random()}`}
                    value={Number(school.schoolID)}
                  >
                    <Checkbox
                      checked={newProduct.schoolId.includes(
                        Number(school.schoolID)
                      )}
                    />
                    {school.school_name || `Unknown (${school.schoolID})`}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No schools available</MenuItem>
              )}
            </Select>
          </FormControl>
          {["deleted", "taxable", "hidden"].map((field) => (
            <FormControlLabel
              key={field}
              control={
                <Checkbox
                  name={field}
                  checked={newProduct[field] === 1}
                  onChange={handleInputChange}
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
                onChange={handleFileChange}
              />
            </Button>
            {imagePreviews.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption">Image Previews:</Typography>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
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
            {newProduct.productImages.length > 0 && (
              <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
                {newProduct.productImages.map((file) => file.name).join(", ")}
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton
          variant="contained"
          loading={saving}
          onClick={handleSubmit}
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
  );
};

// Edit Product Dialog Component
const EditProductDialog = ({
  open,
  onClose,
  schoolList,
  categories,
  menuProps,
  onUpdate,
  saving,
  productData,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [editProduct, setEditProduct] = useState(productData);
  const [imagePreviews, setImagePreviews] = useState(
    Array.isArray(productData.productImages) ? productData.productImages : []
  );

  useEffect(() => {
    setEditProduct(productData);
    setImagePreviews(
      Array.isArray(productData.productImages) ? productData.productImages : []
    );
  }, [productData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleSchoolChange = (event) => {
    const selectedSchoolIds = event.target.value.map((id) => Number(id));
    setEditProduct((prev) => ({ ...prev, schoolId: selectedSchoolIds }));
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryIds = event.target.value.map((id) => Number(id));
    setEditProduct((prev) => ({ ...prev, categoryId: selectedCategoryIds }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    setEditProduct((prev) => ({ ...prev, productImages: files }));
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const validateProduct = () => {
    if (!editProduct.name.trim()) {
      enqueueSnackbar("Product Name is required", { variant: "error" });
      return false;
    }
    if (editProduct.categoryId.length === 0) {
      enqueueSnackbar("At least one category must be selected", {
        variant: "error",
      });
      return false;
    }
    if (editProduct.schoolId.length === 0) {
      enqueueSnackbar("At least one school must be selected", {
        variant: "error",
      });
      return false;
    }
    if (editProduct.price && isNaN(Number(editProduct.price))) {
      enqueueSnackbar("Price must be a valid number", { variant: "error" });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateProduct()) return;

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
      await onUpdate(payload);
      onClose();
    } catch {
      enqueueSnackbar("Error updating product", { variant: "error" });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Product Name"
            name="name"
            value={editProduct.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Product SKU"
            name="product_sku"
            value={editProduct.product_sku}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            name="price"
            type="number"
            value={editProduct.price}
            onChange={handleInputChange}
            inputProps={{ min: 0, step: "0.01" }}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={editProduct.categoryId}
              label="Categories"
              onChange={handleCategoryChange}
              renderValue={(selected) =>
                selected.length > 0
                  ? selected
                      .map(
                        (id) =>
                          categories.find((c) => c.categoryID === Number(id))
                            ?.categoryName || `Unknown (${id})`
                      )
                      .join(", ")
                  : "None selected"
              }
              MenuProps={menuProps}
            >
              {categories.length > 0 ? (
                categories.map((category) => (
                  <MenuItem
                    key={category.categoryID || `category-${Math.random()}`}
                    value={Number(category.categoryID)}
                  >
                    <Checkbox
                      checked={editProduct.categoryId.includes(
                        Number(category.categoryID)
                      )}
                    />
                    {category.categoryName ||
                      `Unknown (${category.categoryID})`}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No categories available</MenuItem>
              )}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Schools</InputLabel>
            <Select
              multiple
              value={editProduct.schoolId}
              label="Schools"
              onChange={handleSchoolChange}
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
              {schoolList.length > 0 ? (
                schoolList.map((school) => (
                  <MenuItem
                    key={school.schoolID || `school-${Math.random()}`}
                    value={Number(school.schoolID)}
                  >
                    <Checkbox
                      checked={editProduct.schoolId.includes(
                        Number(school.schoolID)
                      )}
                    />
                    {school.school_name || `Unknown (${school.schoolID})`}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No schools available</MenuItem>
              )}
            </Select>
          </FormControl>
          {["deleted", "taxable", "hidden"].map((field) => (
            <FormControlLabel
              key={field}
              control={
                <Checkbox
                  name={field}
                  checked={editProduct[field] === 1}
                  onChange={handleInputChange}
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
                onChange={handleFileChange}
              />
            </Button>
            {imagePreviews.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption">Image Previews:</Typography>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap",
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
            {editProduct.productImages.length > 0 && (
              <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
                {editProduct.productImages
                  .map((file) =>
                    typeof file === "string" ? "Current Image URL" : file.name
                  )
                  .join(", ")}
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <LoadingButton
          variant="contained"
          loading={saving}
          onClick={handleSubmit}
          disabled={
            !editProduct.name.trim() ||
            editProduct.categoryId.length === 0 ||
            editProduct.schoolId.length === 0
          }
        >
          Update Product
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

// Main ProductList Component
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
  const [editProduct, setEditProduct] = useState({
    id: null,
    name: "",
    product_sku: "",
    productImages: [],
    price: "",
    deleted: 0,
    taxable: 0,
    hidden: 0,
    schoolId: [],
    categoryId: [],
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
        console.log("Schools response:", schoolsRes.data);
        console.log("Categories response:", categoriesRes.data);
        setSchoolList(
          schoolsRes.data?.data?.filter(
            (school) =>
              school.schoolID != null && !isNaN(Number(school.schoolID))
          ) || []
        );
        setCategories(
          categoriesRes.data?.data?.categories?.filter(
            (category) =>
              category.categoryID != null && !isNaN(Number(category.categoryID))
          ) || []
        );
      } catch (err) {
        console.error("Failed to fetch schools or categories:", err);
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
      console.log("Products response:", res.data);
      setRows(
        res.data?.data?.products?.map((product) => ({
          id: product.productID,
          productImages: Array.isArray(product.productImage)
            ? product.productImage
            : [],
          name: product.name || "N/A",
          product_sku: product.product_sku || "N/A",
          price: product.price ? `$${Number(product.price).toFixed(2)}` : "N/A",
          deleted: product.deleted == 1 ? "Yes" : "No",
          taxable: product.taxable == 1 ? "Yes" : "No",
          hidden: product.hidden == 1 ? "Yes" : "No",
        })) || []
      );
      setTotalRows(res.data?.data?.total || 0);
    } catch (err) {
      console.error("Error fetching products:", err);
      enqueueSnackbar("Error fetching products", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, pageSize]);

  const handleCreateProduct = async (payload) => {
    setSaving(true);
    try {
      await httpClient.post(`/product/add-new-product`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      enqueueSnackbar("Product created successfully", { variant: "success" });
      fetchProducts();
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateProduct = async (payload) => {
    setSaving(true);
    try {
      await httpClient.patch(
        `/product/update-product/${editProduct.id}`,
        payload,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      enqueueSnackbar("Product updated successfully", { variant: "success" });
      fetchProducts();
    } finally {
      setSaving(false);
    }
  };

  const editProductFunc = async (row) => {
    try {
      const res = await httpClient.get(`/product/get-single-product/${row.id}`);
      const product = res.data?.data;
      console.log("Single product response:", res.data);
      console.log("Product schools:", product.schools);
      console.log("Product categories:", product.categories);
      if (!product) {
        enqueueSnackbar("Failed to fetch product data", { variant: "error" });
        return;
      }
      setEditProduct({
        id: product.productID,
        name: product.name || "",
        product_sku: product.product_sku || "",
        productImages: [],
        price: product.price || "",
        deleted: product.deleted || 0,
        taxable: product.taxable || 0,
        hidden: product.hidden || 0,
        schoolId:
          product.schools
            ?.filter(
              (school) =>
                school.schoolId != null && !isNaN(Number(school.schoolId))
            )
            .map((school) => Number(school.schoolId)) || [],
        categoryId:
          product.categories
            ?.filter(
              (category) =>
                category.categoryID != null &&
                !isNaN(Number(category.categoryID))
            )
            .map((category) => Number(category.categoryID)) || [],
      });
      setOpenEditDialog(true);
    } catch (err) {
      console.error("Error fetching product data:", err);
      enqueueSnackbar("Error fetching product data", { variant: "error" });
    }
  };

  const deleteSingleProduct = async (id) => {
    try {
      await httpClient.delete(`/product/delete-product/${id}`);
      enqueueSnackbar("Product deleted successfully", { variant: "success" });
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
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
    console.log("Delete bulk products:", selectedRows);
    enqueueSnackbar("Bulk delete not implemented", { variant: "warning" });
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
    []
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
            Add New Product
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
      <AddProductDialog
        open={openAddDialog}
        onClose={() => setOpenAddDialog(false)}
        schoolList={schoolList}
        categories={categories}
        menuProps={menuProps}
        onCreate={handleCreateProduct}
        saving={saving}
      />
      <EditProductDialog
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        schoolList={schoolList}
        categories={categories}
        menuProps={menuProps}
        onUpdate={handleUpdateProduct}
        saving={saving}
        productData={editProduct}
      />
    </Box>
  );
};

export default ProductList;
