import React, { useState } from "react";
import {
  TextField,
  Switch,
  FormControlLabel,
  Typography,
  Grid,
  Box,
  Container,
} from "@mui/material";

const MyAccount = () => {
  const [formData, setFormData] = useState({
    username: "staff@123",
    role: "Office staff",
    password:
      "$argon2id$v=19$m=65536,t=3,p=4$U4aUy+qvgbJ2uYMT8bhGmQ$+QHqjqPPuYBfJv9hr+SPOdbbZ1gsYO6KldqkeYvY+KA",
    email: "staff@yopmail.com",
    description:
      "This is the office manager who has ability to manage users and delete users",
    schoolID: null,
    class_year: "2025",
    can_access_site_map: 0,
    can_manage_users: 0,
    can_delete: 1,
    can_access_cap_and_gown_report: 1,
    can_manage_categories: 1,
    can_manage_products: 0,
    can_manage_packages: 1,
    can_manage_orders: 1,
    can_manage_payments: 0,
    can_manage_students: 1,
    can_manage_schools: 1,
    can_use_report_builder: 0,
    can_access_standard_report: 0,
    can_view_report_by_school: 0,
    can_view_report_by_item: 0,
    can_manage_wid_reports: 1,
    can_access_all_offices: 0,
  });

  //   const handleChange = (field, value) => {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [field]: value,
  //     }));
  //   };

  //   const handleToggle = (field) => {
  //     setFormData((prev) => ({
  //       ...prev,
  //       [field]: prev[field] ? 0 : 1,
  //     }));
  //   };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log("Form Data:", formData);
  //   };

  return (
    <Container maxWidth="xl" sx={{ p: 5, backgroundColor: "#f5f8f5" }}>
      <Typography variant="h5" gutterBottom marginBottom={4}>
        My Profile
      </Typography>
      <Box component="form">
        <Grid container spacing={2}>
          {/* Text fields */}
          {["username", "role", "email", "class_year", "description"].map(
            (field) => (
              <Grid
                item
                xs={12}
                sm={field === "description" ? 12 : 6}
                key={field}
              >
                <TextField
                  fullWidth
                  label={field.replace(/_/g, " ").toUpperCase()}
                  value={formData[field] || ""}
                  //   onChange={(e) => handleChange(field, e.target.value)}
                  multiline={field === "description"}
                  rows={field === "description" ? 1 : 1}
                  sx={{
                    width: field === "description" ? "50vw" : 1,
                    
                  }}
                  disabled
                />
              </Grid>
            )
          )}

          {/* Boolean switches */}
          {Object.keys(formData)
            .filter((key) => key.startsWith("can_"))
            .map((field) => (
              <Grid item xs={12} sm={6} key={field}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={!!formData[field]}
                      //   onChange={() => handleToggle(field)}
                      color="primary"
                    />
                  }
                  label={field.replace(/_/g, " ").toLowerCase()}
                  //   disabled
                />
              </Grid>
            ))}

          {/* <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
          </Grid> */}
        </Grid>
      </Box>
    </Container>
  );
};

export default MyAccount;
