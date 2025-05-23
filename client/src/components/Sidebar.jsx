import clsx from "clsx";
import React, { useState } from "react";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import AddUser from "./AddUser"; // ✅ Import the profile modal

const linkData = [
  { label: "Dashboard", link: "dashboard", icon: <MdDashboard /> },
  { label: "Tasks", link: "tasks", icon: <FaTasks /> },
  { label: "Completed", link: "completed/completed", icon: <MdTaskAlt /> },
  { label: "In Progress", link: "in-progress/in progress", icon: <MdOutlinePendingActions /> },
  { label: "To Do", link: "todo/todo", icon: <MdOutlinePendingActions /> },
  { label: "Users", link: "team", icon: <FaUsers /> },
  { label: "Trash", link: "trashed", icon: <FaTrashAlt /> },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 5);
  const [open, setOpen] = useState(false);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => (
    <Link
      onClick={closeSidebar}
      to={el.link}
      className={clsx(
        "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 dark:text-gray-400 text-base hover:bg-[#2564ed2d]",
        path === el.link.split("/")[0] ? "bg-purple-700 text-white" : ""
      )}
    >
      {el.icon}
      <span className='hover:text-[#2564ed]'>{el.label}</span>
    </Link>
  );

  return (
    <div className='flex flex-col w-full h-full gap-6 p-5'>
      <h1 className='flex items-center gap-1'>
        <p className='p-2 bg-purple-600 rounded-full'>
          <MdOutlineAddTask className='text-2xl font-black text-white' />
        </p>
        <span className='text-2xl font-bold text-black dark:text-white'>
          TaskNova
        </span>
      </h1>

      <div className='flex flex-col flex-1 py-8 gap-y-5'>
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>

      <div>
        <button
          className='flex items-center w-full gap-2 p-2 text-lg text-gray-800 dark:text-white'
          onClick={() => setOpen(true)} // ✅ Open profile modal
        >
          <MdSettings />
          <span>Settings</span>
        </button>
      </div>

      {/* ✅ Profile Modal */}
      <AddUser open={open} setOpen={setOpen} userData={user} />
    </div>
  );
};

export default Sidebar;
