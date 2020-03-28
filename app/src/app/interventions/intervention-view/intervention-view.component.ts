import { Component, OnInit } from "@angular/core";
import { BrigadeApiService } from "src/app/services/brigade-api.service";
import { ActivatedRoute } from "@angular/router";
import { Intervention } from "src/app/models/intervention";
import { Pompier } from "src/app/models/pompier";

@Component({
  selector: "app-intervention-view",
  templateUrl: "./intervention-view.component.html",
  styleUrls: ["./intervention-view.component.scss"]
})
export class InterventionViewComponent implements OnInit {
  id: number;
  response: any;
  intervention: Intervention;
  responsable: Pompier;

  constructor(
    public api: BrigadeApiService,
    public routeActive: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getID();
    this.getInformation();
  }
  getID() {
    this.id = this.routeActive.snapshot.params.id;
  }
  getInformation() {
    this.api
      .readOneIntervention(this.id)
      .subscribe((resultat: Intervention) => {
        this.response = JSON.parse(JSON.stringify(resultat));
        //console.log(this.response);
        this.intervention = this.response.intervention[0];
        this.getResponsable();
        console.log(this.intervention);
      });
  }

  getResponsable() {
    this.api
      .readOnePompier(this.intervention.IDResponsable)
      .subscribe((res: Pompier) => {
        this.response = JSON.parse(JSON.stringify(res));
        this.responsable = this.response.pompier[0];
        //console.log(this.responsable.P_NOM);
      });
  }
}
