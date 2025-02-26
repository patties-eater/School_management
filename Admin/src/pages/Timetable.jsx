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
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Timetable = () => {
  const [loading, setLoading] = useState(true);
  const [timetableData, setTimetableData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("11");
  const [selectedSection, setSelectedSection] = useState("Science");

  const classOptions = ["11", "12"];
  const sectionOptions = ["Science", "Management", "Arts"];

  // Fetch timetable data based on selected class and section
  useEffect(() => {
    fetchTimetable();
  }, [selectedClass, selectedSection]);

  const fetchTimetable = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("timetable")
      .select("id, subject, teacher, time, class, section");

    if (error) {
      console.error("Error fetching timetable:", error);
    } else {
      setTimetableData(data);
    }
    setLoading(false);
  };

  const filteredTimetable = timetableData.filter(
    (entry) => entry.class === selectedClass && entry.section === selectedSection
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
        Timetable
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Select Class and Section
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Select fullWidth value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                {classOptions.map((cls) => (
                  <MenuItem key={cls} value={cls}>
                    Class {cls}
                  </MenuItem>
                ))}
              </Select>
              <Select fullWidth value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
                {sectionOptions.map((section) => (
                  <MenuItem key={section} value={section}>
                    {section}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Time Slot</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Subject</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Teacher</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTimetable.length > 0 ? (
              filteredTimetable.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.time}</TableCell>
                  <TableCell>{entry.subject}</TableCell>
                  <TableCell>{entry.teacher}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No timetable available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Timetable;
