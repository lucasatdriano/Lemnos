const AuthService = {
  getToken: () => {
    return localStorage.getItem('authToken');
  },
  setToken: token => {
    localStorage.setItem('authToken', token);
  },
  setGoogleToken: token => {
    localStorage.setItem('token', token)
  },
  logout: () => {
    localStorage.removeItem('authToken');
  },
  isLoggedIn: () => {
    return !!localStorage.getItem('authToken');
  },
};
  
export default AuthService;