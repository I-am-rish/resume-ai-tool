export const menuList = [
  {
    id: 0,
    name: "dashboards",
    path: "/",
    icon: "feather-airplay",
  },

  {
    id: 1,
    name: "users",
    path: "#",
    icon: "feather-users",
    dropdownMenu: [
      {
        id: 1,
        name: "Manage Users",
        path: "/users/manage-users",
        subdropdownMenu: false,
      },
    ],
  },

  {
    id: 2,
    name: "students",
    path: "#",
    icon: "feather-students",
    dropdownMenu: [
      {
        id: 1,
        name: "Manage Students",
        path: "/students/manage-students",
        subdropdownMenu: false,
      },
    ],
  },
  {
    id: 3,
    name: "schools",
    path: "#",
    icon: "feather-school",
    dropdownMenu: [
      {
        id: 1,
        name: "Manage Schools",
        path: "/schools/manage-schools",
        subdropdownMenu: false,
      },
    ],
  },

  {
    id: 4,
    name: "contents",
    path: "#",
    icon: "feather-content",
    dropdownMenu: [
      {
        id: 1,
        name: "Sitemap",
        path: "/contents/sitemap",
        subdropdownMenu: false,
      },
    ],
  },
  {
    id: 5,
    name: "products",
    path: "#",
    icon: "feather-product",
    dropdownMenu: [
      {
        id: 1,
        name: "Manage Products",
        path: "/products/manage-products",
        subdropdownMenu: false,
      },
    ],
  },
  {
    id: 6,
    name: "packages",
    path: "#",
    icon: "feather-package",
    dropdownMenu: [
      {
        id: 1,
        name: "Manage Packages",
        path: "/packages/manage-packages",
        subdropdownMenu: false,
      },
    ],
  },
  {
    id: 7,
    name: "categories",
    path: "#",
    icon: "feather-category",
    dropdownMenu: [
      {
        id: 1,
        name: "Manage Categories",
        path: "/categories/manage-categories",
        subdropdownMenu: false,
      },
    ],
  },
  {
    id: 8,
    name: "orders",
    path: "#",
    icon: "feather-payment",
    dropdownMenu: [
      {
        id: 1,
        name: "Manage Online Orders",
        path: "/orders/manage-orders",
        subdropdownMenu: false,
      },
    ],
  },
  {
    id: 9,
    name: "payments",
    path: "#",
    icon: "feather-payment",
    dropdownMenu: [
      {
        id: 1,
        name: "Manage Online Payments",
        path: "/payments/manage-payments",
        subdropdownMenu: false,
      },
    ],
  },
  {
    id: 10,
    name: "reports",
    path: "#",
    icon: "feather-reports",
    dropdownMenu: [
      {
        id: 1,
        name: "Report Builder",
        path: "/reports/reports-builder",
        subdropdownMenu: false,
      },
      {
        id: 2,
        name: "Standard Reports",
        path: "/reports/standard-reports",
        subdropdownMenu: false,
      },
      {
        id: 3,
        name: "Reports By School",
        path: "/reports/reports-by-school",
        subdropdownMenu: false,
      },
      {
        id: 4,
        name: "Item Reports",
        path: "/reports/item-reports",
        subdropdownMenu: false,
      },

      {
        id: 5,
        name: "All Offices",
        path: "/reports/all-offices",
        subdropdownMenu: false,
      },
    ],
  },

  // {
  //   id: 11,
  //   name: "authentication",
  //   path: "#",
  //   icon: "feather-power",
  //   dropdownMenu: [
  //     {
  //       id: 1,
  //       name: "login",
  //       path: "/authentication/login",
  //       subdropdownMenu: false,
  //     },
  //   ],
  // },
];
