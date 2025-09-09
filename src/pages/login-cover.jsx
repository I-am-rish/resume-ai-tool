import React, { useState, useEffect } from "react";
import { useTheme, alpha } from "@mui/material";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  boxShadow: "0 12px 48px rgba(0, 0, 0, 0.15)",
  backdropFilter: "blur(10px)",
  background: alpha(theme.palette.background.paper, 0.85),
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 16px 64px rgba(0, 0, 0, 0.2)",
  },
}));

const BinaryStream = () => (
  <motion.div
    style={{
      position: "absolute",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      zIndex: 1,
    }}
  >
    {Array(10)
      .fill()
      .map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: `${Math.random() * 100}vw`,
            top: "-10vh",
            color: "#00FF41",
            fontFamily: "monospace",
            fontSize: "12px",
            opacity: 0.8,
          }}
          animate={{
            y: ["-10vh", "110vh"],
            opacity: [0.8, 0.3, 0.8],
          }}
          transition={{
            duration: Math.random() * 3 + 4,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {Array(20)
            .fill()
            .map((_, j) => (
              <span key={j}>
                {Math.round(Math.random())}
                {j % 5 === 0 ? "\n" : ""}
              </span>
            ))}
        </motion.div>
      ))}
  </motion.div>
);

const Node = ({ color, size, delay }) => (
  <motion.div
    style={{
      position: "absolute",
      width: size,
      height: size,
      borderRadius: "50%",
      background: color,
      boxShadow: `0 0 15px ${alpha(color, 0.6)}`,
      opacity: 0.7,
    }}
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.7, 0.4, 0.7],
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const DigitalGrid = () => (
  <motion.div
    style={{
      position: "absolute",
      width: "100%",
      height: "100%",
      background: `repeating-linear-gradient(
        0deg,
        transparent,
        transparent 1px,
        ${alpha("#00C4FF", 0.1)} 1px,
        ${alpha("#00C4FF", 0.1)} 2px
      ), repeating-linear-gradient(
        90deg,
        transparent,
        transparent 1px,
        ${alpha("#00C4FF", 0.1)} 1px,
        ${alpha("#00C4FF", 0.1)} 2px
      )`,
      opacity: 0.3,
    }}
    animate={{
      scale: [1, 1.02, 1],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const EnhancedTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    backgroundColor: "#ffffff",
    transition: "all 0.3s ease-in-out",
    "& fieldset": {
      borderColor: alpha(theme.palette.grey[400], 0.3),
    },
    "&:hover fieldset": {
      borderColor: alpha(theme.palette.primary.main, 0.5),
      boxShadow: "0 0 8px rgba(75, 94, 252, 0.2)",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      boxShadow: "0 0 12px rgba(75, 94, 252, 0.3)",
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },
  "& .MuiInputBase-input": {
    padding: "12px 14px",
  },
}));

const AuthComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Form submitted:", { ...formData, isSignup });
    // Add your authentication logic here
  };

  const toggleAuthMode = () => setIsSignup(!isSignup);

  const variants = {
    initial: { opacity: 0, y: 30, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.95,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.98 },
  };

  const nodes = Array(8)
    .fill()
    .map((_, i) => ({
      id: i,
      color: ["#00FF41", "#00C4FF", "#A855F7"][Math.floor(Math.random() * 3)],
      size: Math.random() * 20 + 15,
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      delay: Math.random() * 2,
    }));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isMobile ? 2 : 4,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #0A0F1A 0%, #1A1F2E 50%, #2A2F3E 100%)",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <DigitalGrid />
        <BinaryStream />
        {nodes.map((node) => (
          <Node
            key={node.id}
            color={node.color}
            size={node.size}
            delay={node.delay}
            style={{ left: `${node.x}vw`, top: `${node.y}vh` }}
          />
        ))}
      </Box>

      <StyledCard
        sx={{
          width: isMobile ? "100%" : 450,
          maxWidth: "100%",
          zIndex: 1,
          position: "relative",
        }}
      >
        <CardContent sx={{ padding: isMobile ? 3 : 4, position: "relative" }}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              style={{ display: "inline-block" }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, #00C4FF 0%, #A855F7 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  boxShadow: "0 6px 20px rgba(0, 196, 255, 0.3)",
                }}
              >
                <Typography variant="h3" color="white" fontWeight="bold">
                  💻
                </Typography>
              </Box>
            </motion.div>
            <Typography
              variant="h4"
              fontWeight={700}
              color="text.primary"
              mt={2}
              sx={{ textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
            >
              {isSignup ? "Create Account" : "Sign In"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 300, mx: "auto", mt: 1 }}
            >
              {isSignup
                ? "Start your career transformation journey with CareerAI!"
                : "Welcome back, Sign in to your CareerAI account!"}
            </Typography>
          </Box>

          <AnimatePresence mode="wait">
            <motion.form
              key={isSignup ? "signup" : "login"}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              onSubmit={handleSubmit}
              sx={{ display: "flex", flexDirection: "column", gap: 5 }} // Increased gap to 5 for input fields
            >
              {isSignup && (
                <EnhancedTextField
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  sx={{ mb: 1.5 }}
                />
              )}
              <EnhancedTextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                required
                sx={{ mb: 1.5 }}
              />
              <EnhancedTextField
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                sx={{ mb: 1.5 }}
                required
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
              {isSignup && (
                <EnhancedTextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  sx={{ mb: 1.5 }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              )}
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                sx={{ mt: 5 }}
              >
                {" "}
                {/* Increased margin-top to 5 */}
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    background: "linear-gradient(135deg, #00C4FF, #A855F7)",
                    color: "#fff",
                    textTransform: "none",
                    padding: "12px",
                    borderRadius: 2,
                    fontWeight: 600,
                    "&:hover": {
                      background: "linear-gradient(135deg, #0099CC, #9333EA)",
                      boxShadow: "0 4px 12px rgba(0, 196, 255, 0.4)",
                    },
                  }}
                >
                  {isSignup ? "Create Account" : "Sign In"}
                </Button>
              </motion.div>
              <Box sx={{ textAlign: "center", mt: 5 }}>
                {" "}
                {/* Increased margin-top to 5 */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  OR CONTINUE WITH
                </Typography>
                <Grid
                  // container
                  spacing={3}
                  justifyContent="center"
                 
                >
                  {" "}
                  {/* Increased spacing to 3 */}
                  <Grid item>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={
                        <Box component="span" className="text-red-500 text-xl">
                          G
                        </Box>
                      }
                      sx={{
                        borderColor: alpha(theme.palette.grey[400], 0.5),
                        width: "80%",
                        color: "text.primary",
                        borderRadius: 2,
                        padding: "6px 16px",
                        "&:hover": {
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      Google
                    </Button>
                  </Grid>
                  {/* <Grid item>
                    <Button
                      variant="outlined"
                      startIcon={
                        <Box component="span" className="text-blue-600 text-xl">
                          f
                        </Box>
                      }
                      sx={{
                        borderColor: alpha(theme.palette.grey[400], 0.5),
                        color: "text.primary",
                        borderRadius: 2,
                        padding: "6px 16px",
                        "&:hover": {
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      Facebook
                    </Button>
                  </Grid> */}
                </Grid>
              </Box>
              <Typography
                variant="body2"
                color="primary"
                sx={{
                  textAlign: "center",
                  mt: 5, // Increased margin-top to 5
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline", color: "#A855F7" },
                }}
                onClick={toggleAuthMode}
              >
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don’t have an account? Sign up"}
              </Typography>
            </motion.form>
          </AnimatePresence>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default AuthComponent;
