import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BrigadeApiService } from 'src/app/services/brigade-api.service';
import { Intervention } from 'src/app/models/intervention';
import { ExportService } from 'src/app/services/export.service';
import { ActivatedRoute, Data } from '@angular/router';

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

  constructor(
    public api: BrigadeApiService,
    public exportService: ExportService,
    public routeActive: ActivatedRoute
  ) { }

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
  exportToCSV() {
    const csvOptions = {
      fieldSeparator: ',',
      quoteStrings: "'",
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Your Holiday List :',
      useBom: true,
      noDownload: false,
      headers: [
        'Numero',
        'Date de declechement',
        'Date de fin',
        'Adresse',
        'Commune',
        'Type d\'intervention',
        'Statut'
      ]
    };
    this.exportService.exportToCSV(this.intervention, 'TestExport', csvOptions);
  }
  exportToExcel() {
    this.exportService.exportToExcel(this.epltable);
  }
}
