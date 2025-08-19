import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import httpClient from "@/utils/httpClinet";

const Details = ({ school = {}, loading = false }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [saving, setSaving] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [formData, setFormData] = useState({
    school_name: school.school_name || "",
    customer_number: school.customer_number || "",
    address1: school.address1 || "",
    address2: school.address2 || "",
    city: school.city || "",
    state: school.state || "",
    zip: school.zip || "",
    county: school.county || "",
    tax_rate: school.tax_rate || "",
    school_fee: school.school_fee || "0.0",
    announcements_require_package: school.announcements_require_package || 0,
    charge_shipping_on_capsAnd_gowns:
      school.charge_shipping_on_capsAnd_gowns || 0,
    NoShippingCharges: school.NoShippingCharges || 0,
    tax_on_shipping: school.tax_on_shipping || 0,
    school_logo: school.school_logo || null,
  });

  const [errors, setErrors] = useState({
    school_name: "",
    address1: "",
    city: "",
    state: "",
    county: "",
    tax_rate: "",
    school_logo: "",
  });

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.type === "file"
        ? event.target.files?.[0] || null
        : event.target.value;
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    setErrors({ ...errors, [field]: "" });
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          school_logo: "Invalid file type. Use jpg, jpeg, png, or webp.",
        });
        setPreviewUrl(null);
        setFormData({ ...formData, school_logo: null });
        return;
      }

      // Validate file size (100KB = 100 * 1024 bytes)
      // if (file.size > 100 * 1024) {
      //   setErrors({ ...errors, school_logo: "File size exceeds 100KB limit." });
      //   setPreviewUrl(null);
      //   setFormData({ ...formData, school_logo: null });
      //   return;
      // }

      // Set file and preview
      setFormData({ ...formData, school_logo: file });
      setErrors({ ...errors, school_logo: "" });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
      setFormData({ ...formData, school_logo: null });
      setErrors({ ...errors, school_logo: "" });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      school_name: "",
      address1: "",
      city: "",
      state: "",
      county: "",
      tax_rate: "",
      school_logo: "",
    };

    if (!formData.school_name.trim()) {
      newErrors.school_name = "School Name is required";
      isValid = false;
    }
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
    if (!formData.county.trim()) {
      newErrors.county = "County is required";
      isValid = false;
    }
    if (!formData.tax_rate.trim()) {
      newErrors.tax_rate = "Tax Rate is required";
      isValid = false;
    } else if (
      isNaN(formData.tax_rate) ||
      parseFloat(formData.tax_rate) < 0 ||
      !/^\d*\.?\d*$/.test(formData.tax_rate)
    ) {
      newErrors.tax_rate =
        "Tax Rate must be a valid positive number (e.g., 7.00)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const saveSchool = () => {
    if (!school.schoolID) {
      enqueueSnackbar("School ID is missing", { variant: "error" });
      return;
    }

    if (!validateForm()) {
      enqueueSnackbar("Please fill all required fields correctly", {
        variant: "error",
      });
      return;
    }

    setSaving(true);
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        payload.append(key, value);
      }
    });

    console.log("save school payload logo => ", payload.get("school_logo"));

    httpClient
      .patch(`/school/update-school/${school.schoolID}`, payload)
      .then((res) => {
        console.log("save school res => ", res);
        enqueueSnackbar("School saved successfully", { variant: "success" });
        window.history.back();
      })
      .catch((err) => {
        console.log("save school err => ", err);
        enqueueSnackbar("Error saving school", { variant: "error" });
      })
      .finally(() => {
        setSaving(false);
      });
  };

  useEffect(() => {
    setFormData((prevData) => {
      const newData = { ...prevData };
      if (school.school_name !== undefined)
        newData.school_name = school.school_name || "";
      if (school.customer_number !== undefined)
        newData.customer_number = school.customer_number || "";
      if (school.address1 !== undefined)
        newData.address1 = school.address1 || "";
      if (school.address2 !== undefined)
        newData.address2 = school.address2 || "";
      if (school.city !== undefined) newData.city = school.city || "";
      if (school.state !== undefined) newData.state = school.state || "";
      if (school.zip !== undefined) newData.zip = school.zip || "";
      if (school.county !== undefined) newData.county = school.county || "";
      if (school.tax_rate !== undefined)
        newData.tax_rate = school.tax_rate || "";
      if (school.school_fee !== undefined)
        newData.school_fee = school.school_fee || "0.0";
      if (school.announcements_require_package !== undefined)
        newData.announcements_require_package =
          school.announcements_require_package || 0;
      if (school.charge_shipping_on_capsAnd_gowns !== undefined)
        newData.charge_shipping_on_capsAnd_gowns =
          school.charge_shipping_on_capsAnd_gowns || 0;
      if (school.NoShippingCharges !== undefined)
        newData.NoShippingCharges = school.NoShippingCharges || 0;
      if (school.tax_on_shipping !== undefined)
        newData.tax_on_shipping = school.tax_on_shipping || 0;
      if (
        school.school_logo !== undefined &&
        !(prevData.school_logo instanceof File)
      ) {
        newData.school_logo = school.school_logo || null;
        setPreviewUrl(school.school_logo || null);
      }
      return newData;
    });
  }, [school]);

  return (
    <>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
        Basic Information
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              label="School Name"
              value={formData.school_name}
              onChange={handleChange("school_name")}
              error={!!errors.school_name}
              helperText={errors.school_name}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Customer Number"
              value={formData.customer_number}
              onChange={handleChange("customer_number")}
            />
          </Grid>

          <Grid item xs={6}>
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
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Address 2"
              value={formData.address2}
              onChange={handleChange("address2")}
            />
          </Grid>

          <Grid item xs={6}>
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
          <Grid item xs={3}>
            <TextField
              fullWidth
              required
              label="State"
              value={formData.state}
              onChange={handleChange("state")}
              error={!!errors.state}
              helperText={errors.state}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="Zip Code"
              value={formData.zip}
              onChange={handleChange("zip")}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              label="County"
              value={formData.county}
              onChange={handleChange("county")}
              error={!!errors.county}
              helperText={errors.county}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              required
              label="Tax Rate (e.g., 6.50 or 7.00)"
              value={formData.tax_rate}
              onChange={handleChange("tax_rate")}
              error={!!errors.tax_rate}
              helperText={errors.tax_rate}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="School Fee"
              value={formData.school_fee}
              onChange={handleChange("school_fee")}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!formData.charge_shipping_on_capsAnd_gowns}
                  onChange={handleChange("charge_shipping_on_capsAnd_gowns")}
                />
              }
              label="Charge Tax on Shipping & Handling"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!formData.NoShippingCharges}
                  onChange={handleChange("NoShippingCharges")}
                />
              }
              label="No Shipping on Cap and Gown Only Orders"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!formData.tax_on_shipping}
                  onChange={handleChange("tax_on_shipping")}
                />
              }
              label="Free Shipping For All Products"
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              School Logo
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
              (jpg, jpeg, png, webp images only) <br />
              (Maximum File Size: 100KB)
            </Typography>
            {errors.school_logo && (
              <Typography
                variant="caption"
                color="error"
                display="block"
                sx={{ mb: 1 }}
              >
                {errors.school_logo}
              </Typography>
            )}
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
      )}
      {saving && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <LoadingButton
          variant="contained"
          loading={saving}
          onClick={saveSchool}
          disabled={loading || saving}
        >
          Save School
        </LoadingButton>
      </Box>
    </>
  );
};

export default Details;
