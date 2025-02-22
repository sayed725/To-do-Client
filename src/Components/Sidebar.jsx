import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import TaskModal from "./TaskModal";
import { FaTasks } from "react-icons/fa";



const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>

      {/* NavLinks */}
      <div className="mt-4 flex flex-col items-center gap-4">
        {/* Dashboard */}
        <div className="bg-white dark:bg-[#005694] dark:text-white text-black font-semibold border-2 border-[#005694] rounded-md text-lg py-2 px-4 flex items-center gap-2 w-full cursor-pointer">
          <MdDashboard size={25} className="text-[#0f2d3c]"/>
          Dashboard
        </div>
        {/*  Task Button */}
        <div
          className="bg-white text-black font-semibold border-2 dark:bg-[#005694] dark:text-white border-[#005694] text-lg py-2 px-4 rounded-md flex items-center gap-2 w-full cursor-pointer tracking-widest hover:underline underline-offset-2 duration-300"
          onClick={() => setIsModalOpen(true)} 
        >
          <FaTasks size={25} className="text-[#0f2d3c]" />
          Add Task
        </div>
        {/* Task Modal */}
        <TaskModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </div>
  );
};

export default Sidebar;