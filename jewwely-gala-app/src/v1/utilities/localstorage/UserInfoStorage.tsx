import { GalaUser } from "../../contexts/authentication/GalaUser";

export class UserInfoStorage {
  static init(_user: GalaUser|undefined) {
    if(_user != undefined){
        localStorage.setItem("user", JSON.stringify(_user));
        localStorage.removeItem("cartIdSelected");
    }else{
      throw new Error("user not recognized");
      
    }
  }
  static destroy() {
    localStorage.removeItem("user");
    localStorage.removeItem("cartIdSelected");
  }
  static info(): GalaUser|undefined {
    const value = localStorage.getItem("user");
    if (value) {
      // return JSON.parse(value);
      const user = new GalaUser();
      user.init(JSON.parse(value));
      return user;
    } else {
      return undefined;
    }
  }
}
