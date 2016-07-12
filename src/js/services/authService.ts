export class AuthService {
  public user: string = sessionStorage.getItem('user');

  logout() {
    sessionStorage.removeItem('user');
    this.user = undefined;
  }

  login() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Pretend they're now authenticated.
        sessionStorage.setItem('user', 'username');
        resolve(this.user = 'username');
      }, 1000);
    });
  }
}