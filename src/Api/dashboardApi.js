import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosApi from "./axiosInstance";

export const DASHBOARD_QUERY_KEY = ["dashboard", "overview"];
export const DASHBOARD_CUSTOMERS_QUERY_KEY = ["dashboard", "customers", "all"];
export const DASHBOARD_CUSTOMER_DETAILS_QUERY_KEY = ["dashboard", "customers", "details"];
export const DASHBOARD_USERS_QUERY_KEY = ["dashboard", "users", "all"];
export const DASHBOARD_USERS_STATS_QUERY_KEY = ["dashboard", "users", "statistics"];
export const DASHBOARD_JOBS_QUERY_KEY = ["dashboard", "jobs", "all"];
export const DASHBOARD_JOB_DETAILS_QUERY_KEY = ["dashboard", "inbox", "job", "details"];
export const DASHBOARD_INBOX_FLAGS_QUERY_KEY = ["dashboard", "inbox", "flags", "list"];
export const DASHBOARD_INBOX_QUERY_KEY = ["dashboard", "inbox", "all"];
export const DASHBOARD_PLANS_QUERY_KEY = ["dashboard", "plans", "all"];
export const DASHBOARD_TECHNICIANS_QUERY_KEY = ["dashboard", "technicians", "all"];
export const DASHBOARD_TECHNICIAN_DETAILS_QUERY_KEY = ["dashboard", "technicians", "details"];

const hasAccessToken = () => {
  try {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return Boolean(auth?.access);
  } catch {
    return false;
  }
};

export const useDashboardOverviewQuery = () => {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEY,
    queryFn: async () => {
      const response = await axiosApi.get("/dashboard/");
      console.log("Dashboard overview data:", response.data);
      return response.data;
    },
    enabled: hasAccessToken(),
    staleTime: 1000 * 60 * 3,
    retry: 1,
  });
};

export const useGetUserDetailsQuery = (id) => {
  return useQuery({
    queryKey: ["users", "details", id],
    queryFn: async () => {
      const response = await axiosApi.get(`/user/${id}`);
      return response.data;
    },
    enabled: Boolean(id) && hasAccessToken(),
    retry: 1,
  });
};

export const useGetUserStatsQuery = (id) => {
  return useQuery({
    queryKey: ["users", "stats", id],
    queryFn: async () => {
      const response = await axiosApi.get(`/user/${id}/stats`);
      return response.data;
    },
    enabled: Boolean(id) && hasAccessToken(),
    retry: 1,
  });
};

export const useGetMonthlyRevenueStatsQuery = (month = "") => {
  return useQuery({
    queryKey: ["dashboard", "monthly-revenue", month],
    queryFn: async () => {
      const endpoint = month
        ? `/dashboard/revenue/monthly?month=${encodeURIComponent(month)}`
        : "/dashboard/revenue/monthly";
      const response = await axiosApi.get(endpoint);
      return response.data;
    },
    enabled: hasAccessToken(),
    retry: 1,
  });
};

