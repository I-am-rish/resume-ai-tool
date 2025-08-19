import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import httpClient from "@/utils/httpClinet";
import { useSnackbar } from "notistack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const roles = [
  "Technical Admin",
  "Office Admin",
  "Office Manager",
  "Office Staff",
  "Superintendent",
  "Principal",
];

// Generate dynamic class years: 5 previous years, current year, and 5 upcoming years
const currentYear = new Date().getFullYear();
const classYears = Array.from({ length: 11 }, (_, i) =>
  (currentYear - 5 + i).toString()
);

const AddUser = () => {
  const [formData, setFormData] = useState({
    wid: "hj-tampa",
    username: "",
    role: "",
    password: "",
    email: "",
    description: "",
    schoolIds: [],
    class_year: "",
    can_access_site_map: false,
    can_manage_users: false,
    can_delete: false,
    can_access_cap_and_gown_report: false,
    can_manage_categories: false,
    can_manage_products: false,
    can_manage_packages: false,
    can_manage_orders: false,
    can_manage_payments: false,
    can_manage_students: false,
    can_manage_schools: false,
    can_use_report_builder: false,
    can_access_standard_report: false,
    can_view_report_by_school: false,
    can_view_report_by_item: false,
    can_manage_wid_reports: false,
    can_access_all_offices: false,
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
    role: "",
    class_year: "",
  });

  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const validateForm = () => {
    const newErrors = {
      username: "",
      password: "",
      email: "",
      role: "",
      class_year: "",
    };
    let isValid = true;

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
      isValid = false;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = "Role is required";
      isValid = false;
    }

    // Class Year validation
    if (!formData.class_year) {
      newErrors.class_year = "Class Year is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    setErrors({ ...errors, [field]: "" });
  };

  const addUser = () => {
    if (!validateForm()) {
      enqueueSnackbar("Please fix the form errors", { variant: "error" });
      return;
    }

    console.log("add user", formData);
    setLoading(true);
    httpClient
      .post(`/user/add-new-user`, formData)
      .then(() => {
        enqueueSnackbar("User added successfully", { variant: "success" });
        navigate(-1);
      })
      .catch((err) => {
        enqueueSnackbar("Error adding user", { variant: "error" });
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setIsFetching(true);
    httpClient
      .get(`/user/get-single-user/${params?.id}`)
      .then((res) => {
        setFormData(res.data?.data);
        console.log("single user res => ", res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [params?.id]);

  const renderPermissionCheckbox = (label, field) => (
    <Grid item xs={12} sm={4} key={field}>
      <FormControlLabel
        control={
          <Checkbox checked={formData[field]} onChange={handleChange(field)} />
        }
        label={label}
      />
    </Grid>
  );

  const permissionFields = [
    ["Can Access Site Map", "can_access_site_map"],
    ["Can Manage Users", "can_manage_users"],
    ["Can Delete", "can_delete"],
    ["Can Access Cap & Gown Report", "can_access_cap_and_gown_report"],
    ["Can Manage Categories", "can_manage_categories"],
    ["Can Manage Products", "can_manage_products"],
    ["Can Manage Packages", "can_manage_packages"],
    ["Can Manage Orders", "can_manage_orders"],
    ["Can Manage Payments", "can_manage_payments"],
    ["Can Manage Students", "can_manage_students"],
    ["Can Manage Schools", "can_manage_schools"],
    ["Can Use Report Builder", "can_use_report_builder"],
    ["Can Access Standard Report", "can_access_standard_report"],
    ["Can View Report by School", "can_view_report_by_school"],
    ["Can View Report by Item", "can_view_report_by_item"],
    ["Can Manage WID Reports", "can_manage_wid_reports"],
    ["Can Access All Offices", "can_access_all_offices"],
  ];

  if (isFetching) {
    return (
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mb: 6 }}>
      <Box
        sx={{
          p: 4,
          border: "1px solid #ccc",
          bgcolor: "#fff",
        }}
      >
        <Button variant="contained" sx={{ mb: 2 }} onClick={() => navigate(-1)}>
          <ArrowBackIcon /> Back
        </Button>
        <Typography variant="h5" mb={3}>
          Add New User
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              value={formData.username}
              onChange={handleChange("username")}
              error={!!errors.username}
              helperText={errors.username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange("password")}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>
          <Grid item xs={12} sx={{ width: "15rem" }}>
            <TextField
              fullWidth
              label="Email"
              value={formData.email}
              onChange={handleChange("email")}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12} sx={{ width: "12rem" }}>
            <FormControl fullWidth error={!!errors.role}>
              <InputLabel>Role</InputLabel>
              <Select
                value={formData.role}
                onChange={handleChange("role")}
                input={<OutlinedInput label="Role" />}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
              {errors.role && (
                <Typography color="error" variant="caption">
                  {errors.role}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ width: "8rem" }}>
            <FormControl fullWidth error={!!errors.class_year}>
              <InputLabel>Class Year</InputLabel>
              <Select
                value={formData.class_year}
                onChange={handleChange("class_year")}
                input={<OutlinedInput label="Class Year" />}
              >
                {classYears.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
              {errors.class_year && (
                <Typography color="error" variant="caption">
                  {errors.class_year}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ width: "50%" }}>
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={handleChange("description")}
              multiline
              minRows={1}
              maxRows={1}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" mt={2} mb={1}>
              Permissions
            </Typography>
            <Grid container spacing={1}>
              {permissionFields.map(([label, field]) =>
                renderPermissionCheckbox(label, field)
              )}
            </Grid>
          </Grid>

          <Grid item xs={12} mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={addUser}
              fullWidth
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Add User"
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AddUser;
