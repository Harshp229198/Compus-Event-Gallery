import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import ImageUpload from "./components/ImageUpload";
import MainGallery from "./components/MainGallery";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import Typography from "@mui/material/Typography";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import Box from "@mui/material/Box";

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [galleryKey, setGalleryKey] = useState(0);

  function handleLogin(role) {
    setLoggedIn(true);
    setRole(role);
  }

  function handleLogout() {
    localStorage.clear();
    setLoggedIn(false);
    setRole("");
  }

  function handleGalleryReload() {
    setGalleryKey((prev) => prev + 1);
  }

  return (
    <div>
      {loggedIn ? (
        <>
          <Button
            variant="outlined"
            color="error"
            size="medium"
            startIcon={<LogoutIcon />}
            sx={{
              position: "absolute",
              top: 18,
              right: 38,
              fontWeight: 700,
              borderRadius: 3,
              boxShadow: 1,
              letterSpacing: 0.5,
              px: 2.5,
              py: 0.5,
              textTransform: "none",
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>

          <Box
            sx={{
              width: "100%",
              px: { xs: 1, md: 4 },
              py: { xs: 2, md: 3 },
              pb: 2,
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 4,
              boxShadow: "0 2px 12px #24315d09",
              borderBottom: "2.5px solid #dde6f7",
              borderRadius: "0 0 18px 18px",
            }}
          >
            <EventAvailableIcon
              sx={{ fontSize: 45, color: "#1e3f6e", mr: 2 }}
            />
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  letterSpacing: 1.2,
                  fontSize: { xs: 25, sm: 32, md: 38 },
                  color: "#223554",
                  textShadow: "0 3px 18px #18387122",
                  lineHeight: 1.1,
                }}
              >
                Campus Event Gallery{" "}
                <Typography
                  component="span"
                  color="#255da6"
                  fontWeight={600}
                  fontSize={{ xs: 17, sm: 24, md: 28 }}
                >
                  ({role})
                </Typography>
              </Typography>
              <Typography
                variant="subtitle1"
                color="#476190"
                sx={{
                  mt: 0.1,
                  letterSpacing: 0.7,
                  fontWeight: 500,
                  fontSize: { xs: 15, sm: 17 },
                  ml: 0.6,
                }}
              >
                Upload, explore, and curate your campus event memories!
              </Typography>
            </Box>
          </Box>
          <ImageUpload onUpload={handleGalleryReload} />
          <MainGallery
            key={galleryKey}
            onDelete={handleGalleryReload}
            onUpdate={handleGalleryReload}
          />
        </>
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
