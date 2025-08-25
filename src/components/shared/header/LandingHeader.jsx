import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Apply custom font by importing Google Fonts
// In your index.html or _document.js, add:
// <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background:
            "linear-gradient(90deg, #eef0f5 0%, #e9ebf0 50%, #f6f8fc 100%)",
          color: "white",
          top: 0,
          zIndex: 1100,
          fontFamily: "'Poppins', sans-serif",
          padding: "0px 100px"
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left: Logo + Title */}
          <Box display="flex" alignItems="center">
            {/* Dummy Logo using MUI Avatar */}
            <Avatar
              src="https://dummyimage.com/40x40/6366f1/ffffff&text=AI"
              alt="AI Power Logo"
              sx={{ mr: 1, bgcolor: "primary.main", fontSize: 14 }}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}
            >
              CareerAI
            </Typography>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            <Button
              sx={{
                color: "#000000",
                textTransform: "none",
                fontFamily: "'Poppins', sans-serif",
                border: "2px solid transparent",
                borderRadius: "8px",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #5d7de4 0%, #a04ee4 100%)",
                  color: "white",
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 15px rgba(34,197,94,0.5)",
                },
              }}
            >
              Sign In
            </Button>
            <Button
              variant="contained"
              sx={{
                background: "linear-gradient(90deg, #3b82f6 0%, #9333ea 100%)",
                textTransform: "none",
                borderRadius: "8px",
                fontFamily: "'Poppins', sans-serif",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 4px 15px rgba(147,51,234,0.5)",
                },
              }}
            >
              Get Started
            </Button>
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            edge="end"
            color="inherit"
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
            height: "100%",
            color: "white",
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button>
              <ListItemText primary="Sign In" />
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(90deg, #3b82f6 0%, #9333ea 100%)",
                  textTransform: "none",
                  borderRadius: "8px",
                  fontFamily: "'Poppins', sans-serif",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 4px 15px rgba(147,51,234,0.5)",
                  },
                }}
              >
                Get Started
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
