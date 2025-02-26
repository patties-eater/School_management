import React from "react";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel, MdDashboard } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FaWallet, FaCheckCircle, FaChartLine, FaClock } from "react-icons/fa"; // Import icons
import PeopleIcon from "@mui/icons-material/People";

import { useStateContext } from "../contexts/ContextProvider";

const links = [
  {
    title: "Main",
    links: [
      {
        name: "Dashboard",
        icon: <MdDashboard />,
        route: "/dashboard"
      },
      {
        name: "Fees",
        icon: <FaWallet />,
        route: "/fees"
      },
      {
        name: "Attendance",
        icon: <FaCheckCircle />,
        route: "/attendance"
      },
      {
        name: "Marks",
        icon: <FaChartLine />,
        route: "/marks"
      },
      {
        name: "Timetable",
        icon: <FaClock />,
        route: "/timetable"
      },
      {
        name: "Students", 
        icon: <PeopleIcon />,
        route: "/students"
      }
    ],
  }
];

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize, currentColor } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 nav-item">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <span>Dhulabari Ma. Vi.</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link) => (
                  <NavLink
                    to={link.route} // Link to the route
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => (isActive ? { backgroundColor: currentColor } : {})}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
