// import React, { Fragment, useEffect, useState } from "react";
// import { FiChevronRight } from "react-icons/fi";
// import { Link, useLocation } from "react-router-dom";
// import { menuList } from "@/utils/fackData/menuList";
// import getIcon from "@/utils/getIcon";
// import { useAuth } from "../../../contentApi/authProvider";

// const Menus = () => {
//   const { userPermissions } = useAuth();
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [openSubDropdown, setOpenSubDropdown] = useState(null);
//   const [activeParent, setActiveParent] = useState("");
//   const [activeChild, setActiveChild] = useState("");
//   const pathName = useLocation().pathname;

//   // Function to check if user has permission to access a menu item
//   const canAccessMenuItem = (menuItemName) => {
//     // Map menu item names to permission fields
//     const permissionMap = {
//       users: "can_manage_users",
//       students: "can_manage_students",
//       schools: "can_manage_schools",
//       contents: "can_access_site_map",
//       products: "can_manage_products",
//       packages: "can_manage_packages",
//       categories: "can_manage_categories",
//       orders: "can_manage_orders",
//       payments: "can_manage_payments",
//       reports: "can_use_report_builder",
//     };

//     // If no user permissions yet, show all menu items
//     if (!userPermissions) return true;

//     // Get the permission field for this menu item
//     const permissionField = permissionMap[menuItemName];

//     // If there's no specific permission mapping, allow access
//     if (!permissionField) return true;

//     // Check if user has the required permission
//     return userPermissions[permissionField] === 1;
//   };

//   const handleMainMenu = (e, name) => {
//     if (openDropdown === name) {
//       setOpenDropdown(null);
//     } else {
//       setOpenDropdown(name);
//     }
//   };

//   const handleDropdownMenu = (e, name) => {
//     e.stopPropagation();
//     if (openSubDropdown === name) {
//       setOpenSubDropdown(null);
//     } else {
//       setOpenSubDropdown(name);
//     }
//   };

//   useEffect(() => {
//     if (pathName !== "/") {
//       const x = pathName.split("/");
//       setActiveParent(x[1]);
//       setActiveChild(x[2]);
//       setOpenDropdown(x[1]);
//       setOpenSubDropdown(x[2]);
//     } else {
//       setActiveParent("dashboards");
//       setOpenDropdown("dashboards");
//     }
//   }, [pathName]);

//   // Filter menu items based on user permissions
//   const filteredMenuList = menuList.filter(menuItem => {
//     // Allow dashboard (home) for all users
//     if (menuItem.name === "dashboards") {
//       return true;
//     }
//     // Check if user has permission to access this menu item
//     return canAccessMenuItem(menuItem.name);
//   });

//   return (
//     <>
//       {filteredMenuList.map(({ dropdownMenu, id, name, path, icon }) => {
//         return (
//           <li
//             key={id}
//             onClick={(e) => handleMainMenu(e, name)}
//             className={`nxl-item nxl-hasmenu ${
//               activeParent === name ? "active nxl-trigger" : ""
//             }`}
//           >
//             <Link to={path} className="nxl-link text-capitalize">
//               <span className="nxl-micon"> {getIcon(icon)} </span>
//               <span className="nxl-mtext" style={{ paddingLeft: "2.5px" }}>
//                 {name}
//               </span>
//               <span className="nxl-arrow fs-16">
//                 <FiChevronRight />
//               </span>
//             </Link>
//             <ul
//               className={`nxl-submenu ${
//                 openDropdown === name ? "nxl-menu-visible" : "nxl-menu-hidden"
//               }`}
//             >
//               {dropdownMenu?.map(({ id, name, path, subdropdownMenu }) => {
//                 const x = name;
//                 return (
//                   <Fragment key={id}>
//                     {subdropdownMenu.length ? (
//                       <li
//                         className={`nxl-item nxl-hasmenu ${
//                           activeChild === name ? "active" : ""
//                         }`}
//                         onClick={(e) => handleDropdownMenu(e, x)}
//                       >
//                         <Link to={path} className={`nxl-link text-capitalize`}>
//                           <span className="nxl-mtext">{name}</span>
//                           <span className="nxl-arrow">
//                             <i>
//                               {" "}
//                               <FiChevronRight />
//                             </i>
//                           </span>
//                         </Link>
//                         {subdropdownMenu.map(({ id, name, path }) => {
//                           return (
//                             <ul
//                               key={id}
//                               className={`nxl-submenu ${
//                                 openSubDropdown === x
//                                   ? "nxl-menu-visible"
//                                   : "nxl-menu-hidden "
//                               }`}
//                             >
//                               <li
//                                 className={`nxl-item ${
//                                   pathName === path ? "active" : ""
//                                 }`}
//                               >
//                                 <Link
//                                   className="nxl-link text-capitalize"
//                                   to={path}
//                                 >
//                                   {name}
//                                 </Link>
//                               </li>
//                             </ul>
//                           );
//                         })}
//                       </li>
//                     ) : (
//                       <li
//                         className={`nxl-item ${
//                           pathName === path ? "active" : ""
//                         }`}
//                       >
//                         <Link className="nxl-link" to={path}>
//                           {name}
//                         </Link>
//                       </li>
//                     )}
//                   </Fragment>
//                 );
//               })}
//             </ul>
//           </li>
//         );
//       })}
//     </>
//   );
// };

