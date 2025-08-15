import httpClient from "@/utils/httpClinet";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSnackbar } from "notistack";

const StudentList = () => {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedRows, setSelectedRows] = useState([]);

  const navigate = useNavigate();

  //add school
  const addStudent = () => {
    navigate("/students/add-student");
  };

  //handle edit user
  const editStudent = (row, tab) => {
    navigate(`/students/edit-student/${row?.id}/${tab}`, {
      state: row,
    });
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
    httpClient
      .delete(`/users/${id}`)
      .then((res) => {
        console.log("delete user res => ", res);
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

  //handle delete bulk users
  const handleBulkDelete = () => {
    console.log("delete bulk users", selectedRows);
    httpClient
      .delete("/student/delete/", {
        params: {
          ids: selectedRows.join(","), // converts [1,2,3] -> "1,2,3"
        },
      })
      .then((res) => {
        console.log("delete bulk users res => ", res);
        enqueueSnackbar("Bulk users deleted successfully", {
          variant: "success",
        });
      })
      .catch((err) => {
        console.log("delete bulk users err => ", err);
        enqueueSnackbar("Error deleting bulk users", {
          variant: "error",
        });
      })
      .finally(() => {
        setSelectedRows([]);
      });
  };

  //datagrid data
  const columns = [
    {
      field: "first_name",
      headerName: "First Name",
      flex: 0.5,
    },
    {
      field: "last_name",
      headerName: "Last Name",
      flex: 0.5,
    },
    {
      field: "school",
      headerName: "School",
      flex: 1,
    },

    {
      field: "class",
      headerName: "Class",
      flex: 0.5,
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => editStudent(params.row, 0)}>Edit</Button>
            <Button onClick={() => editStudent(params.row, 1)}>History</Button>
            <Button>Create Order</Button>
            <Button>Create Ring</Button>
          </>
        );
      },
    },
  ];

  console.log("rows => ", rows);

  useEffect(() => {
    httpClient
      .get(`/student/get-all-students/hj-tampa`)
      .then((res) => {
        console.log("get student res => ", res);
        setLoading(false);
        setRows(
          res?.data?.data?.map((student) => {
            return {
              id: student.schoolID,
              // col1:
              //   paginationModel.page * paginationModel.pageSize + (index + 1),

              first_name: student.firstname || "N/A",
              last_name: student.lastname || "false",
              school: student.school?.school_name || "N/A",
              // orders: student.fullName || "User",
              class: student.class_year || "Not Available",
              // col7: student.phoneNumber || "Not Available",
              // col8: student.updatedAt.substring(0, 10),
            };
          })
        );
      })
      .catch((err) => {
        console.log("get school err => ", err);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
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
            Manage Students
          </Typography>
          <Box>
            {selectedRows.length > 0 && (
              <Button
                variant="contained"
                sx={{ mb: 2, mr: 2, backgroundColor: "red" }}
                onClick={() => handleBulkDelete()}
              >
                Delete Selected Students
              </Button>
            )}
            <Button variant="contained" sx={{ mb: 2 }} onClick={addStudent}>
              Add new Student
            </Button>
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

export default StudentList;
