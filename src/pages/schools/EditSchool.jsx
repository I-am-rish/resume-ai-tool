import React, { useEffect, useState } from "react";
import { Box, Button, Container, Tab, Tabs, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import httpClient from "@/utils/httpClinet";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";

import Details from "./Details";
import AnnouncementImage from "./AnnouncementImage";
import Promocodes from "./PromoCodes";
import ShippingMessage from "./ShippingMessage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EditSchool = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isFetching, setIsFetching] = useState(true); // Separate state for fetching
  const [isSaving, setIsSaving] = useState(false); // Separate state for saving
  const [school, setSchool] = useState({
    schoolID: null,
    wid: "hj-tampa",
    school_code: null,
    school_logo: "",
    school_name: "",
    customer_number: "",
    address1: " ",
    address2: "",
    city: "",
    state: "",
    zip: "",
    county: null,
    tax_rate: "",
    active: 0,
    activation_date: null,
    announcement_image: null,
    announcements_require_package: 0,
    show_ring_prices: 0,
    tax_on_shipping: 0,
    charge_shipping_on_capsAnd_gowns: 0,
    NoShippingCharges: 0,
    createdAt: "",
    updatedAt: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

 

  useEffect(() => {
    if (!id) {
      setIsFetching(false);
      enqueueSnackbar("Invalid school ID", { variant: "error" });
      return;
    }

    let isMounted = true;

    setIsFetching(true);
    httpClient
      .get(`/school/get-single-school/${id}`)
      .then((res) => {
        setSchool(res.data.data);
      })
      .catch((err) => {
        console.log("get single school err => ", err);
        enqueueSnackbar("Error fetching school data", { variant: "error" });
      })
      .finally(() => {
        if (isMounted) setIsFetching(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <Container maxWidth="xl" sx={{ marginTop: "2rem" }}>
      <Box
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2,
          backgroundColor: "#fff",
          position: "relative", // Ensure loader overlay works
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ p: 2 }}
        >
          <Typography variant="h6">
            Edit School: {school.school_name || "Loading..."}
          </Typography>
          <Box>
            <Button
              variant="outlined"
              sx={{ mr: 2 }}
              onClick={() => navigate(-1)}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
            {/* <LoadingButton
              variant="contained"
              loading={isSaving}
              onClick={saveSchool}
              disabled={isFetching || isSaving}
            >
              Save School
            </LoadingButton> */}
          </Box>
        </Box>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: "1px solid #ccc", px: 2 }}
        >
          <Tab label="Details" />
          <Tab label="Announcement Image" />
          <Tab label="Promocodes" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {activeTab === 0 && <Details school={school} loading={isFetching} />}
          {activeTab === 1 && <AnnouncementImage school={school} />}
          {activeTab === 2 && <Promocodes school={school} />}
        </Box>
      </Box>
    </Container>
  );
};

export default EditSchool;