// export default Menus;



import React, { Fragment, useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { menuList } from "@/utils/fackData/menuList";
import getIcon from "@/utils/getIcon";
import { useAuth } from "../../../contentApi/authProvider";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
  Box,
  useTheme,
  alpha,
  Paper,
  Chip,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

const Menus = () => {
  const { userPermissions } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const [activeParent, setActiveParent] = useState("");
  const [activeChild, setActiveChild] = useState("");
  const pathName = useLocation().pathname;
  const theme = useTheme();

  // Function to check if user has permission to access a menu item
  const canAccessMenuItem = (menuItemName) => {
    // Map menu item names to permission fields
    const permissionMap = {
      users: "can_manage_users",
      students: "can_manage_students",
      schools: "can_manage_schools",
      contents: "can_access_site_map",
      products: "can_manage_products",
      packages: "can_manage_packages",
      categories: "can_manage_categories",
      orders: "can_manage_orders",
      payments: "can_manage_payments",
      reports: "can_use_report_builder",
    };
    // If no user permissions yet, show all menu items
    if (!userPermissions) return true;
    // Get the permission field for this menu item
    const permissionField = permissionMap[menuItemName];
    // If there's no specific permission mapping, allow access
    if (!permissionField) return true;
    // Check if user has the required permission
    return userPermissions[permissionField] === 1;
  };

  const handleMainMenu = (e, name) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  };

  const handleDropdownMenu = (e, name) => {
    e.stopPropagation();
    if (openSubDropdown === name) {
      setOpenSubDropdown(null);
    } else {
      setOpenSubDropdown(name);
    }
  };

  useEffect(() => {
    if (pathName !== "/") {
      const x = pathName.split("/");
      setActiveParent(x[1]);
      setActiveChild(x[2]);
      setOpenDropdown(x[1]);
      setOpenSubDropdown(x[2]);
    } else {
      setActiveParent("dashboards");
      setOpenDropdown("dashboards");
    }
  }, [pathName]);

  // Filter menu items based on user permissions
  const filteredMenuList = menuList.filter((menuItem) => {
    // Allow dashboard (home) for all users
    if (menuItem.name === "dashboards") {
      return true;
    }
    // Check if user has permission to access this menu item
    return canAccessMenuItem(menuItem.name);
  });

  // Get color based on menu name
  const getMenuColor = (name) => {
    const colorMap = {
      dashboards: theme.palette.primary.main,
      users: theme.palette.secondary.main,
      students: theme.palette.success.main,
      schools: theme.palette.info.main,
      contents: theme.palette.warning.main,
      products: theme.palette.error.main,
      packages: theme.palette.primary.main,
      categories: theme.palette.secondary.main,
      orders: theme.palette.success.main,
      payments: theme.palette.info.main,
      reports: theme.palette.warning.main,
    };
    return colorMap[name] || theme.palette.primary.main;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <List component="nav" sx={{ p: 0 }}>
        {filteredMenuList.map(({ dropdownMenu, id, name, path, icon }) => {
          const isActive = activeParent === name;
          const color = getMenuColor(name);

          return (
            <Fragment key={id}>
              <ListItem disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={(e) => handleMainMenu(e, name)}
                  component={Link}
                  to={path}
                  sx={{
                    borderRadius: 2,
                    py: 1.2,
                    px: 2,
                    mb: 0.5,
                    bgcolor: isActive ? alpha(color, 0.1) : "transparent",
                    color: isActive ? color : theme.palette.text.primary,
                    "&:hover": {
                      bgcolor: alpha(color, 0.08),
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? color : theme.palette.text.secondary,
                      minWidth: 40,
                    }}
                  >
                    {getIcon(icon)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        fontWeight={isActive ? 600 : 500}
                        sx={{ textTransform: "capitalize" }}
                      >
                        {name}
                      </Typography>
                    }
                  />
                  {dropdownMenu && (
                    <Box sx={{ ml: 1 }}>
                      {openDropdown === name ? (
                        <ExpandLess fontSize="small" />
                      ) : (
                        <ExpandMore fontSize="small" />
                      )}
                    </Box>
                  )}
                </ListItemButton>
              </ListItem>

              {dropdownMenu && (
                <Collapse
                  in={openDropdown === name}
                  timeout="auto"
                  unmountOnExit
                >
                  <Paper
                    elevation={0}
                    sx={{
                      ml: 2,
                      mr: 1,
                      mb: 1,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.background.default, 0.5),
                      border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    }}
                  >
                    <List component="div" disablePadding>
                      {dropdownMenu.map(
                        ({ id, name, path, subdropdownMenu }) => {
                          const isChildActive = activeChild === name;
                          const hasSubmenu =
                            subdropdownMenu && subdropdownMenu.length > 0;

                          return (
                            <Fragment key={id}>
                              <ListItem disablePadding>
                                <ListItemButton
                                  onClick={(e) =>
                                    hasSubmenu && handleDropdownMenu(e, name)
                                  }
                                  component={hasSubmenu ? "div" : Link}
                                  to={hasSubmenu ? undefined : path}
                                  sx={{
                                    borderRadius: 1.5,
                                    py: 0.8,
                                    px: 2,
                                    mb: 0.3,
                                    bgcolor: isChildActive
                                      ? alpha(color, 0.08)
                                      : "transparent",
                                    color: isChildActive
                                      ? color
                                      : theme.palette.text.primary,
                                    "&:hover": {
                                      bgcolor: alpha(color, 0.05),
                                    },
                                    transition: "all 0.2s ease",
                                  }}
                                >
                                  <ListItemText
                                    primary={
                                      <Typography
                                        variant="body2"
                                        fontWeight={isChildActive ? 600 : 500}
                                        sx={{ textTransform: "capitalize" }}
                                      >
                                        {name}
                                      </Typography>
                                    }
                                  />
                                  {hasSubmenu && (
                                    <Box sx={{ ml: 1 }}>
                                      {openSubDropdown === name ? (
                                        <ExpandLess fontSize="small" />
                                      ) : (
                                        <ExpandMore fontSize="small" />
                                      )}
                                    </Box>
                                  )}
                                </ListItemButton>
                              </ListItem>

                              {hasSubmenu && (
                                <Collapse
                                  in={openSubDropdown === name}
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <List component="div" disablePadding>
                                    {subdropdownMenu.map(
                                      ({ id, name, path }) => (
                                        <ListItem key={id} disablePadding>
                                          <ListItemButton
                                            component={Link}
                                            to={path}
                                            sx={{
                                              borderRadius: 1.5,
                                              py: 0.6,
                                              px: 4,
                                              mb: 0.3,
                                              bgcolor:
                                                pathName === path
                                                  ? alpha(color, 0.08)
                                                  : "transparent",
                                              color:
                                                pathName === path
                                                  ? color
                                                  : theme.palette.text.primary,
                                              "&:hover": {
                                                bgcolor: alpha(color, 0.05),
                                              },
                                              transition: "all 0.2s ease",
                                            }}
                                          >
                                            <ListItemText
                                              primary={
                                                <Typography
                                                  variant="body2"
                                                  fontWeight={
                                                    pathName === path
                                                      ? 600
                                                      : 500
                                                  }
                                                  sx={{
                                                    textTransform: "capitalize",
                                                  }}
                                                >
                                                  {name}
                                                </Typography>
                                              }
                                            />
                                          </ListItemButton>
                                        </ListItem>
                                      )
                                    )}
                                  </List>
                                </Collapse>
                              )}
                            </Fragment>
                          );
                        }
                      )}
                    </List>
                  </Paper>
                </Collapse>
              )}
            </Fragment>
          );
        })}
      </List>
    </Box>
  );
};

export default Menus;
