import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  Link,
} from "@mui/material";

function LoginPage({ onLogin }) {
  const [roleType, setRoleType] = useState("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // "login" or "register"

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (mode === "login") {
        const res = await axios.post("http://localhost:3000/api/auth/login", {
          username,
          password,
        });
        localStorage.setItem("token", res.data.accessToken);
        const userRole = res.data.user?.role || roleType;
        localStorage.setItem("role", userRole);
        onLogin(userRole);
      } else {
        await axios.post("http://localhost:3000/api/auth/register", {
          username,
          password,
          role: roleType,
        });
        alert("Registration successful. Please log in.");
        setMode("login");
      }
    } catch (err) {
      alert(
        mode === "login"
          ? "Login failed, check username and password."
          : "Registration failed (user may already exist)."
      );
    }
  }

  return (
    <Box
      sx={{
        background: "#e9edf4",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          minWidth: 340,
          maxWidth: "96vw",
          boxShadow: "0 3px 32px #2222",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          color="primary"
          sx={{ fontWeight: 700, mb: 2 }}
        >
          {mode === "login" ? "Campus Gallery Login" : "Register New Account"}
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <RadioGroup
            row
            value={roleType}
            onChange={(e) => setRoleType(e.target.value)}
            sx={{ mb: 2, justifyContent: "center" }}
          >
            <FormControlLabel value="user" control={<Radio />} label="User" />
            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
          </RadioGroup>
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ fontWeight: 600, letterSpacing: 1, py: 1.25, mb: 2 }}
          >
            {mode === "login" ? "Log In" : "Register"}
          </Button>
        </form>
        {mode === "login" ? (
          <Typography variant="body2" align="center">
            Don't have an account?{" "}
            <Link
              sx={{ cursor: "pointer" }}
              onClick={() => setMode("register")}
            >
              Register
            </Link>
          </Typography>
        ) : (
          <Typography variant="body2" align="center">
            Already registered?{" "}
            <Link sx={{ cursor: "pointer" }} onClick={() => setMode("login")}>
              Log In
            </Link>
          </Typography>
        )}
      </Paper>
    </Box>
  );
}

export default LoginPage;
