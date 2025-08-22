import { Outlet } from "react-router-dom";
import Header from "@/components/shared/header/SuperAdminHeader";

const SuperAdmin = () => {
  return (
    <>
      <Header />
      <main >
        <div className="nxl-content">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default SuperAdmin;
