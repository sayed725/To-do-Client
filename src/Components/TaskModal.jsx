import { RxCross1 } from "react-icons/rx";

import axios from "axios";
import Swal from "sweetalert2";

import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useTasks from "../Hooks/useTasks";
import toast from "react-hot-toast";

const TaskModal = ({ isModalOpen, setIsModalOpen }) => {
  const { user } = useContext(AuthContext);
  const [, , refetch] = useTasks();
  

  // Function for post task in db --->
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const task = {
      title,
      description,
      category: "to-do",
      timestamp: new Date().toLocaleString(),
      email: user.email,
      username: user.displayName,
    };
    try {
      // Post task in db --->
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/add-task`, task);
      // Show Success Modal --->
      if (data.insertedId) {
        refetch();
        form.reset();
        setIsModalOpen(false);
       toast.success("Task Added Successfully");
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };
  return (
    <div
      className={`${
        isModalOpen ? "visible" : "invisible"
      } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#171717b9] transition-all duration-300 flex items-center justify-center`}
    >
      <div
        className={`${
          isModalOpen ? "scale-[1] opacity-100" : "scale-[0] opacity-0"
        } w-[90%] sm:w-[80%] md:w-[70%] lg:w-[40%] bg-white rounded-lg transition-all duration-300 mx-auto mt-8`}
      >
        <div className="w-full flex p-5 justify-between items-center">
          <div>
            <h1 className="mt-[2px] text-4xl  font-bold">Add A Task</h1>
          </div>
          <button onClick={() => setIsModalOpen(false)} className="btn btn-ghost text-2xl">✕</button>
        </div>
        {/* Task Form  */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Task Title */}
          <div className="w-full md:w-[100%]">
            <label htmlFor="title" className="text-[15px] text-text font-[500]">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300 transition-colors duration-300"
            />
          </div>
          {/* Title Description */}
          <div className="w-full md:w-[100%]">
            <label
              htmlFor="description"
              className="font-[500] text-[15px] text-text"
            >
              Description
            </label>
            <textarea
              name="description"
              placeholder="Task Description"
              className="border-border border rounded-md outline-none mt-1 px-4 w-full py-3 min-h-[250px] focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300 transition-colors duration-300"
            />
          </div>
          {/* Submit Button */}
          <div className="w-full mx-auto">
            <button
              type="submit"
              className="btn w-full hover:bg-[#0f2d3c] bg-[#0f2d3c] text-white font-semibold "
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;