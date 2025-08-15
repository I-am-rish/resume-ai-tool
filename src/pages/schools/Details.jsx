import httpClient from "@/utils/httpClinet";
import { LoadingButton } from "@mui/lab";
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
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

const Details = ({ school = {}, loading = false }) => {
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
    school_logo: school.school_logo || null, // Changed from school_logo to logo
  });

  const [saving, setSaving] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.type === "file"
        ? event.target.files?.[0] || null
        : event.target.value;
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const saveSchool = () => {
    if (!school.schoolID) {
      enqueueSnackbar("School ID is missing", { variant: "error" });
      return;
    }

    setSaving(true);
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        payload.append(key, value);
      }
    });

    // Log the logo to verify
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

  // Sync formData with school prop when it changes, preserving file input
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
      // Only update logo if it's not a file (preserve user-selected file)
      if (
        school.school_logo !== undefined &&
        !(prevData.school_logo instanceof File)
      )
        newData.school_logo = school.school_logo || null;
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
              label="Address 1"
              value={formData.address1}
              onChange={handleChange("address1")}
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
              label="City"
              value={formData.city}
              onChange={handleChange("city")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              label="State"
              value={formData.state}
              onChange={handleChange("state")}
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
              label="County"
              value={formData.county}
              onChange={handleChange("county")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Tax Rate (e.g., 6.50 or 7.00)"
              value={formData.tax_rate}
              onChange={handleChange("tax_rate")}
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
                  checked={!!formData.announcements_require_package}
                  onChange={handleChange("announcements_require_package")}
                />
              }
              label="Announcements Require Package"
            />
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
                onChange={handleChange("school_logo")} // Changed from school_logo to logo
              />
            </Button>
            <Typography variant="caption" display="block" gutterBottom>
              (jpg, jpeg, png, webp images only) <br />
              (Maximum File Size: 100KB)
            </Typography>
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
          loading={saving} // Use saving for the button loader
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
