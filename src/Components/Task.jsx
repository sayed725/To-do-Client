import { useState, useEffect, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import { MdEditNote } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import useTasks from "../Hooks/useTasks";
import useUpTaskCategory from "../Hooks/useUpTaskCategory";
import UpdateModal from "./UpdateModal";
import toast from "react-hot-toast";

const Task = () => {
  const api_Url = import.meta.env.VITE_API_URL;

  const [tasks, isLoading, refetch] = useTasks();

  const [taskData, setTaskData] = useState({
    "to-do": [],
    "in-progress": [],
    done: [],
  });

  // Update state
  useEffect(() => {
    if (tasks.length > 0) {
      setTaskData({
        "to-do": tasks.filter((task) => task.category === "to-do"),
        "in-progress": tasks.filter((task) => task.category === "in-progress"),
        done: tasks.filter((task) => task.category === "done"),
      });
    }
  }, [tasks]);

  const updateTaskCategory = useUpTaskCategory();

  //  Drag End
  const onDragEnd = useCallback(
    (result) => {
      const { source, destination, draggableId } = result;
      if (!destination) return;

      const sourceCategory = source.droppableId;
      const destCategory = destination.droppableId;

      if (
        sourceCategory === destCategory &&
        source.index === destination.index
      ) {
        return;
      }

      //  update UI
      setTaskData((prev) => {
        const updatedTasks = { ...prev };

        // Remove task
        const [movedTask] = updatedTasks[sourceCategory].splice(
          source.index,
          1
        );

        // Update category
        movedTask.category = destCategory;
        updatedTasks[destCategory].splice(destination.index, 0, movedTask);

        return updatedTasks;
      });

      // API update
      updateTaskCategory.mutate({
        taskId: draggableId,
        newCategory: destCategory,
      });
    },
    [updateTaskCategory, setTaskData]
  );

  // delete functionality
  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`${import.meta.env.VITE_API_URL}/task/${id}`)
        .then((res) => {
          // console.log(res.data)
          if (res.data.deletedCount) {
            toast.success("Your Task has been Deleted");
            refetch();
          }
        });
    } catch (err) {
      // console.log(err)
      toast.error(err.message);
    }
  };

  const modernDelete = (id) => {
    toast((t) => (
      <div className="flex gap-3 items-center">
        <div>
          <p>
            Are you <b>sure?</b>
          </p>
        </div>
        <div className="gap-2 flex">
          <button
            className="bg-red-400 text-white px-3 py-1 rounded-md"
            onClick={() => {
              toast.dismiss(t.id);
              handleDelete(id);
            }}
          >
            Yes
          </button>
          <button
            className="bg-green-400 text-white px-3 py-1 rounded-md"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  if (isLoading) return <div className="bg-white h-screen" />;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Object.keys(taskData).map((category) => (
          <Droppable key={category} droppableId={category}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="p-5 bg-white dark:bg-[#20293d] dark:text-white rounded-lg w-full shadow-md h-fit min-h-[120px]"
              >
                <h1 className="text-2xl font-semibold tracking-wide capitalize">
                  {category.replace("-", " ")}
                </h1>
                {taskData[category].map((task, index) => (
                  <Draggable
                    key={task._id.toString()}
                    draggableId={task._id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-gray-100 dark:bg-[#2f3d5d] dark:text-white p-4 mt-4 rounded-md drop-shadow shadow-md cursor-pointer border-gray-200"
                      >
                        <h1 className="text-xl md:text-2xl font-semibold tracking-wider">
                          {task.title}
                        </h1>
                        <h3 className="text-lg mt-2 font-normal tracking-wide text-gray-600 dark:text-white whitespace-pre-line">
                          {task.description}
                        </h3>
                        {/* Delete  */}
                        <div className="mt-4 flex items-start gap-4 w-full">
                          {/* Update  */}
                          <button
                            onClick={() =>
                              document
                                .getElementById(`modal-${task._id}`)
                                .showModal()
                            }
                            className="btn btn-sm dark:bg-[#2f3d5d] dark:text-blue-500 tooltip dark:hover:bg-[#2f3d5d] hover:bg-white text-[#0f2d3c]"
                            data-tip="Update"
                          >
                            <MdEditNote size={25} />
                            {/*  Modal */}
                            <UpdateModal task={task} />
                          </button>
                          {/* Delete */}
                          <button
                            onClick={() => modernDelete(task._id)}
                            className="btn btn-sm tooltip dark:bg-[#2f3d5d] dark:text-red-500 dark:hover:bg-[#2f3d5d] hover:bg-white text-red-500"
                            data-tip="Delete"
                          >
                            <MdDelete size={25} />
                          </button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default Task;
