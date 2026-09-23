"use client"
import axios from 'axios'

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/auth`,
    withCredentials: true
})

export default api