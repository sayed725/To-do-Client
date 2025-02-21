import axios from "axios";
import Swal from "sweetalert2";


import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useTasks from "../Hooks/useTasks";

const UpdateModal = ({ task }) => {
  const { user } = useContext(AuthContext);
  const [, , refetch] = useTasks();
  const api_url = import.meta.env.VITE_API_URL;
  const categoryOption = ["to-do", "in-progress", "done"];
  const [selectedItem, setSelectedItem] = useState(task.category);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const category = selectedItem;
    try {
      const { data } = await axios.put(`${api_url}/update-task/${task._id}`, {
        title,
        description,
        category,
      });
      if (data.modifiedCount) {
        refetch();
        document.getElementById(`modal-${task._id}`).close();
        Swal.fire({
          icon: "success",
          title: "Task Updated Successfully",
        });
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: error.message });
    }
  };

  return (
    <dialog id={`modal-${task._id}`} className="modal text-left">
      <div className="modal-box text-black">
        <div className="w-full flex justify-between items-stretch text-black">
          <div>
            <h1 className="mt-[2px] text-4xl font-bold text-left">
              Update Your Task
            </h1>
          </div>
          <form method="dialog">
            <button className="btn btn-ghost btn-circle text-2xl">✕</button>
          </form>
        </div>
        {/* Update Task Form  */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Task Title */}
          <div className="w-full md:w-[100%]">
            <label htmlFor="title" className="text-[15px] text-text font-[500]">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={task.title}
              placeholder="Task Title"
              className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300 transition-colors duration-300"
            />
          </div>
          {/* Task Description */}
          <div className="w-full md:w-[100%]">
            <label
              htmlFor="description"
              className="font-[500] text-[15px] text-text"
            >
              Task Description
            </label>
            <textarea
              name="description"
              defaultValue={task.description}
              placeholder="Task Description"
              className="border-border border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300 transition-colors duration-300"
            />
          </div>
          {/* Task Category */}
          <div className="w-full md:w-[100%]">
            <label
              htmlFor="description"
              className="font-[500] text-[15px] text-text"
            >
              Update Category
            </label>
            <select
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              className="mt-3 select select-bordered w-full"
            >
              {categoryOption.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          {/* Submit Button */}
          <div className="w-2/3 mx-auto">
            <button
              type="submit"
              className="btn w-full hover:bg-[#005694] bg-[#005694] text-white font-semibold "
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