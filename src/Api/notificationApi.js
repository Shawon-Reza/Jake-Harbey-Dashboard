import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosApi from './axiosInstance';

export const NOTIFICATIONS_QUERY_KEY = ['jobs', 'notifications'];

const hasAccessToken = () => {
    try {
        const auth = JSON.parse(localStorage.getItem('auth'));
        return Boolean(auth?.access);
    } catch {
        return false;
    }
};

export const useNotificationsQuery = () => {
    return useQuery({
        queryKey: NOTIFICATIONS_QUERY_KEY,
        queryFn: async () => {
            const response = await axiosApi.get('/jobs/notifications/');
            return response.data;
        },
        enabled: hasAccessToken(),
        staleTime: 1000 * 60 * 2,
        retry: 1,
    });
};

export const useMarkNotificationReadMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (notificationId) => {
            const response = await axiosApi.post(`/jobs/notification/${notificationId}/mark/`,
                {
                    is_read: true,
                },
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
        },
    });
};

export const useMarkAllNotificationsReadMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async () => {
            const response = await axiosApi.post('/jobs/notification/mark-all/', {

                is_read: true,

            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
        },
    });
};
