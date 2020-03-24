import { Component, OnInit } from "@angular/core";
import { BrigadeApiService } from "../services/brigade-api.service";
import { Pompier } from "../models/pompier";
import { Droit } from "../models/droit";

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
  constructor(private apiService: BrigadeApiService) {}

  ngOnInit(): void {
    this.getPompierProfil();
  }

  getPompierProfil() {
    this.apiService.readOnePompier(1).subscribe((res: Pompier) => {
      this.response = JSON.parse(JSON.stringify(res));
      this.unPompier = this.response.pompier[0];
      this.ProfileLoaded = Promise.resolve(true);
      // console.log(this.unPompier.ROLE);
    });
  }
}
