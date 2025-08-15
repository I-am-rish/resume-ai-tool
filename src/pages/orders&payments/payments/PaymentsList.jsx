// import React from "react";

import httpClient from "@/utils/httpClinet";
import { Box, Button, Divider, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSnackbar } from "notistack";

//DataGrid
// import DataGrid from "../../components/datagrid/DataGrid";

const PaymentsList = () => {
  // const [userList, setUserList]= useState([]);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedRows, setSelectedRows] = useState([]);

  const navigate = useNavigate();

  //add school
  const addStudent = () => {
    // navigate("/add-student");
  };

  //handle edit user
  const editStudent = (row) => {
    console.log("edit user");
    // navigate(`/edit-school/${row?.id}`);
  };
  //handle delete user
  const deleteStudent = (row) => {
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
        deleteSingleStudent(id);
      }
    });
  };

  const deleteSingleStudent = (id) => {
    console.log("delete user", id);
    // httpClient
    //   .delete(`/users/${id}`)
    //   .then((res) => {
    //     console.log("delete user res => ", res);
    //     enqueueSnackbar("User deleted successfully", {
    //       variant: "success",
    //     });
    //   })
    //   .catch((err) => {
    //     console.log("delete user err => ", err);
    //     enqueueSnackbar("Error deleting user", {
    //       variant: "error",
    //     });
    //   });
  };

  //handle delete bulk users
  const handleBulkDelete = () => {
    console.log("delete bulk users", selectedRows);
    // httpClient
    //   .delete("/student/delete/", {
    //     params: {
    //       ids: selectedRows.join(","), // converts [1,2,3] -> "1,2,3"
    //     },
    //   })
    //   .then((res) => {
    //     console.log("delete bulk users res => ", res);
    //     enqueueSnackbar("Bulk users deleted successfully", {
    //       variant: "success",
    //     });
    //   })
    //   .catch((err) => {
    //     console.log("delete bulk users err => ", err);
    //     enqueueSnackbar("Error deleting bulk users", {
    //       variant: "error",
    //     });
    //   })
    //   .finally(() => {
    //     setSelectedRows([]);
    //   });
  };

  //datagrid data
  const columns = [
   
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "school",
      headerName: "School",
      flex: 1.5,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },

    {
      field: "amount",
      headerName: "Amount",
      flex: 0.5,
    },
    {
      field: "card",
      headerName: "Card",
      flex: 0.5,
    },
    {
      field: "AuthCode",
      headerName: "AuthCode",
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
    },
    {
      field: "Date",
      headerName: "Date",
      flex: 0.5,
    },

    
  ];


  useEffect(() => {
    // httpClient
    //   .get(`/category/get-all-category/hj-tampa`)
    //   .then((res) => {
    //     console.log("get categories res => ", res);
    //     setLoading(false);
    //     setRows(
    //       res?.data?.data?.map((category) => {
    //         return {
    //           id: category.categoryID,
    //           // col1:
    //           //   paginationModel.page * paginationModel.pageSize + (index + 1),

    //           categoryImage: category.categoryImage || "N/A",
    //           categoryName: category.categoryName || "N/A",
    //           description: category.description || "false",
    //           isDeleted: category.isDeleted || "N/A",
    //           visible: category.visible || "N/A",
    //           isPackage: category.isPackage || "N/A",
    //           isSchoolSelected: category.isSchoolSelected || "N/A",
    //         };
    //       })
    //     );
    //   })
    //   .catch((err) => {
    //     console.log("get school err => ", err);
    //     setLoading(false);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }, []);

  return (
    <>
      <Box
        sx={{
          height: "auto",
          width: "100%",
          m: 2,
          p: 2,

          pb: 10,
        }}
      >
        <Box sx={{ mb: 2 }} className="d-flex justify-content-between">
          <Typography variant="h6" gutterBottom>
            Manage Online Payments
          </Typography>
          <Box>
            
            {/* <Button variant="contained" sx={{ mb: 2 }} onClick={addStudent}>
              Add new Category
            </Button> */}
          </Box>
        </Box>
        <DataGrid
          // autoHeight
          checkboxSelection
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
          onRowSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
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

export default PaymentsList;
