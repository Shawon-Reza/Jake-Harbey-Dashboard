import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routers/Router.jsx";
import { Provider } from "react-redux";
import { store } from "./Stores/store.js";
import { Toaster } from "./components/ui/sonner.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CurrentUserProvider } from "./contexts/CurrentUserContext.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CurrentUserProvider>
          <Toaster />
          <RouterProvider router={router} />
        </CurrentUserProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
