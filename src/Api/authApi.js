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

export const useProfileUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["auth", "profile-update"],
    mutationFn: async ({ full_name, phone, profile_picture }) => {
      const formData = new FormData();
      formData.append("full_name", full_name || "");
      formData.append("phone", phone || "");

      if (profile_picture instanceof File) {
        formData.append("profile_picture", profile_picture);
      }

      const response = await axiosApi.patch("/auth/profile-update/", formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
    },
  });
};

export const usePasswordResetMutation = () => {
  return useMutation({
    mutationKey: ["auth", "password-reset"],
    mutationFn: async ({ email, token, new_password }) => {
      console.log("Password reset request payload:", {
        email,
        token,
        new_password,
      });
      const response = await axiosApi.post("/auth/password-reset/", {
        email,
        token,
        new_password,
      });
      console.log("Password reset response:", response.data);
      return response.data;
    },
  });
};
