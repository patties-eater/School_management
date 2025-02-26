import React from "react";
import {
  FiCreditCard
} from "react-icons/fi";
import {
  BsCurrencyDollar,
  BsShield,
} from "react-icons/bs";

export const links = [
  {
    title: "Dashboard",
    links: [
      {
        name: "Dashboard",
        icon: <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3h18v18H3z"></path>
          <path d="M9 3v18"></path>
          <path d="M15 3v18"></path>
        </svg>,
      },
    ],
  },

  {
    title: "Pages",
    links: [
      {
        name: "Attendance",
        icon: <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3h18v18H3z"></path>
          <path d="M9 15l3-3 3 3"></path>
          <path d="M9 12V3h6v9"></path>
        </svg>,
      },
      {
        name: "Timetable",
        icon: <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3h18v18H3z"></path>
          <path d="M3 6h18"></path>
          <path d="M6 6v12"></path>
          <path d="M10 6v12"></path>
          <path d="M14 6v12"></path>
          <path d="M18 6v12"></path>
        </svg>,
      },
      {
        name: "Fees",
        icon: <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"></path>
          <path d="M8 3v3"></path>
          <path d="M16 3v3"></path>
        </svg>,
      },
    ],
  },
];

export const themeColors = [
  {
    name: "blue-theme",
    color: "#1A97F5",
  },
  {
    name: "green-theme",
    color: "#03C9D7",
  },
  {
    name: "purple-theme",
    color: "#7352FF",
  },
  {
    name: "red-theme",
    color: "#FF5C8E",
  },
  {
    name: "indigo-theme",
    color: "#1E4DB7",
  },
  {
    color: "#FB9678",
    name: "orange-theme",
  },
];

export const userProfileData = [
  {
    icon: <BsCurrencyDollar />,
    title: "My Profile",
    desc: "Account Settings",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
  },
  {
    icon: <BsShield />,
    title: "My Inbox",
    desc: "Messages & Emails",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
  },
  {
    icon: <FiCreditCard />,
    title: "My Tasks",
    desc: "To-do and Daily Tasks",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
  },
];