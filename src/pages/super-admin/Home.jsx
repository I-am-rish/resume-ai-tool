import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Link,
  Paper,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import adminHttpClient from "@/utils/adminHttpClient";

const TechnicalDashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [total, setTotal] = useState(0);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state

  const fetchClients = async (page, rowsPerPage) => {
    setLoading(true); // Start loading
    try {
      const res = await adminHttpClient.get(
        `/super-admin/dashboard/get-all-clients?page=${
          page + 1
        }&pageSize=${rowsPerPage}`
      );
      setRows(res.data?.data?.clients || []);
      setTotal(res.data?.data?.total || 0);
    } catch (err) {
      console.error("Error fetching clients:", err);
      setRows([]);
      setTotal(0);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchClients(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
        Client Backoffices
      </Typography>

      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Client ID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Client</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>WID</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Domain</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Payment Gateway</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Shipping</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <CircularProgress size={30} />
                </TableCell>
              </TableRow>
            ) : rows.length > 0 ? (
              rows.map((c) => (
                <TableRow key={c.clientID}>
                  <TableCell>{c.clientID}</TableCell>
                  <TableCell>{c.client}</TableCell>
                  <TableCell>{c.wid}</TableCell>
                  <TableCell>
                    {c.domain ? (
                      <Link
                        // href={`https://${c.domain}`}
                        href={`http://44.195.125.80:9760/dashboard`}
                        // target="_blank"
                        rel="noopener"
                        sx={{
                          color: "primary.main",
                          textDecoration: "underline",
                        }}
                      >
                        {c.domain}
                      </Link>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>{c.paymentgateway || "-"}</TableCell>
                  <TableCell>{c.shipping}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[3, 5, 10]}
        />
      </Paper>
    </Box>
  );
};

export default TechnicalDashboard;
