import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { Navbar, Sidebar } from "./components";
import { Dashboard, Login, Register, TaskDetail, Tasks, Trash, Users } from "./pages"; // ✅ Register added
import { setOpenSidebar } from "./redux/slices/authSlice";

function Layout() {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  return user ? (
    <div className='flex flex-col w-full h-screen md:flex-row'>
      <div className='w-1/5 h-screen bg-white dark:bg-[#1f1f1f] sticky top-0 hidden md:block'>
        <Sidebar />
      </div>

      <MobileSidebar />

      <div className='flex-1 overflow-y-auto'>
        <Navbar />
        <div className='p-4 2xl:px-10'>
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to='/log-in' state={{ from: location }} replace />
  );
}

const MobileSidebar = () => {
  const { isSidebarOpen } = useSelector((state) => state.auth);
  const mobileMenuRef = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();

  const closeSidebar = () => dispatch(setOpenSidebar(false));

  useEffect(() => {
    closeSidebar();
  }, [location.pathname]);

  return (
    <Transition
      show={isSidebarOpen}
      as={Fragment}
      enter='transition-opacity duration-300'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity duration-300'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div
        ref={(node) => (mobileMenuRef.current = node)}
        className='fixed inset-0 z-50 flex md:hidden bg-black/40'
        onClick={closeSidebar}
      >
        <div
          className='w-3/4 h-full transition-transform duration-300 ease-in-out transform bg-white dark:bg-[#1f1f1f]'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex justify-end w-full px-5 pt-5'>
            <button onClick={closeSidebar}>
              <IoMdClose size={25} />
            </button>
          </div>

          <div className='-mt-10'>
            <Sidebar />
          </div>
        </div>
      </div>
    </Transition>
  );
};

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const theme = "light"; // If you want dark mode support, make this dynamic

  return (
    <main className={theme}>
      <div className='w-full min-h-screen bg-[#f3f4f6] dark:bg-[#0d0d0df4]'>
        <Routes>
          {/* Public routes */}
          <Route path="/log-in" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes inside layout */}
          <Route element={<Layout />}>
            <Route path='/' element={<Navigate to='/dashboard' />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/tasks' element={<Tasks />} />
            <Route path='/completed/:status?' element={<Tasks />} />
            <Route path='/in-progress/:status?' element={<Tasks />} />
            <Route path='/todo/:status?' element={<Tasks />} />
            <Route path='/trashed' element={<Trash />} />
            <Route path='/task/:id' element={<TaskDetail />} />
            <Route path='/team' element={<Users />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>

      <Toaster richColors position="top-center" />
    </main>
  );
};

export default App;
