import React from "react";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";

const ViewProfile = () => {
  // Assume user info is stored in Redux state under auth.user
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-purple-100 via-violet-200 to-purple-100 dark:from-[#1e1b4b] dark:to-[#312e81] rounded-2xl shadow-xl mt-10 text-gray-800 dark:text-gray-200">
      <div className="flex items-center space-x-6">
        <div className="text-6xl text-purple-600 dark:text-purple-400">
          <FaUserCircle />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user?.name || "John Doe"}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user?.email || "johndoe@example.com"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2">
        <div>
          <h4 className="text-sm font-semibold text-purple-700 dark:text-purple-300">Role</h4>
          <p className="text-lg">{user?.role || "User"}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-purple-700 dark:text-purple-300">Username</h4>
          <p className="text-lg">{user?.username || "john_doe"}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-purple-700 dark:text-purple-300">Phone</h4>
          <p className="text-lg">{user?.phone || "+91-9000000000"}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-purple-700 dark:text-purple-300">Joined</h4>
          <p className="text-lg">{new Date(user?.createdAt || Date.now()).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
