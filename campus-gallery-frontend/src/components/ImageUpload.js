import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function ImageUpload({ onUpload }) {
  const [eventType, setEventType] = useState("");
  const [batch, setBatch] = useState("");
  const [image, setImage] = useState(null);
  const [photoName, setPhotoName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("eventType", eventType);
    formData.append("batch", batch);
    formData.append("image", image);
    formData.append("photoName", photoName);

    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:3000/api/image/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Image uploaded!");
      onUpload && onUpload();
      // reset form
      setEventType("");
      setBatch("");
      setImage(null);
      setPhotoName("");
    } catch {
      alert("Upload failed");
    }
  }

  return (
    <Box maxWidth="xl" mb={3} p={1}>
      <Paper elevation={4} sx={{ p: 3, borderRadius: 4, mb: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={2} color="#233e69">
          Upload Image
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Stack
            spacing={2}
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
          >
            <TextField
              label="User Name"
              value={photoName}
              onChange={(e) => setPhotoName(e.target.value)}
              required
              size="small"
              sx={{ minWidth: 170 }}
            />

            <TextField
              label="Event Type"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              required
              size="small"
              sx={{ minWidth: 150 }}
              placeholder="e.g. Tech Talk"
            />

            <TextField
              select
              label="Batch"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              required
              size="small"
              sx={{ minWidth: 110 }}
            >
              <MenuItem value="">Select Batch</MenuItem>
              <MenuItem value="H4">H4</MenuItem>
              <MenuItem value="H5">H5</MenuItem>
              <MenuItem value="H6">H6</MenuItem>
            </TextField>

            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ minWidth: 150, color: "#233e69", borderColor: "#97b4f8" }}
            >
              {image?.name || "Choose File"}
              <input
                type="file"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </Button>
            <Button
              variant="contained"
              type="submit"
              sx={{ minWidth: 110, background: "#233e69", fontWeight: 700 }}
            >
              Upload
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}

export default ImageUpload;
