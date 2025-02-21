import { useState, useEffect, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import { MdEditNote } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";


import useTasks from "../Hooks/useTasks";
import useUpTaskCategory from "../Hooks/useUpTaskCategory";
import UpdateModal from "./UpdateModal";

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

  // Delete
  const handleDelete = useCallback(
    async (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#0083ff",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/task/${id}`);
            if (data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Your Task has been Deleted",
                icon: "success",
              });
            }
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: error.message,
            });
          }
        }
      });
    },
    [api_Url, refetch]
  );

 
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
                className="p-5 bg-white rounded-lg w-full shadow-md h-fit min-h-[120px]"
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
                        className="bg-gray-100 p-4 mt-4 rounded-md drop-shadow shadow-md cursor-pointer border-gray-200"
                      >
                        <h1 className="text-xl md:text-2xl font-semibold tracking-wider">
                          {task.title}
                        </h1>
                        <h3 className="text-lg mt-2 font-normal tracking-wide text-gray-600 whitespace-pre-line">
                          {task.description}
                        </h3>
                        {/* Delete btn */}
                        <div className="mt-4 flex items-start gap-4 w-full">
                          {/* Update Btn */}
                          <button
                            onClick={() =>
                              document
                                .getElementById(`modal-${task._id}`)
                                .showModal()
                            }
                            className="btn btn-sm tooltip hover:bg-white text-[#005694]"
                            data-tip="Update"
                          >
                            <MdEditNote size={25} />
                            {/* Update Modal */}
                            <UpdateModal task={task} />
                          </button>
                          {/* Delete Btn */}
                          <button
                            onClick={() => handleDelete(task._id)}
                            className="btn btn-sm tooltip hover:bg-white text-red-500"
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