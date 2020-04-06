import { Component, OnInit } from "@angular/core";
import { BrigadeApiService } from "src/app/services/brigade-api.service";
import { Intervention } from "src/app/models/intervention";

@Component({
  selector: "app-intervention-list",
  templateUrl: "./intervention-list.component.html",
  styleUrls: ["./intervention-list.component.scss"]
})
export class InterventionListComponent implements OnInit {
  intervention: Intervention[];
  response: any;

  constructor(public api: BrigadeApiService) {}

  ngOnInit(): void {
    this.getInterventions();
  }

  getInterventions() {
    this.api.readAllIntervention().subscribe((resultat: Intervention[]) => {
      this.response = JSON.parse(JSON.stringify(resultat));
      //console.log(this.response);
      this.intervention = this.response.interventions;
      //console.log(this.intervention);
    });
  }
}
