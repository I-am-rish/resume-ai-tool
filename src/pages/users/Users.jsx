import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSnackbar } from "notistack";
import httpClient from "../../utils/httpClinet";

//DataGrid
// import DataGrid from "../../components/datagrid/DataGrid";

const Users = () => {
  // const [userList, setUserList]= useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [userList, setUserList] = useState([]);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [editData, setEditData] = useState([]);
  const [count, setCount] = useState(1);

  const navigate = useNavigate();

  //handle add user
  const handleAddUser = () => {
    // setOpen(true);
    // setPopupType("Add");
    navigate("/add-user");
  };

  const handleClose = () => {
    setOpen(false);
  };

  //handle edit user
  const handleEditUser = (row) => {
    // console.log("edit user =", row.id);
    navigate(`/edit-user/${row?.id}`);
    // const data = userList.filter((data) => data.userId === row?.id);
    // setEditData(data[0]);
    // setOpen(true);
    // setPopupType("Edit");
  };
  //handle delete user
  const handleDeleteUser = (row) => {
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
        deleteSingleUser(id);
      }
    });
  };

  const deleteSingleUser = (id) => {
    console.log("delete user", id);
    httpClient
      .delete(`/user/delete-user/${id}`)
      .then((res) => {
        console.log("delete user res => ", res);
        enqueueSnackbar("User deleted successfully", {
          variant: "success",
        });
        setCount((count) => count + 1);
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
    { id: 1, field: "username", headerName: "Username", flex: 1 },
    { id: 2, field: "userEmail", headerName: "Useremail", flex: 1 },
    { id: 3, field: "description", headerName: "Description", flex: 1.5 },
    {
      id: 4,
      field: "canManageUsers",
      headerName: "Can Manage Users?",
      flex: 0.7,
    },
    { id: 5, field: "canDelete", headerName: "Can Delete?", flex: 0.5 },
    {
      id: 6,
      field: "canAccessCapsAndGown",
      headerName: "Can Access Caps and Gown?",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.8,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleEditUser(params.row)}>Edit</Button>
            <Button onClick={() => handleDeleteUser(params.row)}>Delete</Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    httpClient
      .get(`/user/get-all-users/hj-tampa`)
      .then((res) => {
        console.log("get users res => ", res);
        setUserList(res?.data?.data);
        setLoading(false);
        setRows(
          res?.data?.data?.map((user) => {
            return {
              id: user.userId,
              // col1:
              //   paginationModel.page * paginationModel.pageSize + (index + 1),

              username: user.username || "N/A",
              userEmail: user.email || "false",
              description: user.description || "N/A",
              canManageUsers: user.can_manage_users === 1 ? "Yes" : "No",
              canDelete: user.can_delete === 1 ? "Yes" : "No",
              canAccessCapsAndGown:
                user.can_access_cap_and_gown_report === 1 ? "Yes" : "No",
            };
          })
        );
      })
      .catch((err) => {
        console.log("get users err => ", err);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [count]);
  return (
    <>
      <Box sx={{ height: "auto", width: "100%", p: 2 }}>
        <Box className="d-flex justify-content-between">
          <Typography variant="h6" gutterBottom>
            Manage Users
          </Typography>
          <Button variant="contained" sx={{ mb: 2 }} onClick={handleAddUser}>
            Add User
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
              // backgroundColor: "#f5f5f5",
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
      {/* <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl" mb={2}>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Close
          </Button>
        </DialogActions>
        <DialogContent dividers>
          <Typography variant="body1">
            Edit User
          </Typography>
        </DialogContent>
        <EditUser type={popupType} editData={editData} />
      </Dialog> */}
    </>
  );
};

export default Users;
