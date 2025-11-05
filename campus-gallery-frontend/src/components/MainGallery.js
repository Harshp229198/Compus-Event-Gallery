import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  TextField,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

function MainGallery({ onDelete }) {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await axios.get("http://localhost:3000/api/image/fetch", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setImages(res.data.data || []);
      } catch {
        alert("Error fetching images");
      }
    }
    fetchImages();
  }, [token, onDelete]);

  const sortedImages = [...images].sort((a, b) => {
    const aMatch =
      a.photoName && a.photoName.toLowerCase().includes(search.toLowerCase());
    const bMatch =
      b.photoName && b.photoName.toLowerCase().includes(search.toLowerCase());
    return (bMatch ? 1 : 0) - (aMatch ? 1 : 0);
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/image/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete && onDelete();
    } catch {
      alert("Delete failed");
    }
  };

  const handleEdit = (img) => {
    setEditId(img._id);
    setEditName(img.photoName || "");
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditName("");
  };

  const handleSaveEdit = async (id) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/image/update-photo-name/${id}`,
        { photoName: editName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      onDelete && onDelete();
      setEditId(null);
      setEditName("");
    } catch {
      alert("Failed to update photo name");
    }
  };

  return (
    <Box
      sx={{
        background: "#f3f5f7",
        minHeight: "100vh",
        py: 4,
        textAlign: "center",
      }}
    >
      <Box sx={{ maxWidth: 1280, mx: "auto", px: 2 }}>
        <Typography
          variant="h4"
          sx={{ mb: 3, fontWeight: 700, color: "#213a57" }}
        >
          Image Gallery
        </Typography>
        <TextField
          label="Search by image name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 3, width: 320, background: "#fff" }}
          size="small"
        />

        <Grid container spacing={3}>
          {sortedImages.map((img) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={img._id}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  pt: 2,
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  height="170"
                  image={img.url}
                  alt={img.photoName}
                  sx={{
                    borderRadius: 2,
                    width: "85%",
                    mx: "auto",
                    objectFit: "cover",
                    boxShadow: 2,
                  }}
                />
                <CardContent sx={{ width: "100%", px: 2, pt: 2 }}>
                  <Box sx={{ textAlign: "center" }}>
                    {/* Name row */}
                    <Box
                      sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 1,
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight={600}>
                        Name:
                      </Typography>
                      {editId === img._id ? (
                        <>
                          <TextField
                            size="small"
                            sx={{ mx: 1, width: 100 }}
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                          />
                          <IconButton
                            color="primary"
                            onClick={() => handleSaveEdit(img._id)}
                            sx={{ ml: 1 }}
                          >
                            <SaveIcon />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            onClick={handleCancelEdit}
                            sx={{ ml: 0.5 }}
                          >
                            <CancelIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <Typography component="span" sx={{ ml: 1 }}>
                            {img.photoName}
                          </Typography>
                          {role === "admin" && (
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleEdit(img)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          )}
                        </>
                      )}
                    </Box>
                    {/* Other fields */}
                    <Typography variant="body2">
                      <strong>Batch:</strong> {img.batch}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Event:</strong> {img.eventType}
                    </Typography>
                    {img.labels && !!img.labels.length && (
                      <Box mt={1}>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          gutterBottom
                          sx={{ fontWeight: 500 }}
                        >
                          Labels:
                        </Typography>
                        <ul
                          style={{
                            margin: "0",
                            padding: 0,
                            listStyle: "none",
                            display: "inline-block",
                          }}
                        >
                          {img.labels.map((label) => (
                            <li key={label} style={{ fontSize: 13 }}>
                              {label}
                            </li>
                          ))}
                        </ul>
                      </Box>
                    )}
                  </Box>
                  {role === "admin" && (
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      sx={{
                        mt: 2,
                        width: "100%",
                        borderRadius: 2,
                        fontWeight: 700,
                        letterSpacing: 0.4,
                      }}
                      onClick={() => handleDelete(img._id)}
                    >
                      Delete
                    </Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default MainGallery;
