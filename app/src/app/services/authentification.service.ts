import { Injectable } from "@angular/core";
import { BrigadeApiService } from "./brigade-api.service";
import { User } from "../models/user";

@Injectable({
  providedIn: "root"
})
export class AuthentificationService {
  isAuth = false;
  response: any;
  constructor(private apiService: BrigadeApiService) {}
  signIn(user: User) {
    this.apiService.authentificate(user).subscribe(
      response => {
        //Next callback
        // console.log("response received");
        this.response = JSON.parse(JSON.stringify(response));
        //console.log(this.response.message ? this.response.message : "Connection réussi");
        if (this.response.message) this.isAuth = false;
        else this.isAuth = true;
      },
      error => {
        //Next callback
        console.log("response error");
        this.isAuth = false;
      }
      // res => {
      //   this.response = JSON.parse(JSON.stringify(res));
      //   console.log(this.response.message ? false : "Connection réussi");
      // }
    );
    return this.isAuth;
  }

  signOut() {
    this.isAuth = false;
  }
}
