import { AccessTokenResponse } from "../api/client/GalaJewerlyClient";

export class UserAuth {
  token?: AccessTokenResponse;
  userEmail?: string;
  loggedAt?: Date;
  expirationToken?: Date;

  constructor(_token?: AccessTokenResponse, _email?: string){
    if(_token){
      const date = new Date();
      date.setSeconds(date.getSeconds() + (_token.expiresIn ?? 0));
  
      this.token = _token
      this.userEmail = _email
      this.loggedAt = new Date();
      this.expirationToken =  date;
    }
  }

  init(_data: any){
    if (_data) {
      this.userEmail = _data["userEmail"];
      this.loggedAt = _data["loggedAt"];
      this.expirationToken = new Date(_data["expirationToken"]);
      this.token = _data["token"] ? AccessTokenResponse.fromJS(_data["token"]) : new AccessTokenResponse();
    }
  }

  isAuthenticated() {
    if(!this.expirationToken){
      return false;
    }


    if(!this.loggedAt || !this.expirationToken){
      return false;
    }

    const nowDate = new Date();
    console.warn(`${nowDate}/${this.expirationToken}`)
    if(nowDate >= this.expirationToken){
      return false
    }

    return true;
  }
}