import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./route/router";
import "react-quill/dist/quill.snow.css";
import "react-circular-progressbar/dist/styles.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-datetime/css/react-datetime.css";
import NavigationProvider from "./contentApi/navigationProvider";
import SideBarToggleProvider from "./contentApi/sideBarToggleProvider";
import AuthProvider from "./contentApi/authProvider";
import ThemeCustomizer from "./components/shared/ThemeCustomizer";
import { SnackbarProvider } from "notistack";
// import "bootstrap/dist/css/bootstrap.min.css";




const App = () => {
  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <AuthProvider>
          <NavigationProvider>
            <SideBarToggleProvider>
              <RouterProvider router={router} />
            </SideBarToggleProvider>
          </NavigationProvider>
        </AuthProvider>
        {/* <ThemeCustomizer /> */}
      </SnackbarProvider>
    </>
  );
};

export default App;
