import React, { useState, useEffect } from "react";
import { Box, Container, Alert, Snackbar } from "@mui/material";
import MoodJournalForm from "../organisms/MoodJournalForm";
import JournalEntries from "../organisms/JournalEntries";
import { weatherService } from "../../services/api";
import LoadingSpinner from "../atoms/LoadingSpinner";
import Typography from "../atoms/Typography";
import { JournalEntry, SortConfig, Weather } from "../../types";

interface LocationState {
  latitude: number;
  longitude: number;
  loading: boolean;
  error: string | null;
}

const DashboardPage: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [weatherData, setWeatherData] = useState<Weather | undefined>();
  const [location, setLocation] = useState<LocationState>({
    latitude: 0,
    longitude: 0,
    loading: true,
    error: null,
  });
  // const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: "date",
    order: "desc",
  });
  const [showError, setShowError] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  useEffect(() => {
    const savedEntries = localStorage.getItem("journalEntries");
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              loading: false,
              error: null,
            });

            try {
              const weather = await weatherService.getCurrentWeather(
                position.coords.latitude,
                position.coords.longitude
              );
              setWeatherData(weather);
            } catch (error) {
              console.error("Error fetching weather:", error);
              setLocation((prev) => ({
                ...prev,
                error: "Failed to fetch weather data",
              }));
              setShowError(true);
            }
          },
          (error) => {
            let errorMessage = "Failed to get location";
            switch (error.code) {
              case error.PERMISSION_DENIED:
                errorMessage = "Please allow location access to use this app";
                break;
              case error.POSITION_UNAVAILABLE:
                errorMessage = "Location information is unavailable";
                break;
              case error.TIMEOUT:
                errorMessage = "Location request timed out";
                break;
              default:
                errorMessage = "An unknown error occurred";
            }
            setLocation({
              latitude: 0,
              longitude: 0,
              loading: false,
              error: errorMessage,
            });
            setShowError(true);
          },

          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        setLocation({
          latitude: 0,
          longitude: 0,
          loading: false,
          error: "Geolocation is not supported by your browser",
        });
        setShowError(true);
      }
    };

    getLocation();
  }, []);

  const handleJournalSubmit = (newEntry: JournalEntry) => {
    setEntries((prev) => [newEntry, ...prev]);
    setSnackbar({
      open: true,
      message: "Entry added successfully",
      severity: "success",
    });
  };

  const handleUpdateEntry = (updatedEntry: JournalEntry) => {
    try {
      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === updatedEntry.id ? updatedEntry : entry
        )
      );
      setSnackbar({
        open: true,
        message: "Entry updated successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating entry:", error);
      setSnackbar({
        open: true,
        message: "Failed to update entry",
        severity: "error",
      });
    }
  };

  const handleDeleteEntry = (entryId: string) => {
    try {
      setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
      setSnackbar({
        open: true,
        message: "Entry deleted successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting entry:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete entry",
        severity: "error",
      });
    }
  };

  if (location.loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <LoadingSpinner />
        <Typography variant="h6" color="text.secondary">
          Getting your location...
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 2,
          mb: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          📍 {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
        </Typography>
      </Box>

      <MoodJournalForm
        onSubmit={handleJournalSubmit}
        weatherData={weatherData}
      />

      <JournalEntries
        entries={entries}
        sortConfig={sortConfig}
        onSortChange={setSortConfig}
        onUpdateEntry={handleUpdateEntry}
        onDeleteEntry={handleDeleteEntry}
      />

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {location.error}
        </Alert>
      </Snackbar>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DashboardPage;
