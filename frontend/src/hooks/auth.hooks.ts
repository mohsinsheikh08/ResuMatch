"use client";  

import { useContext } from "react";
import { authContext } from "../contexts/AuthProvider";

const useAuth = () => {
    const contexts = useContext(authContext);
    if (!contexts) {
        throw new Error("The User is not available!");
    }
    return contexts;
};

export default useAuth;