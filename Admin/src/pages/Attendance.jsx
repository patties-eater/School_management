import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Select,
  MenuItem,
  CircularProgress,
  Box,
} from "@mui/material";

const Attendance = () => {
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedClass, setSelectedClass] = useState("11");
  const [selectedSection, setSelectedSection] = useState("Science");
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedDay, setSelectedDay] = useState(1);

  const yearOptions = ["2024", "2025"];
  const classOptions = ["11", "12"];
  const sectionOptions = ["Science", "Management", "Arts"];
  const monthOptions = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  useEffect(() => {
    fetchAttendance();
  }, [selectedYear, selectedClass, selectedSection, selectedMonth, selectedDay]);

  const fetchAttendance = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("attendance")
      .select("id, student_id, status, date, class, section");

    if (error) {
      console.error("Error fetching attendance:", error);
    } else {
      const formattedData = data.map((entry) => ({
        ...entry,
        year: new Date(entry.date).getFullYear().toString(),
        day: new Date(entry.date).getDate(),
        month: new Date(entry.date).toLocaleString("default", { month: "long" }),
      }));
      setAttendanceData(formattedData);
    }
    setLoading(false);
  };

  const updateAttendance = async (id, newStatus) => {
    await supabase.from("attendance").update({ status: newStatus }).eq("id", id);
    fetchAttendance();
  };

  const filteredAttendance = attendanceData.filter(
    (entry) =>
      entry.year === selectedYear &&
      entry.class === selectedClass &&
      entry.section === selectedSection &&
      entry.month === selectedMonth &&
      entry.day === selectedDay
  );

  // Sort the filtered attendance by student_id (roll number) from 1 to 40
  const sortedAttendance = filteredAttendance.sort((a, b) => a.student_id - b.student_id);

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
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Select Year
            </Typography>
            <Select fullWidth value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              {yearOptions.map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Select Date
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Select fullWidth value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                {monthOptions.map((month) => (
                  <MenuItem key={month} value={month}>{month}</MenuItem>
                ))}
              </Select>
              <Select fullWidth value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                {[...Array(31)].map((_, i) => (
                  <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                ))}
              </Select>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Select Class
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Select fullWidth value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                {classOptions.map((cls) => (
                  <MenuItem key={cls} value={cls}>Class {cls}</MenuItem>
                ))}
              </Select>
              <Select fullWidth value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
                {sectionOptions.map((section) => (
                  <MenuItem key={section} value={section}>{section}</MenuItem>
                ))}
              </Select>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {sortedAttendance.length > 0 ? (
          sortedAttendance.map((entry) => (
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
                height: 150, // Fixed height
              }}>
                <Typography variant="body2" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                  {entry.student_id}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => updateAttendance(entry.id, entry.status === "P" ? "X" : "P")}
                  sx={{
                    bgcolor: entry.status === "P" ? "green" : "red",
                    "&:hover": { bgcolor: entry.status === "P" ? "darkgreen" : "darkred" }
                  }}
                >
                  {entry.status}
                </Button>
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
