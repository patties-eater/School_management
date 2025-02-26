import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Link } from "react-router-dom"; // Use Link to add navigation

const adminDashboardItems = [
  { title: "Students", description: "Manage student records", icon: <PeopleIcon fontSize="large" className="dark:text-white" />, route: "/students" },
  { title: "Attendance", description: "Monitor student attendance", icon: <AssignmentIcon fontSize="large" className="dark:text-white" />, route: "/attendance" },
  { title: "Fees", description: "Manage student fees", icon: <PeopleIcon fontSize="large" className="dark:text-white" />, route: "/fees" },
  { title: "Marks", description: "View student marks", icon: <InsertChartIcon fontSize="large" className="dark:text-white" />, route: "/marks" },
  { title: "Timetable", description: "View student timetable", icon: <AssignmentIcon fontSize="large" className="dark:text-white" />, route: "/timetable" },
];

const Dashboard = () => {
  return (
    <div className="p-5 dark:bg-gray-900 dark:text-white min-h-screen">
      <Grid container justifyContent="space-between" alignItems="center" className="mb-5">
        <Typography variant="h4" fontWeight="bold" className="dark:text-white">Admin Dashboard</Typography>
      </Grid>

      <Grid container spacing={3}>
        {adminDashboardItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Link to={item.route} style={{ textDecoration: 'none' }}>
              <Card className="text-center p-5 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow-lg">
                <CardContent>
                  {item.icon}
                  <Typography variant="h6" fontWeight="bold" className="mt-2 dark:text-white">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" className="dark:text-gray-300">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
