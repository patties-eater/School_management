import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Select,
  MenuItem,
  CircularProgress,
  Box,
  TextField,
  Button,
} from "@mui/material";

const Fees = () => {
  const [classes] = useState(["11-Science", "11-Management", "11-Arts", "12-Science", "12-Management", "12-Arts"]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedRoll, setSelectedRoll] = useState("");
  const [feeData, setFeeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paidFees, setPaidFees] = useState(0);  // To track updated paid fees

  // Fetch fee details when class and roll number are selected
  useEffect(() => {
    if (selectedClass && selectedRoll) {
      fetchFees();
    }
  }, [selectedClass, selectedRoll]);

  const fetchFees = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("fees")
      .select("*")
      .eq("class_id", selectedClass)
      .eq("student_id", selectedRoll)
      .single(); // Fetch a single record for the student

    if (error) {
      console.error("Error fetching fee data:", error);
      setFeeData(null);
    } else {
      setFeeData(data);
      setPaidFees(data.paid_fees); // Set the paid fees to be editable
    }
    setLoading(false);
  };

  const handlePaidFeeChange = (e) => {
    const updatedPaidFees = parseFloat(e.target.value) || 0;
    setPaidFees(updatedPaidFees);
  };

  const handleUpdatePaidFees = async () => {
    const updatedDueFees = feeData.total_fees - paidFees;
    
    const { error } = await supabase
      .from("fees")
      .update({
        paid_fees: paidFees,
        due_fees: updatedDueFees,
      })
      .eq("class_id", selectedClass)
      .eq("student_id", selectedRoll);

    if (error) {
      console.error("Error updating fee data:", error);
    } else {
      fetchFees(); // Refetch updated data after the update
    }
  };

  // Determine the payment status (Paid if fully paid, Unpaid if no payment)
  const paymentStatus = paidFees >= feeData?.total_fees
    ? "Paid"
    : paidFees === 0
    ? "Unpaid"
    : feeData?.payment_status;

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={8} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
          Student Fee Details
        </Typography>

        {/* Class and Section Dropdowns Side by Side */}
        <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>Select Class & Roll no.:</Typography>
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Select fullWidth value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            {classes.map((cls) => (
              <MenuItem key={cls} value={cls}>
                {cls}
              </MenuItem>
            ))}
          </Select>
          <Select fullWidth value={selectedRoll} onChange={(e) => setSelectedRoll(e.target.value)}>
            {[...Array(40)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>
                {i + 1}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Loading Indicator */}
        {loading && <CircularProgress sx={{ display: "block", mx: "auto", mt: 3 }} />}

        {/* Display Student Fee Details */}
        {feeData && (
          <Paper sx={{ p: 3, mt: 3, borderRadius: 2, bgcolor: "#f5f5f5" }}>
            <Typography variant="h5" align="center" fontWeight="bold">{feeData.student_name}</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}><Typography><b>Class:</b> {feeData.class_id}</Typography></Grid>
              <Grid item xs={6}><Typography><b>Roll No:</b> {feeData.student_id}</Typography></Grid>
              <Grid item xs={6}><Typography><b>Total Fees:</b> ₹{feeData.total_fees}</Typography></Grid>
              <Grid item xs={6}>
                <TextField
                  label="Paid Fees"
                  variant="outlined"
                  value={paidFees}
                  onChange={handlePaidFeeChange}
                  fullWidth
                  sx={{ mt: 1 }}
                  type="number"
                  inputProps={{ min: 0 }}
                />
              </Grid>
              <Grid item xs={6}><Typography><b>Due Fees:</b> ₹{feeData.total_fees - paidFees}</Typography></Grid>
              <Grid item xs={6}>
                <Typography sx={{ color: paymentStatus === "Paid" ? "green" : paymentStatus === "Unpaid" ? "red" : "orange" }}>
                  <b>Status:</b> {paymentStatus}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography><b>Last Payment Date:</b> {feeData.last_payment_date || "N/A"}</Typography>
              </Grid>
            </Grid>

            {/* Update Button */}
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdatePaidFees}
                disabled={paidFees <= 0}
              >
                Update Paid Fees
              </Button>
            </Box>
          </Paper>
        )}

        {/* No Data Found */}
        {selectedClass && selectedRoll && !loading && !feeData && (
          <Typography variant="h6" align="center" sx={{ mt: 3, color: "gray" }}>
            No fee records found for this student.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Fees;
