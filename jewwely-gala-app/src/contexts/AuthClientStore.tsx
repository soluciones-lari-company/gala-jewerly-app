const ACCESS_TOKEN_KEY = import.meta.env.VITE_HOST_API_JEWERLY_ACCESS_TOKEN;
const REFRESH_TOKEN_KEY = import.meta.env.VITE_HOST_API_JEWERLY_REFRESH_TOKEN;
const EXPIRE_IN = import.meta.env.VITE_HOST_API_JEWERLY_EXPIRE_IN;

class AuthClientStore {
  static getAccessToken(): string|null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  static setAccessToken(token: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  static removeAccessToken(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  static getRefreshToken(): string|null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }

  static setRefreshToken(token: string) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  static removeRefreshToken(): void {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }


  static getExpireIn(): number|null {
    return parseInt(localStorage.getItem(EXPIRE_IN) ?? '0');
  }

  static setExpireIn(expireIn: number) {
    localStorage.setItem(EXPIRE_IN, `${expireIn}`);
  }

  static removeExpireIn(): void {
    localStorage.removeItem(EXPIRE_IN);
  }
}

export default AuthClientStore;
