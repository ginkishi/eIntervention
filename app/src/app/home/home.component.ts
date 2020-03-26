import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { BrigadeApiService } from "../services/brigade-api.service";
import { Vehicule } from "../models/vehicule";
import { Pompier } from "../models/pompier";
import { Intervention } from "../models/intervention";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  response: any;
  vehicules: Vehicule[];
  unPompier: Pompier;
  intervention: Intervention[];

  constructor(private apiService: BrigadeApiService) {}

  ngOnInit(): void {
    // console.log(localStorage.getItem("setupTime"));
  }
  getInterventions() {
    this.apiService
      .readAllIntervention()
      .subscribe((resultat: Intervention[]) => {
        this.response = JSON.parse(JSON.stringify(resultat));
        //console.log(this.response);
        this.intervention = this.response.interventions;
        //console.log(this.intervention);
      });
  }
}
