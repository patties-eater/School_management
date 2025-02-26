import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Sidebar, ThemeSettings } from "./components";
import {
  Dashboard,
  Attendance,
  Timetable,
  Fees,
  Marks,
  Students,
} from "./pages";

import { useStateContext } from "./contexts/ContextProvider";

import "./styles/App.css";

const App = () => {
  // Destructure values from context
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
  } = useStateContext();

  // Apply dark mode dynamically to the document
  useEffect(() => {
    document.documentElement.classList.toggle("dark", currentMode === "Dark");
  }, [currentMode]);

  return (
    // Apply dark mode class if enabled
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

          {/* Sidebar - dynamically shown based on activeMenu state */}
          {activeMenu && (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          )}

          {/* Main content area */}
          <div
            className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
              activeMenu ? "md:ml-72" : "flex-2"
            }`}
          >
            {/* Navbar section - stays fixed at the top */}
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            {/* Theme settings panel (if enabled) */}
            {themeSettings && <ThemeSettings />}

            {/* Routes for different pages */}
            <Routes>
              {/* Dashboard */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/Dashboard" element={<Dashboard />} />

              {/* Pages */}
              <Route path="/Attendance" element={<Attendance/>} />
              <Route path="/Timetable" element={<Timetable />} />
              <Route path="/Fees" element={<Fees />} />
              <Route path="/Marks" element={<Marks />} />
              <Route path="/Students" element={<Students />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
