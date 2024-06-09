const AuthService = {
    login: (token) => {
      localStorage.setItem('authToken', token);
    },
    loginServer: token => {
      localStorage.setItem('token', token);
    },
    logout: () => {
      localStorage.removeItem('authToken');
    },
    isLoggedIn: () => {
      return !!localStorage.getItem('authToken');
    },
    loginServer: token => {
      localStorage.setItem('token', token);
    }
};
  
export default AuthService;