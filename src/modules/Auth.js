class Auth {

  //authenticates a user and saves a token to local storage
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  //checks to see if user is aunthenticated
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null && localStorage.getItem('token') !== 'undefined';
  }
  //removes a token from local storage when user signs out
  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  //gets a token value
  static getToken() {
    return localStorage.getItem('token');
  }

}
export default Auth;
