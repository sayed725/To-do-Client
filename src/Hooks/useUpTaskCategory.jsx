import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const useUpTaskCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId, newCategory }) => {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/update-task-category/${taskId}`,
        {
          category: newCategory,
        }
      );
      return data;
    },
    onMutate: async ({ taskId, newCategory }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (oldTasks) =>
        oldTasks.map((task) =>
          task._id === taskId ? { ...task, category: newCategory } : task
        )
      );

      return { previousTasks };
    },
    onError: (_, __, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export default useUpTaskCategory;