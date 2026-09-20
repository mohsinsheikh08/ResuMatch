"use client";

import React, { createContext, ReactNode, useState, } from "react";
import { User, Register, Login } from "../types/auth.types";
import authService from "../services/auth.service";
import axios from "axios";

interface AuthStructure {
  user: User | null;
  loading: boolean;          
  submitting: boolean;         
  error: string;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  register: (data: Register) => Promise<void>;
  login: (data: Login) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export const authContext = createContext<AuthStructure | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);      
  const [submitting, setSubmitting] = useState<boolean>(false); 
  const [error, setError] = useState<string>("");



  const register = async (data: Register) => {
    setSubmitting(true);   
    setError("");
    try {
      const result = await authService.register(data);
      setUser(result.user);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data);
      }
      setError("Registration failed!");
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const login = async (data: Login) => {
    setSubmitting(true);     
    setError("");
    try {
      const result = await authService.login(data);
      setUser(result.user);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data);
      }
      setError("Login failed!");
      throw err;
    } finally {
      setSubmitting(false);   
    }
  };

  const logout = async () => {
    setSubmitting(true);
    setError("");
    try {
      await authService.logout();
      setUser(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response);
      }
      setError("Logout failed!");
    } finally {
      setSubmitting(false);
    }
  };

  const fetchUser = async () => {
    setLoading(true);        
    setError("");
    try {
      const result = await authService.getUser();
      setUser(result.user);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data);
      }
      setUser(null);
    } finally {
      setLoading(false);      
    }
  };
  const value: AuthStructure = {
    user,
    loading,
    submitting,
    error,
    setUser,
    register,
    login,
    logout,
    fetchUser,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;