"use client";

import { useContext } from "react";
import { authContext } from "../contexts/AuthProvider";

const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

export default useAuth;