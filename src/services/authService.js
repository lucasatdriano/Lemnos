const AuthService = {
    login: (token) => {
      localStorage.setItem('authToken', token);
    },
    logout: () => {
      localStorage.removeItem('authToken');
    },
    isLoggedIn: () => {
      return !!localStorage.getItem('authToken');
    }
};
  
export default AuthService;