import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import {
  Container,
  Typography,
  Paper,
  Grid,
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

const Students = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("11");
  const [selectedSection, setSelectedSection] = useState("Science");

  const classOptions = ["11", "12"];
  const sectionOptions = ["Science", "Management", "Arts"];

  // Fetch student data based on selected class and section
  useEffect(() => {
    fetchStudents();
  }, [selectedClass, selectedSection]);

  const fetchStudents = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("students")
      .select("id, roll_no, name, phone, email, class, section");

    if (error) {
      console.error("Error fetching students:", error);
    } else {
      setStudents(data);
    }
    setLoading(false);
  };

  const filteredStudents = students.filter(
    (student) => student.class === selectedClass && student.section === selectedSection
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
        Student List
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
              <TableCell sx={{ fontWeight: "bold" }}>Roll No</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone No</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.roll_no}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.phone}</TableCell>
                  <TableCell>{student.email}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No students available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Students;
