import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Logo from "../../../../public/assets/images/HJ_logos.jpg";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const handleNavClick = (section) => {
    // Scroll to section or handle navigation logic
    console.log(`Navigating to: ${section}`);
    window.location.hash = section;
  };
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const date = new Date("2025-08-20");

  // Option 1: Using toLocaleDateString with options
  const currentDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  //   const handleLogout = async () => {
  //     try {
  //       const response = await fetch("/api/logout", {
  //         method: "POST",
  //         credentials: "include", // include cookies if needed
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       });
  //       if (response.ok) {
  //         console.log("Logout successful");
  //         window.location.href = "/login"; // redirect to login page
  //       } else {
  //         console.error("Logout failed");
  //       }
  //     } catch (error) {
  //       console.error("Error logging out:", error);
  //     }
  //   };

  return (
    <AppBar
      position="sticky"
      color="default"
      style={{ backgroundColor: "#000" }}
    >
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* Logo */}
        <Typography variant="h6" style={{ color: "#fff" }}>
          <img
            src={Logo}
            alt="Herff Jones"
            style={{ height: "40px", backgroundColor: "black" }}
          />
        </Typography>

        {/* Center Nav Links */}
        <Box
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Button
            style={{ color: "#fff" }}
            onClick={() => handleNavClick("manage-domain")}
          >
            Manage Domain
          </Button>
          <Button
            style={{ color: "#fff" }}
            onClick={() => handleNavClick("manage-sitemap")}
          >
            Manage Sitemap
          </Button>
        </Box>

        {/* User Info & Logout */}
        <Box style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Typography variant="body1" style={{ color: "#fff" }}>
            Welcome, {user?.username} | {currentDate}
          </Typography>
          <Button
            style={{ color: "#fff" }}
            onClick={() => {
              navigate("/authentication/login");
              localStorage.clear();
              window.location.reload();
            }}
          >
            Log Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;
