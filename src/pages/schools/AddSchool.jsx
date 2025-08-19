import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import httpClient from "@/utils/httpClinet";

const AddNewSchool = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [previewUrl, setPreviewUrl] = useState(null);

  const [formData, setFormData] = useState({
    schoolName: "",
    schoolCode: "",
    customerNumber: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    taxRate: "",
    feeLabel: "",
    schoolFee: "",
    announcementsRequirePackage: false,
    chargeTax: false,
    noShipping: false,
    freeShipping: false,
    logo: null,
  });

  const [errors, setErrors] = useState({
    schoolName: "",
    schoolCode: "",
    address1: "",
    city: "",
    state: "",
    country: "",
    taxRate: "",
    logo: "",
  });

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          logo: "Invalid file type. Use jpg, jpeg, png, or webp.",
        });
        setPreviewUrl(null);
        setFormData({ ...formData, logo: null });
        return;
      }

      // Validate file size (100KB = 100 * 1024 bytes)
      // if (file.size > 100 * 1024) {
      //   setErrors({ ...errors, logo: "File size exceeds 100KB limit." });
      //   setPreviewUrl(null);
      //   setFormData({ ...formData, logo: null });
      //   return;
      // }

      // Set file and preview
      setFormData({ ...formData, logo: file });
      setErrors({ ...errors, logo: "" });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
      setFormData({ ...formData, logo: null });
      setErrors({ ...errors, logo: "" });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      schoolName: "",
      // schoolCode: "",
      address1: "",
      city: "",
      state: "",
      country: "",
      taxRate: "",
      logo: "",
    };

    if (!formData.schoolName.trim()) {
      newErrors.schoolName = "School Name is required";
      isValid = false;
    }
    // if (!formData.schoolCode.trim()) {
    //   newErrors.schoolCode = "School Code is required";
    //   isValid = false;
    // }
    if (!formData.address1.trim()) {
      newErrors.address1 = "Address 1 is required";
      isValid = false;
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    }
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
      isValid = false;
    }
    if (!formData.country.trim()) {
      newErrors.country = "County is required";
      isValid = false;
    }
    if (!formData.taxRate.trim()) {
      newErrors.taxRate = "Tax Rate is required";
      isValid = false;
    } else if (
      isNaN(formData.taxRate) ||
      parseFloat(formData.taxRate) < 0 ||
      !/^\d*\.?\d*$/.test(formData.taxRate)
    ) {
      newErrors.taxRate =
        "Tax Rate must be a valid positive number (e.g., 7.00)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const addSchool = async () => {
    if (!validateForm()) {
      enqueueSnackbar("Please fill all required fields correctly", {
        variant: "error",
      });
      return;
    }

    setLoading(true);
    try {
      console.log("Submitting school:", formData);
      let fData = new FormData();
      fData.append("school_name", formData.schoolName);
      // fData.append("school_code", formData.schoolCode);
      fData.append("customer_number", formData.customerNumber);
      fData.append("address1", formData.address1);
      fData.append("address2", formData.address2);
      fData.append("city", formData.city);
      fData.append("state", formData.state);
      fData.append("zip", formData.zip);
      fData.append("country", formData.country);
      fData.append("tax_rate", formData.taxRate);
      fData.append("feeLabel", formData.feeLabel);
      fData.append("schoolFee", formData.schoolFee);
      fData.append(
        "announcements_require_package",
        formData.announcementsRequirePackage
      );
      fData.append(
        "charge_shipping_on_capsAnd_gowns",
        formData.chargeTax == true ? 1 : 0
      );
      fData.append("NoShippingCharges", formData.noShipping == true ? 1 : 0);
      fData.append("tax_on_shipping", formData.freeShipping == true ? 1 : 0);
      fData.append("school_logo", formData.logo);
      fData.append("wid", "hj-tampa");

      httpClient
        .post("/school/add-new-school", fData)
        .then((res) => {
          console.log("add school res => ", res);
          setLoading(false);
          enqueueSnackbar("School added successfully", {
            variant: "success",
          });
          navigate(-1);
        })
        .catch((err) => {
          console.log("add school err => ", err);
          setLoading(false);
          enqueueSnackbar("Error adding school", {
            variant: "error",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      enqueueSnackbar("Error adding school", {
        variant: "error",
      });
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          p: 4,
          border: "1px solid #ccc",
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Stack
          direction="row"
          flexWrap="wrap"
          borderBottom={"1px solid #ccc"}
          pb={2}
          mb={2}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Add New School
          </Typography>
          <Button
            variant="outlined"
            sx={{ mr: 2 }}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Stack>

        <Typography variant="h6">Basic Information</Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="School Name"
              value={formData.schoolName}
              onChange={handleChange("schoolName")}
              error={!!errors.schoolName}
              helperText={errors.schoolName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="School Code"
              value={formData.schoolCode}
              onChange={handleChange("schoolCode")}
              error={!!errors.schoolCode}
              helperText={errors.schoolCode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Customer Number"
              value={formData.customerNumber}
              onChange={handleChange("customerNumber")}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Address 1"
              value={formData.address1}
              onChange={handleChange("address1")}
              error={!!errors.address1}
              helperText={errors.address1}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address 2"
              value={formData.address2}
              onChange={handleChange("address2")}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="City"
              value={formData.city}
              onChange={handleChange("city")}
              error={!!errors.city}
              helperText={errors.city}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              required
              label="State- like CA, NY, etc."
              value={formData.state}
              onChange={handleChange("state")}
              error={!!errors.state}
              helperText={errors.state}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              label="Zip Code"
              value={formData.zip}
              onChange={handleChange("zip")}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="County"
              value={formData.country}
              onChange={handleChange("country")}
              error={!!errors.country}
              helperText={errors.country}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              label="Tax Rate (e.g., 7.00)"
              value={formData.taxRate}
              onChange={handleChange("taxRate")}
              error={!!errors.taxRate}
              helperText={errors.taxRate}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Fee Label"
              value={formData.feeLabel}
              onChange={handleChange("feeLabel")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="School Fee"
              value={formData.schoolFee}
              onChange={handleChange("schoolFee")}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Settings
            </Typography>
            <Stack direction="row" flexWrap="wrap">
              {/* <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.announcementsRequirePackage}
                    onChange={handleChange("announcementsRequirePackage")}
                  />
                }
                label="Announcements Require Package"
              /> */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.chargeTax}
                    onChange={handleChange("chargeTax")}
                  />
                }
                label="Charge Tax on Shipping & Handling"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.noShipping}
                    onChange={handleChange("noShipping")}
                  />
                }
                label="No Shipping on Cap and Gown Only Orders"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.freeShipping}
                    onChange={handleChange("freeShipping")}
                  />
                }
                label="Free Shipping For All Products"
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Upload Logo
            </Typography>
            <Button variant="outlined" component="label">
              Choose File
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            <Typography variant="caption" display="block" sx={{ mt: 1, mb: 1 }}>
              {/* (jpg, jpeg, png, webp only — Max: 100KB) */}
            </Typography>
            {/* {errors.logo && (
              <Typography
                variant="caption"
                color="error"
                display="block"
                sx={{ mb: 1 }}
              >
                {errors.logo}
              </Typography>
            )} */}
            {previewUrl && (
              <Box sx={{ mt: 2, maxWidth: 200 }}>
                <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                  Preview:
                </Typography>
                <img
                  src={previewUrl}
                  alt="Logo Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100px",
                    objectFit: "contain",
                  }}
                />
              </Box>
            )}
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-around" }}>
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={addSchool}
          >
            Save School
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
};

export default AddNewSchool;
