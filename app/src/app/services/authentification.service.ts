import { Injectable } from "@angular/core";
import { BrigadeApiService } from "./brigade-api.service";
import { User } from "../models/user";
import { Router } from "@angular/router";
import { RightAccessService } from "./right-access.service";

@Injectable({
  providedIn: "root"
})
export class AuthentificationService {
  isAuth = false;
  response: any;
  rights: RightAccessService;
  static complete: boolean;
  constructor(private apiService: BrigadeApiService, public router: Router) {
    this.rights = new RightAccessService();
  }
  signIn(user: User) {
    // this.apiService.authentificate(user).subscribe(
    //   response => {
    //     this.response = JSON.parse(JSON.stringify(response));
    //     if (this.response.message) {
    //       this.isAuth = false;
    //     } else {
    //       this.isAuth = true;
    //       var now = new Date().getTime();
    //       localStorage.setItem("statut", "connecte");
    //       localStorage.setItem("setupTime", now.toString());
    //       localStorage.setItem(
    //         "user",
    //         JSON.stringify(this.response.pompier[0])
    //       );
    //       this.rights.checkRight();
    //     }
    //   },
    //   error => {
    //     //Next callback
    //     console.log("response error");
    //     this.isAuth = false;
    //   }
    // );
    // return this.isAuth;
    let promise = new Promise((resolve, reject) => {
      this.apiService
        .authentificate(user)
        .toPromise()
        .then(
          res => {
            if (typeof Object.values(res)[0] != "string") {
              this.isAuth = true;
              var now = new Date().getTime();
              localStorage.setItem("statut", "connecte");
              localStorage.setItem("setupTime", now.toString());

              localStorage.setItem(
                "user",
                JSON.stringify(Object.values(res)[0][0])
              );
              this.rights.checkRight();
              // console.log("fini");
              resolve();
            } else {
              this.isAuth = false;
              reject("Erreur de login");
            }
          },
          msg => {
            // Error
            //console.log("Problem");

            reject(msg);
          }
        );
    });
    return promise;
  }

  signOut() {
    this.isAuth = false;
    console.log("deconnexion");
    localStorage.removeItem("statut");
    localStorage.removeItem("user");
    localStorage.clear();
    this.router.navigate(["logout", { msg: "Vous avez été déconnecté" }]);
  }
  public static finisht() {
    console.log("fini");

    this.complete = true;
  }
}
