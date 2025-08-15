// import React from "react";

import httpClient from "@/utils/httpClinet";
import { Box, Button, Container, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSnackbar } from "notistack";

const MergedStudent = () => {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  //datagrid data
  const columns = [
    {
      field: "order_date",
      headerName: "Order Date",
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "due",
      headerName: "Due",
      flex: 1,
    },

    {
      field: "total",
      headerName: "Total",
      flex: 0.5,
    },
    {
      field: "paid",
      headerName: "Paid",
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Button>View</Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    // httpClient
    //   .get(`/orders/get-all-orders`)
    //   .then((res) => {
    //     console.log("get student res => ", res);
    //     setLoading(false);
    //     setRows(
    //       res?.data?.data?.map((student) => {
    //         return {
    //           id: student.schoolID,
    //           // col1:
    //           //   paginationModel.page * paginationModel.pageSize + (index + 1),
    //           first_name: student.firstname || "N/A",
    //           last_name: student.lastname || "false",
    //           school: student.school?.school_name || "N/A",
    //           // orders: student.fullName || "User",
    //           class: student.class_year || "Not Available",
    //           // col7: student.phoneNumber || "Not Available",
    //           // col8: student.updatedAt.substring(0, 10),
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
    <Container maxWidth="">
      {/* <Box>
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
      </Box> */}
      <p>no data</p>
    </Container>
  );
};

export default MergedStudent;
