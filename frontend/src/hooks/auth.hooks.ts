"use client";

import { useContext } from "react";
import { authContext } from "../contexts/AuthProvider";

const useAuth = () => {
  const context = useContext(authContext);

  // ✅ Safe default — context na ho to empty object
  return (
    context ?? {
      user: null,
      loading: true,
      error: "",
      setUser: () => {},
      setLoading: () => {},
      setError: () => {},
      register: async () => {},
      login: async () => {},
      logout: async () => {},
      fetchUser: async () => {},
    }
  );
};

export default useAuth;