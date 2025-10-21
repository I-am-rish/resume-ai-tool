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
    
  },

  {
    id: 2,
    name: "cover-letter",
    path: "/cover-letter",
    icon: "feather-mail",
  },
  {
    id: 3,
    name: "q&a",
    path: "#",
    // path: "/q-and-a",
    icon: "feather-message-square",
    dropdownMenu: [
      {
        id: 1,
        name: "Behavioral",
        path: "/q&a/behavioral",
        subdropdownMenu: false,
      },
      {
        id: 2,
        name: "Technical",
        path: "/q&a/technical",
        subdropdownMenu: false,
      },
    ],
  },

  {
    id: 4,
    name: "interview",
    path: "#",
    icon: "feather-video",
    dropdownMenu: [
      {
        id: 1,
        name: "Behavioral",
        path: "/interview/behavioral",
        subdropdownMenu: false,
      },
      {
        id: 2,
        name: "Technical",
        path: "/interview/technical",
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
