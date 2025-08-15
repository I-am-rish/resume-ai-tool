import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box, Grow } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        // background: "linear-gradient(135deg, #f3e7ff 0%, #e0f2ff 100%)",
        borderRadius: "16px",
        // boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        padding: "32px",
      }}
    >
      <Grow in={true} timeout={800}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            animation: "fadeIn 1s ease-in-out",
          }}
        >
          <LockIcon
            sx={{
              fontSize: 80,
              color: "error.main",
              animation: "shake 0.5s infinite",
              marginBottom: "16px",
            }}
          />
          <Typography
            variant="h3"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "text.primary",
              letterSpacing: "-0.5px",
            }}
          >
            Unauthorized Access
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{
              color: "text.secondary",
              maxWidth: "80%",
              marginBottom: "24px",
            }}
          >
            Oops! You don't have permission to access this page. Please return
            to the home page or contact support if you believe this is an error.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            sx={{
              marginTop: "20px",
              padding: "12px 24px",
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "16px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            Go to Home
          </Button>
        </Box>
      </Grow>
      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
            20%, 40%, 60%, 80% { transform: translateX(4px); }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </Container>
  );
};

export default Unauthorized;
