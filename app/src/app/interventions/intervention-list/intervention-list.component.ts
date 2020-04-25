import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BrigadeApiService } from 'src/app/services/brigade-api.service';
import { Intervention } from 'src/app/models/intervention';
import { ActivatedRoute } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ExportService } from 'src/app/services/export.service';

@Component({
  selector: 'app-intervention-list',
  templateUrl: './intervention-list.component.html',
  styleUrls: ['./intervention-list.component.scss']
})
export class InterventionListComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  intervention: Intervention[];
  response: any;
  type: string;
  idUser: number;

  constructor(
    public api: BrigadeApiService,
    public routeActive: ActivatedRoute,
    public auth: AuthentificationService,
    public exportService: ExportService) { }

  ngOnInit(): void {
    this.routeActive.data.subscribe(resp => {
      this.type = Object.values(resp)[0];
    });

    this.getInterventions();

    this.idUser = JSON.parse(localStorage.getItem('user')).P_ID;

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
  exportToExcel() {
    this.exportService.exportToExcel(this.epltable);
  }

}
