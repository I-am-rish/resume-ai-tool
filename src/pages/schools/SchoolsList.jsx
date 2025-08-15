// import React from "react";

import httpClient from "@/utils/httpClinet";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSnackbar } from "notistack";

const SchoolsList = () => {
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [rows, setRows] = useState([]);

  const navigate = useNavigate();

  //add school
  const addSchool = () => {
    navigate("/schools/add-school");
  };

  //handle edit user
  const handleEditSchool = (row) => {
    navigate(`/schools/edit-school/${row?.id}`);
  };
  //handle delete user
  const handleDeleteSchool = (row) => {
    console.log("delete user", row?.id);
    confirmBeforeDelete(row?.id);
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
        deleteSchool(id);
      }
    });
  };

  const deleteSchool = (id) => {
    console.log("delete user", id);
    httpClient
      .delete(`/users/${id}`)
      .then((res) => {
        // console.log("delete user res => ", res);
        enqueueSnackbar("User deleted successfully", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log("delete user err => ", err);
        enqueueSnackbar("Error deleting user", {
          variant: "error",
        });
      });
  };

  //datagrid data
  const columns = [
    {
      field: "logo",
      headerName: " Logo",
      flex: 0.5,
      renderCell: (params) => {
        // console.log("params => ", params);
        return (
          params.formattedValue && (
            <img
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                objectFit: "cover",
                cursor: "pointer",
              }}
              src={params.row?.logo}
              alt="logo"
            />
          )
        );
      },
    },
    { field: "school_code", headerName: "School Code", flex: 0.5 },
    { field: "school", headerName: "School", flex: 1.4 },
    {
      field: "show_ring_prices",
      headerName: "Show Ring Prices",
      flex: 0.6,
    },
    {
      field: "tax_on_shipping",
      headerName: "Tax On Shipping",
      flex: 0.6,
    },
    {
      field: "NoShippingCharges",
      headerName: "No Shipping Charges",
      flex: 0.6,
    },

    {
      field: "city",
      headerName: "City",
      flex: 0.7,
    },
    {
      field: "zip",
      headerName: "Zip",
      flex: 0.4,
    },

    {
      field: "Active",
      headerName: "Active",
      flex: 0.5,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleEditSchool(params.row)}>Edit</Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    httpClient
      .get("/school/get-all-school/hj-tampa")
      .then((res) => {
        setRows(
          res?.data?.data?.map((school) => {
            return {
              id: school?.schoolID,
              logo: school?.school_logo || "N/A",
              school_code: school?.school_code || "N/A",
              school: school?.school_name,
              show_ring_prices: school?.show_ring_prices === 1 ? "Yes" : "No",
              tax_on_shipping: school?.tax_on_shipping === 1 ? "Yes" : "No",
              NoShippingCharges:
                school?.no_shipping_charges === 1 ? "Yes" : "No",
              city: school?.city,
              zip: school?.zip,
            };
          })
        );
      })
      .catch((err) => {
        console.log("get school err => ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Box sx={{ height: "auto", width: "100%", p: 2, pb: 10 }}>
        <Box sx={{ mb: 2 }} className="d-flex justify-content-between">
          <Typography variant="h6" gutterBottom>
            Manage schools
          </Typography>
          <Button variant="contained" sx={{ mb: 2 }} onClick={addSchool}>
            Add new school
          </Button>
        </Box>
        <DataGrid
          // autoHeight
          rows={rows}
          columns={columns}
          loading={loading}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          disableSelectionOnClick
          disableRowSelectionOnClick
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          sx={{
            "& .MuiDataGrid-virtualScroller": {
              outline: "none !important",
              backgroundColor: "#ffff !important",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              fontWeight: "bold",
              outline: "none !important",
            },
            "& .MuiDataGrid-columnHeader": {
              outline: "none !important",
            },
            "& .MuiDataGrid-cell": {
              outline: "none !important",
            },
          }}
        />
      </Box>
    </>
  );
};

export default SchoolsList;
