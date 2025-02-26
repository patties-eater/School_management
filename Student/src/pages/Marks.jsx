import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container } from "@mui/material";
import { supabase } from "../supabaseClient";

const Marks = ({ selectedClass, selectedSection, selectedRollNo }) => {
  const [marksData, setMarksData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarks = async () => {
      if (!selectedClass || !selectedSection || !selectedRollNo) {
        console.warn("Class, Section, or Roll Number not provided");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("marks")
          .select("id, subject, th_grade, pr_grade, final_grade, grade_point")
          .eq("class", selectedClass)
          .eq("section", selectedSection)
          .eq("roll_no", selectedRollNo)
          .order("id", { ascending: true });

        if (error) {
          console.error("Error fetching marks data:", error);
        } else {
          console.log("Fetched marks data:", data);  // Log the data to check
          setMarksData(data);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarks();  // Initial fetch

    const intervalId = setInterval(fetchMarks, 10000);  // Optional: re-fetch every 10 seconds for testing

    return () => clearInterval(intervalId);  // Cleanup interval
  }, [selectedClass, selectedSection, selectedRollNo]);

  if (loading) return <p className="text-center dark:text-gray-300">Loading...</p>;
  if (marksData.length === 0) return <p className="text-center dark:text-gray-300">No marks data available</p>;

  return (
    <Container maxWidth="md" className="min-h-screen p-5 dark:bg-gray-900 dark:text-white flex items-center justify-center">
      <Paper elevation={8} className="p-8 rounded-2xl dark:bg-gray-800 dark:border dark:border-gray-700 shadow-xl w-full">
        <Typography variant="h4" className="text-center font-extrabold dark:text-white mb-6">
          Student Marks Details
        </Typography>
        <TableContainer component={Paper} className="dark:bg-gray-800 rounded-xl">
          <Table>
            <TableHead className="bg-gray-200 dark:bg-gray-700">
              <TableRow>
                <TableCell className="dark:text-white"><b>S.N.</b></TableCell>
                <TableCell className="dark:text-white"><b>Subjects</b></TableCell>
                <TableCell className="dark:text-white"><b>TH Grade</b></TableCell>
                <TableCell className="dark:text-white"><b>PR Grade</b></TableCell>
                <TableCell className="dark:text-white"><b>Final Grade</b></TableCell>
                <TableCell className="dark:text-white"><b>Grade Point</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {marksData.map((student, index) => (
                <TableRow key={student.id} className="dark:hover:bg-gray-700">
                  <TableCell className="dark:text-gray-300">{index + 1}</TableCell>
                  <TableCell className="dark:text-gray-300">{student.subject}</TableCell>
                  <TableCell className="dark:text-gray-300">{student.th_grade}</TableCell>
                  <TableCell className="dark:text-gray-300">{student.pr_grade}</TableCell>
                  <TableCell className="dark:text-gray-300">{student.final_grade}</TableCell>
                  <TableCell className="dark:text-gray-300">{student.grade_point}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Marks;


