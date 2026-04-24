import { createContext, useContext, useMemo } from "react";
import { useCurrentUserQuery } from "../Api/authApi";

const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const query = useCurrentUserQuery();

  const value = useMemo(
    () => ({
      user: query.data || null,
      isLoading: query.isLoading,
      isFetching: query.isFetching,
      isError: query.isError,
      error: query.error,
      refetch: query.refetch,
    }),
    [
      query.data,
      query.isLoading,
      query.isFetching,
      query.isError,
      query.error,
      query.refetch,
    ]
  );

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw new Error("useCurrentUser must be used within CurrentUserProvider");
  }

  return context;
};
