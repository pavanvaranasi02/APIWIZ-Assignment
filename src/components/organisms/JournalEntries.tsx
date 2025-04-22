import React, { useState } from "react";
import {
  Box,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Pagination,
  IconButton,
  Menu,
  Card,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FilterListIcon from "@mui/icons-material/FilterList";
import JournalCalendar from "../molecules/JournalCalendar";
import Typography from "../atoms/Typography";
import { format } from "date-fns";
import { JournalEntry, SortConfig, SortOrder } from "../../types";
import dayjs from "dayjs";
import { MOOD_OPTIONS } from "../../constants";
import ConfirmDialog from "../molecules/ConfirmDialog";
import EditEntryDialog from "../molecules/EditEntryDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface JournalEntriesProps {
  entries: JournalEntry[];
  sortConfig: SortConfig;
  onSortChange: (newSort: SortConfig) => void;
  onUpdateEntry: (updatedEntry: JournalEntry) => void;
  onDeleteEntry: (entryId: string) => void;
}

const JournalEntries: React.FC<JournalEntriesProps> = ({
  entries,
  sortConfig,
  onSortChange,
  onUpdateEntry,
  onDeleteEntry,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [editEntry, setEditEntry] = useState<JournalEntry | null>(null);
  const [deleteEntry, setDeleteEntry] = useState<JournalEntry | null>(null);
  const [actionEntryId, setActionEntryId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [moodFilterAnchorEl, setMoodFilterAnchorEl] =
    useState<null | HTMLElement>(null);

  const ITEMS_PER_PAGE = 6;

  const handleEditClick = (entry: JournalEntry) => {
    setEditEntry(entry);
    setFilterAnchorEl(null);
  };

  const handleDeleteClick = (entry: JournalEntry) => {
    setDeleteEntry(entry);
    setFilterAnchorEl(null);
  };

  const handleConfirmDelete = () => {
    if (deleteEntry) {
      onDeleteEntry(deleteEntry.id);
      setDeleteEntry(null);
    }
  };

  const handleUpdate = (updatedEntry: JournalEntry) => {
    onUpdateEntry(updatedEntry);
    setEditEntry(null);
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesDate = selectedDate
      ? dayjs(entry.date).format("YYYY-MM-DD") ===
        dayjs(selectedDate).format("YYYY-MM-DD")
      : true;
    const matchesMood = selectedMood ? entry.mood.id === selectedMood : true;
    return matchesDate && matchesMood;
  });

  const sortedEntries = [...filteredEntries].sort((a, b) => {
    if (sortConfig.field === "date") {
      return sortConfig.order === "desc"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime();
    } else {
      return sortConfig.order === "desc"
        ? b.weather.main.temp - a.weather.main.temp
        : a.weather.main.temp - b.weather.main.temp;
    }
  });

  const paginatedEntries = sortedEntries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleMoodFilter = (moodId: string) => {
    setSelectedMood(selectedMood === moodId ? null : moodId);
    setMoodFilterAnchorEl(null);
    setCurrentPage(1);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <JournalCalendar
              entries={entries}
              onDateSelect={(date) => {
                setSelectedDate(date);
                setCurrentPage(1); 
              }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <FormControl
              size="small"
              sx={{
                minWidth: 200,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            >
              <Select
                value={`${sortConfig.field}-${sortConfig.order}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split("-");
                  onSortChange({
                    field: field as "date" | "temperature",
                    order: order as SortOrder,
                  });
                }}
              >
                <MenuItem value="date-desc">Date (Newest First)</MenuItem>
                <MenuItem value="date-asc">Date (Oldest First)</MenuItem>
                <MenuItem value="temperature-desc">
                  Temperature (High to Low)
                </MenuItem>
                <MenuItem value="temperature-asc">
                  Temperature (Low to High)
                </MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {selectedMood && (
                <Typography variant="body2" color="text.secondary">
                  Filtered by:{" "}
                  {MOOD_OPTIONS.find((m) => m.id === selectedMood)?.name}
                </Typography>
              )}
              <IconButton
                onClick={(e) => setMoodFilterAnchorEl(e.currentTarget)}
              >
                <FilterListIcon />
              </IconButton>
            </Box>
          </Box>

          <Grid container spacing={2}>
            {paginatedEntries.map((entry) => (
              <Grid item xs={12} md={6} key={entry.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    p: 3,
                    borderRadius: 2,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                      gap: 2,
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1.1rem",
                        color: "#2C3E50",
                      }}
                    >
                      {format(new Date(entry.date), "MMMM dd, yyyy")}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        {Math.round(entry.weather.main.temp)}°C
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          setActionEntryId(entry.id);
                          setFilterAnchorEl(e.currentTarget);
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        backgroundColor: entry.mood.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.2rem",
                      }}
                    >
                      {entry.mood.icon}
                    </Box>
                    <Typography variant="body1">{entry.mood.name}</Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      color: "#5D6D7E",
                      lineHeight: 1.6,
                      flex: 1,
                    }}
                  >
                    {entry.note}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Menu
            anchorEl={moodFilterAnchorEl}
            open={Boolean(moodFilterAnchorEl)}
            onClose={() => setMoodFilterAnchorEl(null)}
          >
            {MOOD_OPTIONS.map((mood) => (
              <MenuItem
                key={mood.id}
                onClick={() => handleMoodFilter(mood.id)}
                selected={selectedMood === mood.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <span>{mood.icon}</span>
                <span>{mood.name}</span>
              </MenuItem>
            ))}
          </Menu>

          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={() => setFilterAnchorEl(null)}
          >
            <MenuItem
              onClick={() => {
                const entry = entries.find((e) => e.id === actionEntryId);
                if (entry) handleEditClick(entry);
              }}
            >
              <EditIcon sx={{ mr: 1 }} />
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                const entry = entries.find((e) => e.id === actionEntryId);
                if (entry) handleDeleteClick(entry);
              }}
              sx={{ color: "error.main" }}
            >
              <DeleteIcon sx={{ mr: 1 }} />
              Delete
            </MenuItem>
          </Menu>

          {editEntry && (
            <EditEntryDialog
              open={Boolean(editEntry)}
              entry={editEntry}
              onClose={() => setEditEntry(null)}
              onSave={handleUpdate}
            />
          )}

          <ConfirmDialog
            open={Boolean(deleteEntry)}
            title="Delete Entry"
            message="Are you sure you want to delete this journal entry? This action cannot be undone."
            onConfirm={handleConfirmDelete}
            onCancel={() => setDeleteEntry(null)}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 3,
            }}
          >
            <Pagination
              count={Math.ceil(sortedEntries.length / ITEMS_PER_PAGE)}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              color="primary"
              size="medium"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default JournalEntries;
