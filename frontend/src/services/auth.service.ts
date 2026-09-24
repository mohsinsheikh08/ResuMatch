import api from "../lib/api";
import {Register, Login, Logout, AuthResponse} from '@/src/types/auth.types'

const authService = {
    register : async (data: Register): Promise<AuthResponse> => {
        const response = await api.post('/register', data);
        return response.data
    },
    login: async (data: Login): Promise<AuthResponse> => {
        const response = await api.post('/login', data)
        return response.data
    },
     logout : async (): Promise<Logout> => {
        const response = await api.get('/logout')
        return response.data
    },
    getUser : async (): Promise<AuthResponse> => {
       const response = await api.get('/get-user')
       return response.data
    }
}

export default authService