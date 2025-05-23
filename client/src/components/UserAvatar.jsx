import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLogoutMutation } from "../redux/slices/api/authApiSlice";
import { logout } from "../redux/slices/authSlice";
import { getInitials } from "../utils";
import AddUser from "./AddUser";
import ChangePassword from "./ChangePassword";

const UserAvatar = () => {
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/log-in");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="flex items-center justify-center w-10 h-10 transition-transform rounded-full shadow-lg 2xl:w-12 2xl:h-12 bg-gradient-to-br from-purple-600 to-violet-600 hover:scale-105">
          <span className="text-lg font-semibold text-white">
            {getInitials(user?.name)}
          </span>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-50 mt-3 origin-top-right bg-white divide-y divide-gray-100 shadow-2xl w-60 rounded-xl dark:bg-zinc-900 ring-1 ring-black/10 focus:outline-none dark:divide-gray-700">
            <div className="p-3">
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                Signed in as
              </p>
              <p className="font-medium text-gray-800 dark:text-gray-100">
                {user?.name || "John Doe"}
              </p>
              <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                {user?.email || "johndoe@example.com"}
              </p>
            </div>

            <div className="py-2">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setOpen(true)}
                    className={`${
                      active ? "bg-gray-100 dark:bg-zinc-800" : ""
                    } w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 flex items-center gap-2`}
                  >
                    <FaUser className="text-purple-500" />
                    Profile
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setOpenPassword(true)}
                    className={`${
                      active ? "bg-gray-100 dark:bg-zinc-800" : ""
                    } w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 flex items-center gap-2`}
                  >
                    <FaUserLock className="text-yellow-500" />
                    Change Password
                  </button>
                )}
              </Menu.Item>
            </div>

            <div className="py-2">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logoutHandler}
                    className={`${
                      active ? "bg-red-50 dark:bg-red-900/20" : ""
                    } w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-2`}
                  >
                    <IoLogOutOutline />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <AddUser open={open} setOpen={setOpen} userData={user} />
      <ChangePassword open={openPassword} setOpen={setOpenPassword} />
    </>
  );
};

export default UserAvatar;
