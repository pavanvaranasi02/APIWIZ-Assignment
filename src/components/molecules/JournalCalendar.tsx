import React from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { JournalEntry } from "../../types";
import dayjs, { Dayjs } from "dayjs";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";

interface JournalCalendarProps {
  entries: JournalEntry[];
  onDateSelect: (date: Date) => void;
}

const EntryIndicator = styled(Box)<{ bgcolor: string }>(({ bgcolor }) => ({
  width: "5px",
  height: "5px",
  borderRadius: "50%",
  backgroundColor: bgcolor,
  position: "absolute",
  bottom: "2px",
  left: "50%",
  transform: "translateX(-50%)",
}));

const JournalCalendar: React.FC<JournalCalendarProps> = ({
  entries,
  onDateSelect,
}) => {
  const entryDates = entries.reduce((acc, entry) => {
    const date = dayjs(entry.date).format("YYYY-MM-DD");
    acc[date] = entry.mood.color;
    return acc;
  }, {} as Record<string, string>);

  const ServerDay = (props: PickersDayProps<Dayjs>) => {
    const { day, outsideCurrentMonth, ...other } = props;
    const dateStr = day.format("YYYY-MM-DD");
    const hasEntry = dateStr in entryDates;

    return (
      <Box
        sx={{
          position: "relative",
          "& .MuiPickersDay-root": {
            margin: 0,
          },
        }}
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
          sx={{
            backgroundColor: hasEntry
              ? `${entryDates[dateStr]}20`
              : "transparent",
            "&:hover": {
              backgroundColor: hasEntry
                ? `${entryDates[dateStr]}30`
                : "rgba(0,0,0,0.04)",
            },
          }}
        />
        {hasEntry && <EntryIndicator bgcolor={entryDates[dateStr]} />}
      </Box>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        onChange={(newDate) => {
          if (newDate) {
            onDateSelect(newDate.toDate());
          }
        }}
        slots={{
          day: ServerDay,
        }}
        sx={{
          "& .MuiPickersDay-root": {
            borderRadius: "50%",
            "&.Mui-selected": {
              backgroundColor: "primary.main",
              color: "white",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default JournalCalendar;
