export interface Register {
    username: string,
    email: string,
    password: string
}

export interface Login {
    email: string,
    password: string
}

export interface Logout {
    message: string
}

export interface AuthResponse {
    message: string,
    user: {
        username: string,
        email: string,
        password: string
    }
}

export interface User {
        username: string,
        email: string,
    }
