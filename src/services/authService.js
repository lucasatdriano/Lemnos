const AuthService = {
    getToken: () => {
        return localStorage.getItem('authToken');
    },
    setToken: (token) => {
        localStorage.setItem('authToken', token);
    },
    setGoogleToken: (token) => {
        localStorage.setItem('token', token);
    },
    logout: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    },
    isLoggedIn: () => {
        return !!localStorage.getItem('authToken');
    },
    isLoggedInWithGoogle: () => {
        return !!localStorage.getItem('token');
    },
    setRole: (role) => {
        localStorage.setItem('role', role);
    },
    getRole: () => {
        return localStorage.getItem('role');
    },
};

export default AuthService;
