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
import { NotExpr } from '@angular/compiler';
import { PompierRoles } from 'src/app/models/pompierRoles';
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
  idvehicule: string;
  myControl = new FormControl();
  
  constructor(
    private apiService: BrigadeApiService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.interventionForm.idcreateur = JSON.parse(
      localStorage.getItem("user")
    ).P_ID;
   
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
    this.setIDintervention();
    this.createListVehicule();
    this.createListAllPompier();
  }
  setIDintervention():void{

 // recuperer l'id d'une intervention 
      this.dataService.getInterventionID().subscribe((resultat :number)=>{
      this.response=JSON.parse(JSON.stringify(resultat));
      let c:number=1+Number(this.response.ID);;
      this.VehiculeUtilise.IDIntervention=""+c;
      console.log(this.VehiculeUtilise.IDIntervention);
    });
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

      //console.log(this.listePompier);
      //  this.typesIntervention = this.response.typeIntervention;
      //console.log(this.typesIntervention[0]);
    });
  }
  // rajouter l'equipe d'apres le vehicule selectionnée
  addTeam(value: string) {
    this.idvehicule=value;
    this.usedVehicule=[];
    var val = +value;
    //console.log(value);
    for (let i of this.vehicules) {
      if (i.V_ID == val) {
        for( let c of  i.ROLE)
        {
          this.usedVehicule.push((new RoleVhicule(c.ROLE_ID,c.ROLE_NAME,'')));
        }
       
      }
    }
    this.usedVehicule.push(new RoleVhicule('0','Apprenti(Optionel)',''));
    this.usedVehicule[0].POMPIER_NAME=
    JSON.parse(localStorage.getItem("user")).P_PRENOM +
    " " +
    JSON.parse(localStorage.getItem("user")).P_NOM;
  }

  selectEvent(item: string) {
    this.interventionForm.responsable = item;
  }

  async onSubmit(form: NgForm) {
    console.log("in onSubmit:", form.valid);

       //ajout d'une intervention
     this.dataService.postInterventionForm(this.interventionForm).subscribe(
      result =>
      {
        console.log("success hallelujah", JSON.parse(JSON.stringify(result)));
       console.log('num',this.VehiculeUtilise.IDIntervention);
      }
   
    );
    
    // ajout d'un vehicule a une intervention

   this.dataService.postVehiculeUsedForm(this.VehiculeUtilise).subscribe(
      result => 
      {
        console.log("success", JSON.parse(JSON.stringify(result)));
      },
      error => console.log("erreur", error)
    );


    console.log(this.idvehicule);
    console.log(this.usedVehicule);
    for(let pom of this.usedVehicule)
    {if(pom.ROLE_ID!=='0' || pom.POMPIER_NAME!="")
      this.dataService.postMembertoInntervention(this.idvehicule,this.VehiculeUtilise.IDIntervention,pom.ROLE_ID,pom.POMPIER_NAME).subscribe(
        result => 
        {
          console.log("success", JSON.parse(JSON.stringify(result)));
        },
        error => console.log("erreur", error)
      );
  
    }
   
  }
     
      
     
      

      
    
  
}
