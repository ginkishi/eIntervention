import { Component, OnInit } from "@angular/core";
import { Vehicule } from "src/app/models/vehicule";
import { BrigadeApiService } from "src/app/services/brigade-api.service";

@Component({
  selector: "app-vehicule-list",
  templateUrl: "./vehicule-list.component.html",
  styleUrls: ["./vehicule-list.component.scss"]
})
export class VehiculeListComponent implements OnInit {
  response: any;
  vehicules: Vehicule[];
  ProfileLoaded: Promise<boolean>;

  constructor(private api: BrigadeApiService) {}

  ngOnInit(): void {
    this.getInformation();
  }
  getInformation() {
    this.api.readAllVehicule().subscribe((resultat: Vehicule[]) => {
      this.response = JSON.parse(JSON.stringify(resultat));
      //console.log(this.response);
      this.vehicules = this.response.vehicules;
      this.ProfileLoaded = Promise.resolve(true);
      //console.log(this.vehicules);
    });
  }
}