export const useDashboardCustomersQuery = () => {
  return useQuery({
    queryKey: DASHBOARD_CUSTOMERS_QUERY_KEY,
    queryFn: async () => {
      const response = await axiosApi.get("/dashboard/customers/all/");
      return response.data;
    },
    enabled: hasAccessToken(),
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};

export const useDashboardUsersQuery = () => {
  return useQuery({
    queryKey: DASHBOARD_USERS_QUERY_KEY,
    queryFn: async () => {
      const response = await axiosApi.get("/dashboard/users/");
      return response.data;
    },
    enabled: hasAccessToken(),
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};

export const useDashboardUsersStatisticsQuery = () => {
  return useQuery({
    queryKey: DASHBOARD_USERS_STATS_QUERY_KEY,
    queryFn: async () => {
      const response = await axiosApi.get("/dashboard/users/statistics/");
      return response.data;
    },
    enabled: hasAccessToken(),
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};

export const useDeleteDashboardUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userId) => {
      const response = await axiosApi.delete(`/dashboard/users/${userId}/`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DASHBOARD_USERS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: DASHBOARD_USERS_STATS_QUERY_KEY });
    },
  });
};

export const useDashboardCustomerDetailsQuery = (userId) => {
  return useQuery({
    queryKey: [...DASHBOARD_CUSTOMER_DETAILS_QUERY_KEY, userId],
    queryFn: async () => {
      const response = await axiosApi.get(`/dashboard/customers/${userId}/details/`);
      console.log("Customer details data:", response.data);
      return response.data;
    },
    enabled: Boolean(userId) && hasAccessToken(),
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};

export const useDashboardJobsQuery = () => {
  return useQuery({
    queryKey: DASHBOARD_JOBS_QUERY_KEY,
    queryFn: async () => {
      const response = await axiosApi.get("/dashboard/jobs/all/");
      console.log("Dashboard jobs data:", response.data);
      return response.data;
    },
    enabled: hasAccessToken(),
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};

export const useDashboardJobDetailsQuery = (jobId) => {
  return useQuery({
    queryKey: [...DASHBOARD_JOB_DETAILS_QUERY_KEY, jobId],
    queryFn: async () => {
      const response = await axiosApi.get(`/dashboard/inbox/${jobId}/details/`);
      console.log("Job details data:", response.data);
      return response.data;
    },
    enabled: Boolean(jobId) && hasAccessToken(),
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};

export const useDashboardInboxFlagsListQuery = () => {
  return useQuery({
    queryKey: DASHBOARD_INBOX_FLAGS_QUERY_KEY,
    queryFn: async () => {
      const response = await axiosApi.get("/dashboard/inbox/flags/list/");
      return response.data;
    },
    enabled: hasAccessToken(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useDashboardInboxQuery = () => {
  return useQuery({
    queryKey: DASHBOARD_INBOX_QUERY_KEY,
    queryFn: async () => {
      const response = await axiosApi.get("/dashboard/inbox/");
      console.log("Dashboard inbox data:", response.data);
      return response.data;
    },
    enabled: hasAccessToken(),
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};

export const useDashboardPlansQuery = () => {
  return useQuery({
    queryKey: DASHBOARD_PLANS_QUERY_KEY,
    queryFn: async () => {
      const response = await axiosApi.get("/dashboard/plans/");
      console.log("Dashboard plans data:", response.data);
      return response.data;
    },
    enabled: hasAccessToken(),
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};

export const useCreateDashboardPlanMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ name, plan_type, tagline, price }) => {
      const response = await axiosApi.post("/dashboard/plans/", {
        name,
        plan_type,
        tagline,
        price,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DASHBOARD_PLANS_QUERY_KEY });
    },
  });
};

export const useDeleteDashboardPlanMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosApi.delete(`/dashboard/plans/${id}/`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DASHBOARD_PLANS_QUERY_KEY });
    },
  });
};

export const useUpdateDashboardPlanFeatureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, feature }) => {
      const response = await axiosApi.patch(`/dashboard/plan-features/${id}/`, {
        feature,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DASHBOARD_PLANS_QUERY_KEY });
    },
  });
};

export const useCreateDashboardPlanFeatureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ planId, feature }) => {
      const response = await axiosApi.post(`/dashboard/plans/${planId}/features/`, {
        feature,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DASHBOARD_PLANS_QUERY_KEY });
    },
  });
};

export const useCreateDashboardPlanMissingFeatureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ planId, missing_feature }) => {
      const response = await axiosApi.post(
        `/dashboard/plans/${planId}/missing-features/`,
        { missing_feature },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DASHBOARD_PLANS_QUERY_KEY });
    },
  });
};

export const useUpdateDashboardPlanMissingFeatureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, missing_feature }) => {
      const response = await axiosApi.patch(
        `/dashboard/plan-missing-features/${id}/`,
        { missing_feature },
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DASHBOARD_PLANS_QUERY_KEY });
    },
  });
};

export const useDeleteDashboardPlanFeatureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosApi.delete(`/dashboard/plan-features/${id}/`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DASHBOARD_PLANS_QUERY_KEY });
    },
  });
};

export const useDeleteDashboardPlanMissingFeatureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const response = await axiosApi.delete(`/dashboard/plan-missing-features/${id}/`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DASHBOARD_PLANS_QUERY_KEY });
    },
  });
};

export const useDashboardTechniciansQuery = () => {
  return useQuery({
    queryKey: DASHBOARD_TECHNICIANS_QUERY_KEY,
    queryFn: async () => {
      const response = await axiosApi.get("/dashboard/technicians/all/");
      console.log("Dashboard technicians data:", response.data);
      return response.data;
    },
    enabled: hasAccessToken(),
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};

export const useDashboardTechnicianDetailsQuery = (userId) => {
  return useQuery({
    queryKey: [...DASHBOARD_TECHNICIAN_DETAILS_QUERY_KEY, userId],
    queryFn: async () => {
      const response = await axiosApi.get(`/dashboard/technicians/${userId}/details/`);
      console.log("Technician details data:", response.data);
      return response.data;
    },
    enabled: Boolean(userId) && hasAccessToken(),
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
};
