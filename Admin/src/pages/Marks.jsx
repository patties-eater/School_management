import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  Select,
  MenuItem,
  CircularProgress,
  FormControl,
  InputLabel,
 } from "@mui/material";
import { supabase } from "../supabaseClient";

const Marks = () => {
  const [classes] = useState(["11-Science", "11-Management", "11-Arts", "12-Science", "12-Management", "12-Arts"]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedRoll, setSelectedRoll] = useState("");
  const [marksData, setMarksData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch marks data when class and roll number are selected
  useEffect(() => {
    if (selectedClass && selectedRoll) {
      fetchMarks();
    }
  }, [selectedClass, selectedRoll]);

  const fetchMarks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("marks")
      .select("subject, th_grade, pr_grade, final_grade, grade_point")
      .eq("class_id", selectedClass)
      .eq("student_id", selectedRoll);

    if (error) {
      console.error("Error fetching marks data:", error);
      setMarksData([]);
    } else {
      setMarksData(data);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={8} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
          Student Marks Details
        </Typography>

        {/* Class Selection */}
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel>Class</InputLabel>
          <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} label="Class">
            {classes.map((cls) => (
              <MenuItem key={cls} value={cls}>
                {cls}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Roll No Selection (Visible only after selecting class) */}
        {selectedClass && (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Roll No</InputLabel>
            <Select value={selectedRoll} onChange={(e) => setSelectedRoll(e.target.value)} label="Roll No">
              {[...Array(40).keys()].map((num) => (
                <MenuItem key={num + 1} value={num + 1}>
                  {num + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Loading Indicator */}
        {loading && <CircularProgress sx={{ display: "block", mx: "auto", mt: 3 }} />}

        {/* Display Student Marks Details */}
        {marksData.length > 0 && (
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><b>S.N.</b></TableCell>
                  <TableCell><b>Subjects</b></TableCell>
                  <TableCell><b>TH Grade</b></TableCell>
                  <TableCell><b>PR Grade</b></TableCell>
                  <TableCell><b>Final Grade</b></TableCell>
                  <TableCell><b>Grade Point</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {marksData.map((subject, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{subject.subject}</TableCell>
                    <TableCell>{subject.th_grade}</TableCell>
                    <TableCell>{subject.pr_grade}</TableCell>
                    <TableCell>{subject.final_grade}</TableCell>
                    <TableCell>{subject.grade_point}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* No Data Found */}
        {selectedClass && selectedRoll && !loading && marksData.length === 0 && (
          <Typography variant="h6" align="center" sx={{ mt: 3, color: "gray" }}>
            No marks data found for this student.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Marks;
