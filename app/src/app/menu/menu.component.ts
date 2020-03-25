import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthentificationService } from "../services/authentification.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit, OnDestroy {
  constructor(public auth: AuthentificationService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
  signout() {
    this.auth.signOut();
  }
}
