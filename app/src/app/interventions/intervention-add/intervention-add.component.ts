import { Component, OnInit } from "@angular/core";
import { BrigadeApiService } from "../../services/brigade-api.service";
import { TypeIntervention } from "../../models/typeIntervention";
import { Vehicule } from "../../models/vehicule";
import { RoleVhicule } from "../../models/rolevehicule";
import { FormIntervention } from "../../models/formIntervention";
import { DataService } from "src/app/services/data.service";
import { NgForm } from "@angular/forms";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { formatDate } from "@angular/common";
registerLocaleData(localeFr, "fr");
@Component({
  selector: "app-intervention-add",
  templateUrl: "./intervention-add.component.html",
  styleUrls: ["./intervention-add.component.scss"]
})
export class InterventionAddComponent implements OnInit {
  interventionForm: FormIntervention = {
    numeroIntervention: +"2515",
    commune: null,
    adresse: null,
    typeIntervention: null,
    requerant: null,
    opm: 0,
    important: 0,
    dateDeclenchement: null,
    heureDeclenchement: null,
    dateFin: null,
    heureFin: null,
    // ici faudra recuper l'id de la session
    responsable: "admin admin",
    idcreateur: 1
  };

  response: any;
  typesIntervention: TypeIntervention[];
  vehicules: Vehicule[];
  selectedvehicule: string = "";
  usedVehicule: RoleVhicule[];

  constructor(
    private apiService: BrigadeApiService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    // this.datepipe.transform(this.interventionForm.dateDeclenchement,'dd/MM/yyyy');
    this.interventionForm.dateDeclenchement = formatDate(
      new Date(),
      "yyyy-MM-dd",
      "fr"
    );
    this.interventionForm.heureDeclenchement = formatDate(
      new Date(),
      "hh-mm-ss",
      "fr"
    );
    this.interventionForm.dateFin = formatDate(new Date(), "yyyy-MM-dd", "fr");
    this.interventionForm.heureFin = formatDate(new Date(), "hh-mm-ss", "fr");
    this.createListTypeIntervention();
    this.createListVehicule();
  }
  createListTypeIntervention(): void {
    this.apiService
      .readAllTypeIntervention()
      .subscribe((resultat: TypeIntervention[]) => {
        //   console.log(resultat);
        this.response = JSON.parse(JSON.stringify(resultat));
        //    console.log(this.response);
        this.typesIntervention = this.response.typeIntervention;
        //console.log(this.typesIntervention[0]);
      });
  }
  createListVehicule(): void {
    this.apiService.readAllVehicule().subscribe((res: Vehicule[]) => {
      this.response = JSON.parse(JSON.stringify(res));
      this.vehicules = this.response.vehicules;
      // console.log(this.vehicules);
    });
  }
  // rajouter l'equipe d'apres le vehicule selectionnée
  addTeam(value: string) {
    var val = +value;
    console.log(value);
    for (let i of this.vehicules) {
      if (i.V_ID == val) {
        this.usedVehicule = i.ROLE;
      }
    }
  }
  // a utiliser apres
  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }

  onSubmit(form: NgForm) {
    console.log("in onSubmit:", form.valid);
    this.dataService.postInterventionForm(this.interventionForm).subscribe(
      result => {
        console.log("success bitchez", JSON.parse(JSON.stringify(result)));
      },
      error => console.log("erreur", error)
    );
  }
}
