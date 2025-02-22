import { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import { IoMenu } from "react-icons/io5";
import { AuthContext } from "../providers/AuthProvider";
import Sidebar from "../Components/Sidebar";
import Task from "../Components/Task";

const Home = () => {
  const { user } = useContext(AuthContext);
  // for responsive menu close & open --->
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <div className="w-full flex">
      {/* left side navigation panel */}
      <div
        className={`fixed xl:relative top-0 ${
          isSidebarOpen ? "left-0" : "-left-full"
        } xl:left-0 min-w-2/12 xl:w-3/12 max-w-[300px] md:max-w-[200px] min-h-screen dark:bg-[#20293d]  bg-[#0f2d3c] p-5 transition-all duration-500 z-50`}
      >
        <Sidebar onToggleSidebar={toggleSidebar} />
      </div>
      {/* right side dashboard content */}
      <div className="w-full bg-[#f6f6f6] ">
        {/* Mobile menu open & close button */}
        <button
          className="xl:hidden p-3 text-[#005694] bg-white   shadow-lg border absolute top-16 right-0 z-50"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? (
            <MdClose size={27} className="text-[#005694]" />
          ) : (
            <IoMenu size={27} className="text-[#005694]" />
          )}
        </button>
        {/* Mobile menu open & close button */}
        <div className="p-4 sm:p-8 bg-base-200 h-full dark:bg-[#060817] dark:text-white  ">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold ">
              Welcome, {user?.displayName}
            </h1>
            <h1 className="w-full md:w-2/3 mt-2 text-lg md:text-xl font-medium ">
             Add, update, Delete, and View your tasks.
            </h1>
          </div>
          {/* Tasks */}
          <div className="mt-8">
            <Task></Task>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;