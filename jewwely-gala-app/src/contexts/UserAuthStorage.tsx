import { AccessTokenResponse } from "../api/client/GalaJewerlyClient";
import { UserAuth } from "./UserAuth";

export class UserAuthStorage {

  static init(_token?: AccessTokenResponse, _email?: string){
    const user = new UserAuth(_token, _email);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.removeItem("cartIdSelected");
  }
  static destroy(){
    localStorage.removeItem("user");
    localStorage.removeItem("cartIdSelected");
  }
  static info(): UserAuth {
    const value = localStorage.getItem("user");
      if (value) {
        // return JSON.parse(value);
        const user = new UserAuth();
        user.init(JSON.parse(value))
        return user;
      } else {
        return new UserAuth();
      }
  }
}