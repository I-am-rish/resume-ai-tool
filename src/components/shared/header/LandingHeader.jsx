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
  Divider,
  useTheme,
  alpha,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          color: theme.palette.text.primary,
          top: 0,
          zIndex: 1100,
          fontFamily: "'Poppins', sans-serif",
          px: { xs: 2, sm: 4, md: 6, lg: 8 },
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          {/* Left: Logo + Title */}
          <Box display="flex" alignItems="center">
            <motion.div
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Avatar
                src="https://dummyimage.com/40x40/6366f1/ffffff&text=AI"
                alt="AI Power Logo"
                sx={{
                  mr: 1.5,
                  bgcolor: theme.palette.primary.main,
                  width: 42,
                  height: 42,
                  boxShadow: "0 4px 10px rgba(99, 102, 241, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 6px 15px rgba(99, 102, 241, 0.5)",
                    transform: "scale(1.05)",
                  },
                }}
              />
            </motion.div>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
                background: "linear-gradient(90deg, #4F46E5, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.5px",
              }}
            >
              CareerAI
            </Typography>
          </Box>

          {/* Desktop Menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 2,
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                color: theme.palette.text.primary,
                textTransform: "none",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 500,
                fontSize: "0.95rem",
                border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                borderRadius: "12px",
                px: 3,
                py: 1,
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                },
              }}
              onClick={() => navigate("/authentication/login")}
            >
              Sign In
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                sx={{
                  background: "linear-gradient(90deg, #4F46E5, #8B5CF6)",
                  textTransform: "none",
                  borderRadius: "12px",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  px: 3.5,
                  py: 1,
                  boxShadow: "0 4px 15px rgba(79, 70, 229, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(79, 70, 229, 0.4)",
                    transform: "translateY(-2px)",
                  },
                }}
                onClick={() => navigate("/authentication/login")}
              >
                Get Started
              </Button>
            </motion.div>
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            edge="end"
            color="inherit"
            sx={{
              display: { xs: "flex", md: "none" },
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
              },
            }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            fontFamily: "'Poppins', sans-serif",
            background: "linear-gradient(180deg, #0F172A 0%, #1E293B 100%)",
            color: "white",
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            boxShadow: "-5px 0 15px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              src="https://dummyimage.com/40x40/6366f1/ffffff&text=AI"
              alt="AI Power Logo"
              sx={{ mr: 1.5, bgcolor: theme.palette.primary.main }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
                background: "linear-gradient(90deg, #4F46E5, #8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              CareerAI
            </Typography>
          </Box>
          <IconButton onClick={toggleDrawer(false)} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.1)" }} />

        <Box sx={{ p: 2 }}>
          <List>
            <ListItem
              button
              sx={{
                borderRadius: 2,
                mb: 1,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.15),
                },
              }}
            >
              <ListItemText
                primary="Sign In"
                primaryTypographyProps={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                }}
              />
            </ListItem>

            <ListItem sx={{ py: 1 }}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  background: "linear-gradient(90deg, #4F46E5, #8B5CF6)",
                  textTransform: "none",
                  borderRadius: "12px",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  py: 1.2,
                  boxShadow: "0 4px 15px rgba(79, 70, 229, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(79, 70, 229, 0.4)",
                    transform: "translateY(-2px)",
                  },
                }}
                onClick={() => navigate("/authentication/login")}
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

// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Box,
//   Avatar,
//   Divider,
//   useTheme,
//   alpha,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import { motion } from "framer-motion";

// const Navbar = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   const theme = useTheme();

//   const toggleDrawer = (open) => () => {
//     setDrawerOpen(open);
//   };

//   return (
//     <>
//       <AppBar
//         position="sticky"
//         elevation={0}
//         sx={{
//           background: "rgba(15, 23, 42, 0.8)",
//           backdropFilter: "blur(10px)",
//           borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
//           color: "#FFFFFF",
//           top: 0,
//           zIndex: 1100,
//           fontFamily: "'Poppins', sans-serif",
//           px: { xs: 2, sm: 4, md: 6, lg: 8 },
//           boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
//           transition: "all 0.3s ease",
//         }}
//       >
//         <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
//           {/* Left: Logo + Title */}
//           <Box display="flex" alignItems="center">
//             <motion.div
//               whileHover={{ rotate: 10 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               <Avatar
//                 src="https://dummyimage.com/40x40/6366f1/ffffff&text=AI"
//                 alt="AI Power Logo"
//                 sx={{
//                   mr: 1.5,
//                   bgcolor: theme.palette.primary.main,
//                   width: 42,
//                   height: 42,
//                   boxShadow: "0 4px 10px rgba(99, 102, 241, 0.5)",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     boxShadow: "0 6px 15px rgba(99, 102, 241, 0.7)",
//                     transform: "scale(1.05)",
//                   },
//                 }}
//               />
//             </motion.div>
//             <Typography
//               variant="h5"
//               sx={{
//                 fontWeight: 700,
//                 fontFamily: "'Poppins', sans-serif",
//                 background: "linear-gradient(90deg, #FFFFFF, #E2E8F0)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 letterSpacing: "-0.5px",
//                 textShadow: "0 0 30px rgba(79, 70, 229, 0.5)",
//               }}
//             >
//               CareerAI
//             </Typography>
//           </Box>

