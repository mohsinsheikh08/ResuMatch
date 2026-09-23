"use client";

import { useContext } from "react";
import { authContext } from "../contexts/AuthProvider";

const useAuth = () => {
  const context = useContext(authContext);

  if (!context) {
    return {
      user: null,
      loading: true,
      submitting: false, 
      error: "",
      setUser: () => {},
      register: async () => {},
      login: async () => {},
      logout: async () => {},
      fetchUser: async () => {},
    };
  }

  return context;
};

export default useAuth;