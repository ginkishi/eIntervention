import { Component, OnInit } from "@angular/core";
import { BrigadeApiService } from "../../services/brigade-api.service";
import { TypeIntervention } from "../../models/typeIntervention";
import { Vehicule } from "../../models/vehicule";
import { RoleVhicule } from "../../models/rolevehicule";
import { FormIntervention } from "../../models/formIntervention";
import { DataService } from "src/app/services/data.service";
import { NgForm, FormControl } from "@angular/forms";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { formatDate } from "@angular/common";
import { ProfilComponent } from "src/app/profil/profil.component";
import { Pompier } from "src/app/models/pompier";
import { VehiculeUtilise } from "src/app/models/vehiculeutilise";
import {getInterventionID} from 'src/app/models/getIntervention';
@Component({
  selector: "app-intervention-add",
  templateUrl: "./intervention-add.component.html",
  styleUrls: ["./intervention-add.component.scss"]
})
export class InterventionAddComponent implements OnInit {
  interventionForm: FormIntervention = {
    numeroIntervention: 2515, //temporaire
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
    responsable: "",
    idcreateur: ""
  };

  VehiculeUtilise: VehiculeUtilise = {
    IdVehicule: null,
    IDIntervention:null,

    DateDepart: null,
    HeureDepart: null,
    DateArrive: null,
    HeureArrive: null,
    DateRetour: null,
    HeureRetour: null,
    Ronde: null
  };
  listePompier: string[] = [];
  response: any;
  typesIntervention: TypeIntervention[];
  vehicules: Vehicule[];
  selectedvehicule: string = "";
  usedVehicule: RoleVhicule[];

  myControl = new FormControl();
  infotosend: getInterventionID={
    numeroIntervention:null,
    dateDeclenchement:null,
    heureDeclenchement: null,
  };
  constructor(
    private apiService: BrigadeApiService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.interventionForm.idcreateur = JSON.parse(
      localStorage.getItem("user")
    ).P_ID;
    this.interventionForm.requerant =
      JSON.parse(localStorage.getItem("user")).P_PRENOM +
      " " +
      JSON.parse(localStorage.getItem("user")).P_NOM;
    // this.datepipe.transform(this.interventionForm.dateDeclenchement,'dd/MM/yyyy');
    this.interventionForm.dateDeclenchement = formatDate(
      new Date(),
      "yyyy-MM-dd",
      "fr-FR"
    );
    this.interventionForm.heureDeclenchement = formatDate(
      new Date(),
      "shortTime",
      "fr-FR"
    );
    this.interventionForm.dateFin = formatDate(
      new Date(),
      "yyyy-MM-dd",
      "fr-FR"
    );
    this.interventionForm.heureFin = formatDate(
      new Date(),
      "shortTime",
      "fr-FR"
    );
    this.VehiculeUtilise.DateArrive = formatDate(
      new Date(),
      "yyyy-MM-dd",
      "fr-FR"
    );
    this.VehiculeUtilise.DateDepart = formatDate(
      new Date(),
      "yyyy-MM-dd",
      "fr-FR"
    );
    this.VehiculeUtilise.DateRetour = formatDate(
      new Date(),
      "yyyy-MM-dd",
      "fr-FR"
    );
    this.VehiculeUtilise.HeureArrive = formatDate(
      new Date(),
      "shortTime",
      "fr-FR"
    );
    this.VehiculeUtilise.HeureDepart = formatDate(
      new Date(),
      "shortTime",
      "fr-FR"
    );
    this.VehiculeUtilise.HeureRetour = formatDate(
      new Date(),
      "shortTime",
      "fr-FR"
    );
    this.createListTypeIntervention();
    this.createListVehicule();
    this.createListAllPompier();
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
  createListAllPompier(): void {
    this.apiService.readAllPompier().subscribe((resultat: Pompier[]) => {
      //   console.log(resultat);
      this.response = JSON.parse(JSON.stringify(resultat));
      for (let i of this.response.pompiers) {
        let c: string = i.P_PRENOM + " " + i.P_NOM;
        this.listePompier.push(c);
      }

      console.log(this.listePompier);
      //  this.typesIntervention = this.response.typeIntervention;
      //console.log(this.typesIntervention[0]);
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

  selectEvent(item: string) {
    this.interventionForm.responsable = item;
  }
  onSubmit(form: NgForm) {
    console.log("in onSubmit:", form.valid);
    this.dataService.postInterventionForm(this.interventionForm).subscribe(
      result => {
        console.log("success bitchez1", JSON.parse(JSON.stringify(result)));
      },
      error => console.log("erreur", error)
    );
     
      this.infotosend.numeroIntervention=this.interventionForm.numeroIntervention;
      this.infotosend.dateDeclenchement=this.interventionForm.dateDeclenchement;
      this.infotosend.heureDeclenchement=this.interventionForm.heureDeclenchement;
   
      this.dataService.getInterventionID(this.infotosend).subscribe((resultat: number) => { 
        console.log(resultat);
        this.VehiculeUtilise.IDIntervention=JSON.parse(JSON.stringify(resultat)).intervention;});

        console.log('num',this.VehiculeUtilise.IDIntervention);
    this.dataService.postVehiculeUsedForm(this.VehiculeUtilise).subscribe(
      result => {
        console.log("success bitchez", JSON.parse(JSON.stringify(result)));
      },
      error => console.log("erreur", error)
    );
    
  }
}