//           {/* Desktop Menu */}
//           <Box
//             sx={{
//               display: { xs: "none", md: "flex" },
//               gap: 2,
//               alignItems: "center",
//             }}
//           >
//             <Button
//               sx={{
//                 color: "#E2E8F0",
//                 textTransform: "none",
//                 fontFamily: "'Poppins', sans-serif",
//                 fontWeight: 500,
//                 fontSize: "0.95rem",
//                 border: `2px solid ${alpha(theme.palette.primary.main, 0.3)}`,
//                 borderRadius: "12px",
//                 px: 3,
//                 py: 1,
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   borderColor: theme.palette.primary.main,
//                   backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                   transform: "translateY(-2px)",
//                   boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
//                 },
//               }}
//             >
//               Sign In
//             </Button>
//             <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//               <Button
//                 variant="contained"
//                 sx={{
//                   background: "linear-gradient(90deg, #4F46E5, #8B5CF6)",
//                   textTransform: "none",
//                   borderRadius: "12px",
//                   fontFamily: "'Poppins', sans-serif",
//                   fontWeight: 600,
//                   fontSize: "0.95rem",
//                   px: 3.5,
//                   py: 1,
//                   boxShadow: "0 4px 15px rgba(79, 70, 229, 0.5)",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     boxShadow: "0 6px 20px rgba(79, 70, 229, 0.7)",
//                     transform: "translateY(-2px)",
//                   },
//                 }}
//               >
//                 Get Started
//               </Button>
//             </motion.div>
//           </Box>

//           {/* Mobile Menu Icon */}
//           <IconButton
//             edge="end"
//             color="inherit"
//             sx={{
//               display: { xs: "flex", md: "none" },
//               color: "#E2E8F0",
//               "&:hover": {
//                 backgroundColor: alpha(theme.palette.primary.main, 0.2),
//               },
//             }}
//             onClick={toggleDrawer(true)}
//           >
//             <MenuIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       {/* Drawer for Mobile */}
//       <Drawer
//         anchor="right"
//         open={drawerOpen}
//         onClose={toggleDrawer(false)}
//         PaperProps={{
//           sx: {
//             width: 280,
//             fontFamily: "'Poppins', sans-serif",
//             background: "linear-gradient(180deg, #0F172A 0%, #1E293B 100%)",
//             color: "white",
//             borderTopLeftRadius: 20,
//             borderBottomLeftRadius: 20,
//             boxShadow: "-5px 0 15px rgba(0, 0, 0, 0.3)",
//           },
//         }}
//       >
//         <Box
//           sx={{
//             p: 2,
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Box display="flex" alignItems="center">
//             <Avatar
//               src="https://dummyimage.com/40x40/6366f1/ffffff&text=AI"
//               alt="AI Power Logo"
//               sx={{ mr: 1.5, bgcolor: theme.palette.primary.main }}
//             />
//             <Typography
//               variant="h6"
//               sx={{
//                 fontWeight: 700,
//                 fontFamily: "'Poppins', sans-serif",
//                 background: "linear-gradient(90deg, #FFFFFF, #E2E8F0)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//               }}
//             >
//               CareerAI
//             </Typography>
//           </Box>
//           <IconButton onClick={toggleDrawer(false)} sx={{ color: "#E2E8F0" }}>
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.1)" }} />

//         <Box sx={{ p: 2 }}>
//           <List>
//             <ListItem
//               button
//               sx={{
//                 borderRadius: 2,
//                 mb: 1,
//                 transition: "all 0.3s ease",
//                 "&:hover": {
//                   backgroundColor: alpha(theme.palette.primary.main, 0.2),
//                 },
//               }}
//             >
//               <ListItemText
//                 primary="Sign In"
//                 primaryTypographyProps={{
//                   fontFamily: "'Poppins', sans-serif",
//                   fontWeight: 500,
//                   color: "#E2E8F0",
//                 }}
//               />
//             </ListItem>

//             <ListItem sx={{ py: 1 }}>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 sx={{
//                   background: "linear-gradient(90deg, #4F46E5, #8B5CF6)",
//                   textTransform: "none",
//                   borderRadius: "12px",
//                   fontFamily: "'Poppins', sans-serif",
//                   fontWeight: 600,
//                   py: 1.2,
//                   boxShadow: "0 4px 15px rgba(79, 70, 229, 0.5)",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     boxShadow: "0 6px 20px rgba(79, 70, 229, 0.7)",
//                     transform: "translateY(-2px)",
//                   },
//                 }}
//               >
//                 Get Started
//               </Button>
//             </ListItem>
//           </List>
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default Navbar;
