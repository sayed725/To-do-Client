import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useTasks = () => {
  const { user } = useContext(AuthContext);
  const api_url = import.meta.env.VITE_API_URL;

  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get(`${api_url}/my-tasks/${user.email}`);
      return data;
    },
  });

  return [tasks, isLoading, refetch];
};

export default useTasks;