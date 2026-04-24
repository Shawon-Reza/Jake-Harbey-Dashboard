import { useQuery } from "@tanstack/react-query";
import axiosApi from "./axiosInstance";

export const DASHBOARD_QUERY_KEY = ["dashboard", "overview"];
export const DASHBOARD_CUSTOMERS_QUERY_KEY = ["dashboard", "customers", "all"];
export const DASHBOARD_CUSTOMER_DETAILS_QUERY_KEY = ["dashboard", "customers", "details"];
export const DASHBOARD_JOBS_QUERY_KEY = ["dashboard", "jobs", "all"];
export const DASHBOARD_JOB_DETAILS_QUERY_KEY = ["dashboard", "inbox", "job", "details"];

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
