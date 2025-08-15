import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  Container,
  Button,
} from "@mui/material";
import EditStudent from "./EditStudent";
import OrderHistory from "./orderhistory/OrderHistory";
import MergedStudent from "./MergedStudent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useParams } from "react-router-dom";

const StudentContainer = () => {
  const { id, tab } = useParams();
  console.log("params => ", id, tab);
  const [tabValue, setTabValue] = useState(Number(tab) || 0);

  const location = useLocation();
  console.log("location => ", location.state);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="" sx={{ p: { xs: 1, sm: 2 } }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3 },
          width: "100%",
          borderRadius: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontSize: { xs: "1rem", sm: "1.25rem" },
              // fontWeight: "bold",
              color: "#505da7",
            }}
          >
            {location.state &&
              location.state.first_name +
                " " +
                location.state.last_name +
                " " +
                "of" +
                " " +
                location.state.school}
          </Typography>
          <Button
            variant="contained"
            //back
            onClick={() => {
              window.history.back();
            }}
          >
            <ArrowBackIcon />
            Back
          </Button>
        </Box>

        {/* Tabs */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: { xs: "0.85rem", sm: "1rem" },
            },
          }}
        >
          <Tab label="Student Details" />
          <Tab label="Order History" />
          <Tab label="Merged Students" />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ mt: 2, width: "100%" }}>
          {tabValue === 0 && (
            <Box sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }}>
              <EditStudent />
            </Box>
          )}
          {tabValue === 1 && (
            <Box sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }}>
              <OrderHistory />
            </Box>
          )}
          {tabValue === 2 && (
            <Box sx={{ fontSize: { xs: "0.85rem", sm: "1rem" } }}>
              <MergedStudent />
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default StudentContainer;
