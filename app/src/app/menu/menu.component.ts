import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthentificationService } from "../services/authentification.service";
import { Router } from "@angular/router";
import { RightAccessService } from "../services/right-access.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"]
})
export class MenuComponent implements OnInit, OnDestroy {
  constructor(public auth: AuthentificationService) {
    this.auth.rights.checkRight();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
  signout() {
    this.auth.signOut();
  }
}
