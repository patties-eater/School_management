import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import { Dashboard, Attendance, Timetable, Fees, Marks } from "./pages";
import { useStateContext } from "./contexts/ContextProvider";
import Form from "./components/Form"; // Import the form component

import "./styles/App.css";

const App = () => {
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
  } = useStateContext();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", currentMode === "Dark");
  }, [currentMode]);

  // Load user data from localStorage
  const savedData = JSON.parse(localStorage.getItem("userData"));
  const [userData, setUserData] = useState(savedData);

  useEffect(() => {
    // Log user data to confirm structure
    console.log("User data loaded:", savedData);

    // Check if the necessary user data is present
    if (!savedData || !savedData.classSection || !savedData.section || !savedData.rollNo) {
      console.error("User data is incomplete.");
      // Optionally redirect to login page or handle incomplete data
    }
  }, [savedData]);

  const handleFormSubmit = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
    setUserData(data);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUserData(null);
  };

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          {/* Floating settings button */}
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                style={{ borderRadius: "50%", background: currentColor }}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>

          {/* Sidebar */}
          {activeMenu && (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          )}

          {/* Main content area */}
          <div
            className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${activeMenu ? "md:ml-72" : "flex-2"}`}
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            {/* Theme settings panel */}
            {themeSettings && <ThemeSettings />}

            {/* Routes */}
            <Routes>
              {/* If user is not logged in or incomplete user data */}
              {!userData || !userData.classSection || !userData.section || !userData.rollNo ? (
                <Route path="/" element={<Form onSubmit={handleFormSubmit} />} />
              ) : (
                <>
                  {/* Pass user data as props to the pages */}
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/Dashboard" element={<Dashboard />} />
                  <Route path="/Attendance" element={<Attendance />} />
                  <Route
                    path="/Timetable"
                    element={
                      <Timetable
                        classSection={userData?.classSection}  // Pass classSection from userData
                        section={userData?.section}  // Pass section from userData
                      />
                    }
                  />
                  <Route
                    path="/Fees"
                    element={
                      <Fees
                        selectedClass={userData?.classSection}
                        selectedSection={userData?.section}
                        selectedRollNo={userData?.rollNo}
                      />
                    }
                  />
                  <Route
                    path="/Marks"
                    element={
                      <Marks
                        selectedClass={userData?.classSection}
                        selectedSection={userData?.section}
                        selectedRollNo={userData?.rollNo}
                      />
                    }
                  />
                </>
              )}
            </Routes>

            {/* Logout button */}
            {userData && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
