// ---------------------- **WebSocket Connection FUnction for Notifications** ------------------------- //
export const connectWebSocketForNotifications = ({ onMessage, onSeen }) => {
    let reconnectAttempts = 0;
    const maxReconnectAttempts = 5;
    const reconnectDelay = 3000; // 3 seconds
    let reconnectTimeout = null;

    // ...........................Get Auth Token................................ //
    let token = null;
    try {

        const auth = localStorage.getItem("auth");
        token = auth ? JSON.parse(auth)?.access : null;


    } catch (e) {
        return null; // stop if token not found
    }
    if (!token) {
        return null;
    }

    // ........................WebSocket Connecting.......................... //
    // ws://127.0.0.1:8000/ws/jobnotification_count/?token={{token}}

    const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
    const wsUrl = `${wsProtocol}://127.0.0.1:8000/ws/notifications/?token=${token}`;

    //  ws://backend.getkyroai.com/ws/notifications/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzcxNTc3MjI1LCJpYXQiOjE3NzE0OTA4MjUsImp0aSI6IjgzMzhkZjdkNmU0ZjQ3N2VhYWQ3Y2VkMjAyZjk2ZmVkIiwidXNlcl9pZCI6IjE1In0.AeIvjStz9fieYXlLaq8MpvIdORuZo3qs9aO1GKZ_k9w

    let socket = null;

    const createSocket = () => {
        try {
            socket = new WebSocket(wsUrl);
        } catch (err) {
            console.log(err)
            return null;
        }

        socket.onopen = () => {
            reconnectAttempts = 0; // Reset attempts on successful connection
            console.log("WebSocket connected:", wsUrl);
        }

        socket.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log(data)
                // ================ Pass new notification data to handler ==================\\
                onMessage?.(data);

            } catch (err) {
            }
        };

        socket.onclose = (event) => {
            // Attempt to reconnect with exponential backoff
            if (reconnectAttempts < maxReconnectAttempts) {
                const delay = reconnectDelay * Math.pow(2, reconnectAttempts); // Exponential backoff
                reconnectAttempts++;

                reconnectTimeout = setTimeout(() => {
                    createSocket();
                }, delay);
            }
        };

        return socket;
    };

    // Create initial socket connection
    createSocket();

    // Return object with close method for cleanup
    return {
        close: () => {
            if (reconnectTimeout) {
                clearTimeout(reconnectTimeout);
            }
            if (socket && socket.readyState === 1) {
                socket.close();
            }
        },
        getReadyState: () => socket?.readyState,
        getUrl: () => socket?.url
    };
};