import React from "react";
import TechnicalDashboard from "./TechnicalDashboard";
import OtherDashboard from "./OtherDashboard";

// Get user from local storage and parse it
const storedUser = window.localStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;
const role = user?.role;

const Dashboard = () => {
  return (
    <>
      
      {role === "Technical Admin" ? <TechnicalDashboard /> : <OtherDashboard />}
    </>
  );
};

export default Dashboard;
