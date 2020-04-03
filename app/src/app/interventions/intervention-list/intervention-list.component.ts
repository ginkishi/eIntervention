import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { BrigadeApiService } from "src/app/services/brigade-api.service";
import { Intervention } from "src/app/models/intervention";
import { ExportService } from "src/app/services/export.service";

@Component({
  selector: "app-intervention-list",
  templateUrl: "./intervention-list.component.html",
  styleUrls: ["./intervention-list.component.scss"]
})
export class InterventionListComponent implements OnInit {
  @ViewChild("epltable", { static: false }) epltable: ElementRef;
  intervention: Intervention[];
  response: any;
  type: string;

  constructor(
    public api: BrigadeApiService,
    public exportService: ExportService
  ) {}

  ngOnInit(): void {
    this.getInterventions();
  }

  getInterventions() {
    switch (this.type) {
      case "valid":
        console.log("valid");
        break;
      case "waiting":
        console.log("waiting");
        break;
      case "novalid":
        console.log("novalid");
        break;
      default:
        console.log("default");
        break;
    }

    this.api.readAllIntervention().subscribe((resultat: Intervention[]) => {
      this.response = JSON.parse(JSON.stringify(resultat));
      //console.log(this.response);
      this.intervention = this.response.interventions;
      //console.log(this.intervention);
    });
  }
  exportToCSV() {
    let csvOptions = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalseparator: ".",
      showLabels: true,
      showTitle: true,
      title: "Your Holiday List :",
      useBom: true,
      noDownload: false,
      headers: [
        "Numero",
        "Date de declechement",
        "Date de fin",
        "Adresse",
        "Commune",
        "Type d'intervention",
        "Statut"
      ]
    };
    this.exportService.exportToCSV(this.intervention, "TestExport", csvOptions);
  }
  exportToExcel() {
    this.exportService.exportToExcel(this.epltable);
  }
}
