import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosApi from "./axiosInstance";

export const CURRENT_USER_QUERY_KEY = ["auth", "me"];

const getStoredAuth = () => {
  try {
    return JSON.parse(localStorage.getItem("auth")) || {};
  } catch {
    return {};
  }
};

export const useCurrentUserQuery = () => {
  return useQuery({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: async () => {
      const response = await axiosApi.get("/auth/me/");
      console.log("Current user data:", response.data);
      return response.data;
    },
    enabled: Boolean(getStoredAuth()?.access),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: async (credentials) => {
      const response = await axiosApi.post("/auth/login/", credentials, {
        skipAuthRefresh: true,
      });
      return response.data;
    },
    onSuccess: (data) => {
      const auth = {
        access: data?.access,
        refresh: data?.refresh,
      };

      if (auth.access || auth.refresh) {
        localStorage.setItem("auth", JSON.stringify(auth));
      }

      queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
    },
  });
};
