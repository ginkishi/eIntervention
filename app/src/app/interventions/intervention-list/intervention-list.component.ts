import { Component, OnInit } from "@angular/core";
import { BrigadeApiService } from "src/app/services/brigade-api.service";
import { Intervention } from "src/app/models/intervention";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-intervention-list",
  templateUrl: "./intervention-list.component.html",
  styleUrls: ["./intervention-list.component.scss"]
})
export class InterventionListComponent implements OnInit {
  intervention: Intervention[];
  response: any;
  type: string;

  constructor(public api: BrigadeApiService, public routeActive: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeActive.data.subscribe(resp => {
      this.type = Object.values(resp)[0];
    });

    this.getInterventions();
  }

  getInterventions() {
    switch (this.type) {
      case 'valid':
        this.api
          .readAllInterventionValid()
          .subscribe((resultat: Intervention[]) => {
            this.response = JSON.parse(JSON.stringify(resultat));
            // console.log(this.response);
            this.intervention = this.response.interventions;
            console.log(this.intervention);
          });
        break;
      case 'waiting':
        this.api
          .readAllInterventionWaiting()
          .subscribe((resultat: Intervention[]) => {
            this.response = JSON.parse(JSON.stringify(resultat));
            // console.log(this.response);
            this.intervention = this.response.interventions;
            // console.log(this.intervention);
          });
        break;
      case 'novalid':
        this.api
          .readAllInterventionNoValid()
          .subscribe((resultat: Intervention[]) => {
            this.response = JSON.parse(JSON.stringify(resultat));
            // console.log(this.response);
            this.intervention = this.response.interventions;
          });
        break;
      default:
        this.api.readAllIntervention().subscribe((resultat: Intervention[]) => {
          this.response = JSON.parse(JSON.stringify(resultat));
          // console.log(this.response);
          this.intervention = this.response.interventions;
          // console.log(this.intervention);
        });
        break;
    }
  }
}
