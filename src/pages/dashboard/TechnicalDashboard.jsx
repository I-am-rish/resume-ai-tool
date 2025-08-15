import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Link,
} from "@mui/material";

const TechnicalDashboard = () => {
  const backoffices = [
    { name: "gradproinc.com", location: "Aimee Kline" },
    { name: "www.gradpro-herffjones.com", location: "AL, Dothan" },
    { name: "www.herffai.com", location: "AR, Little Rock" },
    { name: "www.41grad.com", location: "ATL, Grand" },
    { name: "www.hjgradstore.com", location: "CA, Anaheim" },
    { name: "www.hjgradstop.com", location: "CA, Danville" },
    { name: "www.gradservice.com", location: "CA, Los Angeles" },
    { name: "www.uniquerecognition.com", location: "CA, Sacramento" },
    { name: "Corporate Admin", location: "CO, Loveland" },
    { name: "www.hjboward.com", location: "FL, Davie" },
    { name: "www.gradproinc07302024.com", location: "FL, Fort Myers" },
    { name: "www.herffjonesnorthflorida.com", location: "FL, Jacksonville" },
    { name: "www.herffjonesmiami.com", location: "FL, Miami" },
    { name: "www.herffjonesorlando.com", location: "FL, Orlando" },
    { name: "www.herffjonespalmbeach.com", location: "FL, Palm Beach" },
    { name: "www.herffjonesofnorthflorida.com", location: "FL, Pensacola" },
    { name: "www.herffjonesstpete.com", location: "FL, St. Petersburg" },
    { name: "www.herffjonestampabay.com", location: "FL, Tampa" },
    { name: "www.hjgradorder.com", location: "FL, Grad Order" },
    { name: "www.herffjoneswestcentral.com", location: "GA, West Central" },
    { name: "www.herffjonesathens.com", location: "GA, Athens" },
    { name: "www.herffjonesatlanta.com", location: "GA, Atlanta" },
    { name: "www.herffjonesgrad.com", location: "GA, Lilburn" },
    { name: "www.herffjonesstatesboro.com", location: "GA, Statesboro" },
    { name: "www.herffjoneswga.com", location: "GA, Tifton" },
    { name: "www.hjgraduates.com", location: "Gradpro Recognition Products" },
    { name: "www.hjgrad.com", location: "ID, Idaho Falls" },
    { name: "www.herffjonesil07302024.com", location: "IL, Dekalb" },
    { name: "herffonesil.com", location: "Illinois" },
    { name: "vaschoolservice.com", location: "John" },
    { name: "www.gradservicesmstn.com", location: "JS HJ Test" },
    { name: "www.gradsouth.com", location: "MS, Grad MSTN" },
    { name: "www.ncgradhj.com", location: "MS, Grad South" },
    { name: "www.gradproproducts.com", location: "NC, Burlington" },
  ];

  return (
    <Box
      sx={{
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        // minHeight: "100vh",
        padding: 2,
      }}
    >
      <Box >
        <Typography
          variant="h5"
          gutterBottom
        //   align="center"
          sx={{ fontWeight: "bold", color: "#333" }}
        >
          You have access to more than one backoffice. Choose wisely:
        </Typography>
        <Table sx={{ borderCollapse: "separate", borderSpacing: 0 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell
                // align="center"
                sx={{ fontWeight: "bold", borderBottom: "none" }}
              >
                Name
              </TableCell>
              <TableCell
                // align="center"
                sx={{ fontWeight: "bold", borderBottom: "none" }}
              >
                Location
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {backoffices.map((office, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { borderBottom: 0 } }}
              >
                <TableCell align="left">
                  <Link
                    href={`https://${office.name}`}
                    target="_blank"
                    rel="noopener"
                    sx={{ color: "#1976d2", textDecoration: "underline" }}
                  >
                    {office.name}
                  </Link>
                </TableCell>
                <TableCell align="left">
                  <Link
                    href={`https://${office.name}`}
                    target="_blank"
                    rel="noopener"
                    sx={{ color: "#1976d2", textDecoration: "underline" }}
                  >
                    {office.location}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default TechnicalDashboard;
