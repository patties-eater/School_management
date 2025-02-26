import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

const dashboardItems = [
  { title: "Fees", description: "Manage and track your fee payments", icon: <AccountBalanceWalletIcon fontSize="large" />, link: "/fees" },
  { title: "Attendance", description: "View your attendance record", icon: <CheckCircleIcon fontSize="large" />, link: "/attendance" },
  { title: "Marks", description: "Check your academic performance", icon: <TrendingUpIcon fontSize="large" />, link: "/marks" },
  { title: "Timetable", description: "View your current timetable", icon: <ScheduleIcon fontSize="large" />, link: "/timetable" },
];

const Dashboard = ({ selectedClass, selectedSection, selectedRollNo }) => {
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimetable = async () => {
      setLoading(true);
      console.log("Fetching timetable for:", selectedClass, selectedSection, selectedRollNo); // Log values

      try {
        const { data, error } = await supabase
          .from("timetable")
          .select("*")
          .eq("class", selectedClass)
          .eq("section", selectedSection)
          .eq("roll_no", selectedRollNo);

        if (error) {
          console.error("Error fetching timetable:", error);
        } else {
          console.log("Fetched timetable data:", data);  // Log the fetched data
          setTimetable(data);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedClass && selectedSection) {
      fetchTimetable();
    }
  }, [selectedClass, selectedSection ]); // Fetch when these values change

  return (
    <div className="p-5 dark:bg-gray-900 dark:text-white min-h-screen">
      <Grid container justifyContent="space-between" alignItems="center" className="mb-5">
        <Typography variant="h4" fontWeight="bold">Student Dashboard</Typography>
      </Grid>

      <Grid container spacing={3}>
        {dashboardItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Link to={item.link}>
              <Card className="text-center p-5 rounded-lg dark:bg-gray-800 shadow-lg">
                <CardContent>
                  {item.icon}
                  <Typography variant="h6" fontWeight="bold" className="mt-2">{item.title}</Typography>
                  <Typography variant="body2">{item.description}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>

      <div className="mt-8">
        <Typography variant="h5" className="mb-4">Timetable</Typography>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <table className="w-full text-left border-collapse dark:bg-gray-800">
            <thead>
              <tr className="border-b">
                <th className="p-2">Time Slot</th>
                <th className="p-2">Subject</th>
                <th className="p-2">Teacher</th>
              </tr>
            </thead>
            <tbody>
              {timetable.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-2 text-center">No timetable available</td>
                </tr>
              ) : (
                timetable.map((entry) => (
                  <tr key={entry.id} className="border-b">
                    <td className="p-2">{entry.time}</td>
                    <td className="p-2">{entry.subject}</td>
                    <td className="p-2">{entry.teacher}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
