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
  setRole: role => {
    localStorage.setItem('role', role);
  },
  getRole: () => {
    return localStorage.getItem('role');
  }
};
  
export default AuthService;