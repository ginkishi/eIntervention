import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { AuthentificationService } from "../services/authentification.service";
import { NgForm } from "@angular/forms";
import { User } from "../models/user";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthentificationService,
    private router: Router,
    private routeActive: ActivatedRoute
  ) {}

  authStatus: boolean;
  errormessage: boolean;
  msg: string;

  ngOnInit(): void {
    this.authStatus = this.authService.isAuth;
    this.errormessage = false;
    this.msg = this.routeActive.snapshot.params.msg;
  }

  // onSignIn() {
  //   this.authService.signIn().then(() => {
  //     console.log("Sign in successful!");
  //     this.authStatus = this.authService.isAuth;
  //   });
  // }
  onSubmit(form: NgForm) {
    const username = form.value["username"];
    const password = form.value["password"];
    let user = new User(username, password);
    this.authService.signIn(user);
    setTimeout(() => {
      this.authStatus = this.authService.isAuth;
      if (this.authStatus) {
        this.router.navigate(["home"]);
      } else {
        //console.log(this.authStatus);
        this.errormessage = true;
      }
    }, 500);
  }
}
