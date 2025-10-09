export const menuList = [
  {
    id: 0,
    name: "dashboard",
    path: "/dashboard",
    icon: "feather-dashboard",
  },

  {
    id: 1,
    name: "resume",
    icon: "feather-file-text",
    path: "/resume",
    // dropdownMenu: [
    //   {
    //     id: 1,
    //     name: "Resume",
    //     path: "/resume",
    //     subdropdownMenu: false,
    //   },
    // ],
  },

  {
    id: 2,
    name: "cover-letter",
    path: "/cover-letter",
    icon: "feather-mail",
  },
  {
    id: 3,
    name: "Q&A",
    path: "#",
    // path: "/q-and-a",
    icon: "feather-message-square",
    dropdownMenu: [
      {
        id: 1,
        name: "Behavioral",
        path: "behavioral",
        subdropdownMenu: false,
      },
      {
        id: 2,
        name: "Technical",
        path: "technical",
        subdropdownMenu: false,
      },
    ],
  },

  {
    id: 4,
    name: "interview",
    path: "/interview",
    icon: "feather-video",
    dropdownMenu: [
      {
        id: 1,
        name: "Behavioral",
        path: "behavioral-interview",
        subdropdownMenu: false,
      },
      {
        id: 2,
        name: "Technical",
        path: "technical-interview",
        subdropdownMenu: false,
      },
    ],
  },
  {
    id: 5,
    name: "analytics",
    path: "/analytics",
    icon: "feather-bar-chart-2",
  },
  {
    id: 5,
    name: "archive",
    path: "/archive",
    icon: "feather-archive",
  },
  {
    id: 5,
    name: "profile",
    path: "/profile",
    icon: "feather-profile",
  },
  {
    id: 5,
    name: "Logout",
    path: "/logout",
    icon: "feather-log-in",
  },
];
