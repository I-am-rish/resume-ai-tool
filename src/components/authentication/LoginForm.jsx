import httpClient from "@/utils/httpClinet";
import { Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { FiFacebook, FiGithub, FiTwitter } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

const LoginForm = ({ registerPath, resetPath }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    email: "Admin@yopmail.com",
    password: "Qwerty@123",
  });
  const [loading, setLoading] = useState(false); // 🔄 loader state

  const handleLogin = () => {
    setLoading(true); // start loader
    httpClient
      .post("auth/login", formData) // ⬅️ Make sure to send `formData`
      .then((res) => {
        console.log("login api res => ", res);
        localStorage.setItem("token", JSON.stringify(res.data.data.token));
        // Store user data along with token
        localStorage.setItem(
          "user",
          JSON.stringify(
            res.data.data.user || res.data.data.userData || res.data.data
          )
        );
        enqueueSnackbar("Login success", { variant: "success" });
        if (res.data.data.userData?.role === "Technical Admin") {
          window.location.href = "/";
        } else window.location.href = "/dashboard";
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar("Login failed", { variant: "error" });
      })
      .finally(() => {
        setLoading(false); // stop loader
      });
  };

  return (
    <>
      {/* <h2 className="fs-20 fw-bolder mb-4">Login</h2> */}
      {/* <h4 className="fs-13 fw-bold mb-2">Login to your account</h4> */}
      <p className="fs-12 fw-medium text-muted">
        <h6>Welcome to the Herff Jones Backoffice</h6>
      </p>
      <form className="w-100 mt-4 pt-2" onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <input
            type="email"
            className="form-control"
            placeholder="Admin@yopmail.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>
        {/* <div className="d-flex align-items-center justify-content-between">
          <div>
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="rememberMe"
              />
              <label
                className="custom-control-label c-pointer"
                htmlFor="rememberMe"
              >
                Remember Me
              </label>
            </div>
          </div>
        </div> */}
        <div className="mt-5">
          <Button
            fullWidth
            variant="contained"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
