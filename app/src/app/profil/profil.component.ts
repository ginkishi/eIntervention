import { Component, OnInit } from "@angular/core";
import { BrigadeApiService } from "../services/brigade-api.service";
import { Pompier } from "../models/pompier";
import { Droit } from "../models/droit";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-profil",
  templateUrl: "./profil.component.html",
  styleUrls: ["./profil.component.scss"]
})
export class ProfilComponent implements OnInit {
  response: any;
  ProfileLoaded: Promise<boolean>;
  unPompier: any;
  droit: Array<Droit>;
  id: number;
  constructor(
    private apiService: BrigadeApiService,
    private routeActive: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getPompierProfil();
  }

  getPompierProfil() {
    this.id = this.routeActive.snapshot.params.id;
    if (!this.id) {
      //console.log(JSON.parse(localStorage.getItem("user")));

      this.unPompier = JSON.parse(localStorage.getItem("user"));

      this.ProfileLoaded = Promise.resolve(true);
    } else {
      this.apiService.readOnePompier(this.id).subscribe((res: Pompier) => {
        this.response = JSON.parse(JSON.stringify(res));
        this.unPompier = this.response.pompier[0];
        this.ProfileLoaded = Promise.resolve(true);
        // console.log(this.unPompier.ROLE);
      });
    }
  }
}
