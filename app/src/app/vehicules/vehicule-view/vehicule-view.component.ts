import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BrigadeApiService } from "src/app/services/brigade-api.service";
import { Vehicule } from "src/app/models/vehicule";

@Component({
  selector: "app-vehicule-view",
  templateUrl: "./vehicule-view.component.html",
  styleUrls: ["./vehicule-view.component.scss"]
})
export class VehiculeViewComponent implements OnInit {
  id: number;
  response: any;
  vehicule: Vehicule;
  ProfileLoaded: Promise<boolean>;
  constructor(
    private api: BrigadeApiService,
    private routeActive: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getID();
    this.getInformation();
  }
  getID() {
    this.id = this.routeActive.snapshot.params.id;
  }
  getInformation() {
    this.api.readOneVehicule(this.id).subscribe((resultat: Vehicule) => {
      this.response = JSON.parse(JSON.stringify(resultat));
      //console.log(this.response);
      this.vehicule = this.response.vehicule[0];
      this.ProfileLoaded = Promise.resolve(true);
      //console.log(this.vehicule);
    });
  }
}
