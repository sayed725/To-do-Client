import { useState } from "react";
import { GoTasklist } from "react-icons/go";
import { MdDashboard } from "react-icons/md";
import TaskModal from "./TaskModal";
import { FaTasks } from "react-icons/fa";



const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>

      <div className="">
        <h1 className="text-center text-2xl font-bold text-white tracking-widest underline underline-offset-2 flex items-center gap-2 justify-center">
          <FaTasks className="mt-1" size={25} />
          Task
        </h1>
      </div>
      {/* NavLinks */}
      <div className="mt-4 flex flex-col items-center gap-4">
        {/* Dashboard */}
        <div className="bg-white text-black font-semibold border-2 border-white rounded-md text-lg py-2 px-4 flex items-center gap-2 w-full cursor-pointer">
          <MdDashboard size={25} className="text-[#005694]"/>
          Dashboard
        </div>
        {/*  Task Button */}
        <div
          className="bg-white text-black font-semibold border-2 border-white text-lg py-2 px-4 rounded-md flex items-center gap-2 w-full cursor-pointer tracking-widest hover:underline underline-offset-2 duration-300"
          onClick={() => setIsModalOpen(true)} 
        >
          <FaTasks size={25} className="text-[#005694]" />
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