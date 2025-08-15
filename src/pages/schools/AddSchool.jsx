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
import httpClient from "@/utils/httpClinet";
import { useSnackbar } from "notistack";

const AddNewSchool = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    schoolName: "",
    schoolCode: "",
    customerNumber: "",
    address1: "",
    address2: " ",
    city: "",
    state: "",
    zip: "",
    county: "",
    taxRate: "",
    feeLabel: "",
    schoolFee: "",
    announcementsRequirePackage: false,
    chargeTax: false,
    noShipping: false,
    freeShipping: false,
    logo: null,
  });

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData({ ...formData, [field]: value });
  };

  const addSchool = async () => {
    setLoading(true);
    try {
      console.log("Submitting school:", formData);
      let fData = new FormData();
      fData.append("school_name", formData.schoolName);
      fData.append("school_code", formData.schoolCode);
      fData.append("customer_number", formData.customerNumber);
      fData.append("address1", formData.address1);
      fData.append("address2", formData.address2);
      fData.append("city", formData.city);
      fData.append("state", formData.state);
      fData.append("zip", formData.zip);
      fData.append("county", formData.county);
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

      // Simulate API call (replace with real API call)
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      // enqueueSnackbar("School added successfully", {
      //   variant: "success",
      // });

      // On success
      // setLoading(false);
      // navigate(-1); // Redirect to schools list
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
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="School Code"
              value={formData.schoolCode}
              onChange={handleChange("schoolCode")}
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
              label="Address 1"
              value={formData.address1}
              onChange={handleChange("address1")}
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
              label="City"
              value={formData.city}
              onChange={handleChange("city")}
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              fullWidth
              label="State- like CA, NY, etc."
              value={formData.state}
              onChange={handleChange("state")}
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
              label="County"
              value={formData.county}
              onChange={handleChange("county")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Tax Rate (e.g., 7.00)"
              value={formData.taxRate}
              onChange={handleChange("taxRate")}
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.announcementsRequirePackage}
                    onChange={handleChange("announcementsRequirePackage")}
                  />
                }
                label="Announcements Require Package"
              />
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
                onChange={(e) =>
                  setFormData({ ...formData, logo: e.target.files[0] })
                }
              />
            </Button>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              (jpg, jpeg, png, webp only — Max: 100KB)
            </Typography>
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
