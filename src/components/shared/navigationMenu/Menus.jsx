import React, { Fragment, useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { menuList } from "@/utils/fackData/menuList";
import getIcon from "@/utils/getIcon";
import { useAuth } from "../../../contentApi/authProvider";

const Menus = () => {
  const { userPermissions } = useAuth();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const [activeParent, setActiveParent] = useState("");
  const [activeChild, setActiveChild] = useState("");
  const pathName = useLocation().pathname;

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
  const filteredMenuList = menuList.filter(menuItem => {
    // Allow dashboard (home) for all users
    if (menuItem.name === "dashboards") {
      return true;
    }
    // Check if user has permission to access this menu item
    return canAccessMenuItem(menuItem.name);
  });

  return (
    <>
      {filteredMenuList.map(({ dropdownMenu, id, name, path, icon }) => {
        return (
          <li
            key={id}
            onClick={(e) => handleMainMenu(e, name)}
            className={`nxl-item nxl-hasmenu ${
              activeParent === name ? "active nxl-trigger" : ""
            }`}
          >
            <Link to={path} className="nxl-link text-capitalize">
              <span className="nxl-micon"> {getIcon(icon)} </span>
              <span className="nxl-mtext" style={{ paddingLeft: "2.5px" }}>
                {name}
              </span>
              <span className="nxl-arrow fs-16">
                <FiChevronRight />
              </span>
            </Link>
            <ul
              className={`nxl-submenu ${
                openDropdown === name ? "nxl-menu-visible" : "nxl-menu-hidden"
              }`}
            >
              {dropdownMenu?.map(({ id, name, path, subdropdownMenu }) => {
                const x = name;
                return (
                  <Fragment key={id}>
                    {subdropdownMenu.length ? (
                      <li
                        className={`nxl-item nxl-hasmenu ${
                          activeChild === name ? "active" : ""
                        }`}
                        onClick={(e) => handleDropdownMenu(e, x)}
                      >
                        <Link to={path} className={`nxl-link text-capitalize`}>
                          <span className="nxl-mtext">{name}</span>
                          <span className="nxl-arrow">
                            <i>
                              {" "}
                              <FiChevronRight />
                            </i>
                          </span>
                        </Link>
                        {subdropdownMenu.map(({ id, name, path }) => {
                          return (
                            <ul
                              key={id}
                              className={`nxl-submenu ${
                                openSubDropdown === x
                                  ? "nxl-menu-visible"
                                  : "nxl-menu-hidden "
                              }`}
                            >
                              <li
                                className={`nxl-item ${
                                  pathName === path ? "active" : ""
                                }`}
                              >
                                <Link
                                  className="nxl-link text-capitalize"
                                  to={path}
                                >
                                  {name}
                                </Link>
                              </li>
                            </ul>
                          );
                        })}
                      </li>
                    ) : (
                      <li
                        className={`nxl-item ${
                          pathName === path ? "active" : ""
                        }`}
                      >
                        <Link className="nxl-link" to={path}>
                          {name}
                        </Link>
                      </li>
                    )}
                  </Fragment>
                );
              })}
            </ul>
          </li>
        );
      })}
    </>
  );
};

export default Menus;
