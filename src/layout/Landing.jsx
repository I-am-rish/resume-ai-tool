import { Outlet } from "react-router-dom";
import Header from "@/components/shared/header/LandingHeader";

const Landing = () => {
  return (
    <>
      <Header />
      <main>
        <div className="nxl-content">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Landing;
