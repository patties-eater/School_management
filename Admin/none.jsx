import React, { useContext } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { People, List, CalendarMonth, Quiz, Event, Article, Book, Grade, Settings, Tune } from "@mui/icons-material";

const items = [
  { icon: <People />, label: "Attendance" },
  { icon: <List />, label: "Class List" },
  { icon: <CalendarMonth />, label: "Timetable" },
  { icon: <Quiz />, label: "Exam" },
  { icon: <Event />, label: "Calendar" },
  { icon: <Article />, label: "News" },
  { icon: <Book />, label: "Homework" },
  { icon: <Grade />, label: "Exam Result" },
  { icon: <Settings />, label: "Settings" },
  { icon: <Tune />, label: "Configuration" }
];


const Dashboard = () => {
  const { currentColor, currentMode } = useStateContext();

  return (
    <div>
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {items.map((item, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Card sx={{ textAlign: "center", p: 2, cursor: "pointer", boxShadow: 3 }}>
              <CardContent>
                <Box sx={{ fontSize: 40, color: "primary.main" }}>{item.icon}</Box>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>{item.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </div>
  );
};

export default Dashboard;

