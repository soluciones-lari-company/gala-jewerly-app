const ACCESS_TOKEN_KEY = import.meta.env.VITE_HOST_API_JEWERLY_ACCESS_TOKEN;
const REFRESH_TOKEN_KEY = import.meta.env.VITE_HOST_API_JEWERLY_REFRESH_TOKEN;
const EXPIRE_IN = import.meta.env.VITE_HOST_API_JEWERLY_EXPIRE_IN;
const EXPIRE_IN_DATE = import.meta.env.VITE_HOST_API_JEWERLY_EXPIRE_IN_DATE;
const LOGGED_AT = import.meta.env.VITE_HOST_API_JEWERLY_LOGGED_AT;
const SELECTED_CART_ID = import.meta.env.VITE_HOST_API_JEWERLY_SELECTED_CART_ID;

class AuthClientStore {

  static getCartSelectedId(): string|null {
    return localStorage.getItem(SELECTED_CART_ID);
  }

  static setCartSelectedId(token: string) {
    localStorage.setItem(SELECTED_CART_ID, token);
  } 

  static getLoggedAt(): string|null {
    return localStorage.getItem(LOGGED_AT);
  }

  static setLoggedAt(token: string) {
    localStorage.setItem(LOGGED_AT, token);
  } 

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

  static setDateExpireIn(expireIn: number){
    const date = new Date();
    date.setSeconds(date.getSeconds() + expireIn)
    localStorage.setItem(EXPIRE_IN_DATE, date.toISOString());
  }

  static getDateExpireIn(): Date|null {
    const dateStr = localStorage.getItem(EXPIRE_IN_DATE)
    if(!dateStr)
      return null

    const date = new Date(dateStr)

    return date;
  }

  static isAuthenticated(){
    const expireIn = AuthClientStore.getDateExpireIn();

    if(expireIn === null)
      return false;

    const dateNow = new Date();

    if(dateNow < expireIn)
    {
      return true
    }else{
      return false;
    }

  }

}

export default AuthClientStore;
