import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";

const Attendance = ({ userData }) => {
  // Check if userData is available and provide fallback defaults if not
  const { rollNo = "", classSection = "", section = "" } = userData || {}; // Default to empty object if userData is undefined

  // State hooks that should always be called
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedMonth, setSelectedMonth] = useState("January");

  useEffect(() => {
    fetchAttendance();
  }, [selectedYear, selectedMonth]);

  const fetchAttendance = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("attendance")
      .select("id, roll_no, status, date, class, section");

    if (error) {
      console.error("Error fetching attendance:", error);
    } else {
      console.log("Fetched data:", data); // Log fetched data to debug
      const formattedData = data.map((entry) => ({
        ...entry,
        year: new Date(entry.date).getFullYear().toString(),
        month: new Date(entry.date).toLocaleString("default", { month: "long" }),
        day: new Date(entry.date).getDate(),
      }));
      setAttendanceData(formattedData);
    }
    setLoading(false);
  };

  const filteredAttendance = attendanceData.filter(
    (entry) =>
      entry.year === selectedYear &&
      entry.month === selectedMonth &&
      entry.class === classSection &&
      entry.section === section &&
      entry.roll_no === rollNo // Filter by rollNo
  );

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
        Attendance Record
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Select Year
            </Typography>
            <Select
              fullWidth
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {["2024", "2025"].map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Select Month
            </Typography>
            <Select
              fullWidth
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {[
                "January", "February", "March", "April", "May", "June", "July", "August",
                "September", "October", "November", "December"
              ].map((month) => (
                <MenuItem key={month} value={month}>{month}</MenuItem>
              ))}
            </Select>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {filteredAttendance.length > 0 ? (
          filteredAttendance.map((entry) => (
            <Grid item xs={3} sm={2} key={entry.id}>
              <Paper sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 1,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                height: 150,
              }}>
                <Typography variant="body2" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                  Day {entry.day}
                </Typography>
                <Box
                  sx={{
                    bgcolor: entry.status === "P" ? "green" : "red",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "5px",
                  }}
                >
                  {entry.status === "P" ? "Present" : "Absent"}
                </Box>
              </Paper>
            </Grid>
          ))
        ) : (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="body1">No records found for this selection.</Typography>
          </Box>
        )}
      </Grid>
    </Container>
  );
};

export default Attendance;
