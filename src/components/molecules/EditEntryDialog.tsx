import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import MoodSelector from "./MoodSelector";
import Input from "../atoms/Input";
import { JournalEntry } from "../../types";
import { MOOD_OPTIONS } from "../../constants";

interface EditEntryDialogProps {
  open: boolean;
  entry: JournalEntry;
  onClose: () => void;
  onSave: (updatedEntry: JournalEntry) => void;
}

const EditEntryDialog: React.FC<EditEntryDialogProps> = ({
  open,
  entry,
  onClose,
  onSave,
}) => {
  const [selectedMood, setSelectedMood] = useState(entry.mood.id);
  const [note, setNote] = useState(entry.note);

  const handleSave = () => {
    const selectedMoodData = MOOD_OPTIONS.find((m) => m.id === selectedMood);
    if (selectedMoodData) {
      onSave({
        ...entry,
        mood: selectedMoodData,
        note,
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Journal Entry</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <MoodSelector
            selectedMood={selectedMood}
            onSelect={setSelectedMood}
          />
          <Input
            multiline
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Write your thoughts..."
            sx={{
              mt: 3,
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!selectedMood || !note.trim()}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEntryDialog;
