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
import { useNavigate, useParams } from "react-router-dom";
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

const classYears = [
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
];

const EditUser = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    role: "",
    password: "",
    email: "",
    description: "",
    schoolID: null,
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

  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  const handleChange = (field) => (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setFormData({ ...formData, [field]: value });
  };

  // const addUser = () => {
  //   setLoading(true);
  //   httpClient
  //     .post(`/user/create`, formData)
  //     .then(() => {
  //       enqueueSnackbar("User added successfully", { variant: "success" });
  //     })
  //     .catch((err) => {
  //       enqueueSnackbar("Error adding user", { variant: "error" });
  //       console.error(err);
  //     })
  //     .finally(() => setLoading(false));
  // };

  //function to get user data

  const getUser = () => {
    httpClient
      .get(`/user/get-single-user/${params?.id}`)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data?.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUser = () => {
    setLoading(true);
    httpClient
      .patch(`user/update-user/${params.id}`, formData)
      .then(() => {
        //get data and update in local storage for permissions use
        getUser();
        enqueueSnackbar("User updated successfully", { variant: "success" });
      })
      .catch((err) => {
        enqueueSnackbar("Error updating user", { variant: "error" });
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
          // bgcolor: "#fff",
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
        {/* <div className="d-flex justify-content-between"> */}
        <Button variant="contained" sx={{ mb: 2 }} onClick={() => navigate(-1)}>
          <ArrowBackIcon /> Back
        </Button>
        <Typography variant="h5" mb={3}>
          Add New User
        </Typography>
        {/* </div> */}

        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              value={formData.username}
              onChange={handleChange("username")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange("password")}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              width: "15rem",
            }}
          >
            <TextField
              fullWidth
              label="Email"
              value={formData.email}
              onChange={handleChange("email")}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              width: "12rem",
            }}
          >
            <FormControl fullWidth>
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
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              width: "7rem",
            }}
          >
            <FormControl fullWidth>
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
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              width: "50%",
            }}
          >
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
              onClick={updateUser}
              fullWidth
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Save User"
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default EditUser;
