import axios from "axios";



import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useTasks from "../Hooks/useTasks";
import toast from "react-hot-toast";

const UpdateModal = ({ task }) => {
  const { user } = useContext(AuthContext);
  const [, , refetch] = useTasks();
  const categoryOption = ["to-do", "in-progress", "done"];
  const [selectedItem, setSelectedItem] = useState(task.category);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = selectedItem;
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/update-task/${task._id}`, {
        title,
        description,
        category,
      });
      if (data.modifiedCount) {
        refetch();
        document.getElementById(`modal-${task._id}`).close();
        toast.success("Task Updated Successfully");
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  return (
    <dialog id={`modal-${task._id}`} className="modal text-left">
      <div className="modal-box text-black dark:bg-[#20293d] dark:text-white">
        <div className="w-full flex justify-between items-stretch text-black dark:text-white">
          <div>
            <h1 className="mt-[2px] text-4xl font-bold text-left">
              Update Your Task
            </h1>
          </div>
          <form method="dialog">
            <button className="btn btn-ghost btn-circle text-2xl">✕</button>
          </form>
        </div>
        {/*   Form  */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/*  Title */}
          <div className="w-full md:w-[100%]">
            <label htmlFor="title">
            Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={task.title}
              placeholder="Task Title"
              className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300 transition-colors duration-300"
            />
          </div>
          {/*  Description */}
          <div className="w-full md:w-[100%]">
            <label
              htmlFor="description"
            >
            Description
            </label>
            <textarea
              name="description"
              defaultValue={task.description}
              placeholder="Task Description"
              className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300 transition-colors duration-300"
            />
          </div>
          {/*  Category */}
          <div className="w-full md:w-[100%]">
            <label
              htmlFor="description"

            >
            Category
            </label>
            <select
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              className="mt-3 select select-bordered w-full dark:bg-[#20293d]"
            >
              {categoryOption.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {/* Submit Button */}
          <div className="w-full pt-3 mx-auto">
            <button
              type="submit"
              className="btn w-full hover:bg-[#0f2d3c] dark:bg-[#005694] dark:hover:bg-[#005694] bg-[#0f2d3c] text-white font-semibold  "
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default UpdateModal;