import { Component, OnInit } from "@angular/core";
import { BrigadeApiService } from "../../services/brigade-api.service";
import { TypeIntervention } from "../../models/typeIntervention";
import { Vehicule } from "../../models/vehicule";
import { RoleVhicule } from "../../models/rolevehicule";
import { FormIntervention } from "../../models/formIntervention";
import { DataService } from "src/app/services/data.service";
import { FormBuilder, FormControl, FormGroup, FormArray } from "@angular/forms";
import { formatDate } from "@angular/common";
import { ProfilComponent } from "src/app/profil/profil.component";
import { Pompier } from "src/app/models/pompier";
import { VehiculeUtilise } from "src/app/models/vehiculeutilise";
import { NotExpr } from '@angular/compiler';
import { PompierRoles } from 'src/app/models/pompierRoles';
import { stringify } from 'querystring';
import { ActivatedRoute } from "@angular/router";
import { Intervention } from 'src/app/models/intervention';
import { PersonnelIntervention } from 'src/app/models/personnelIntervention';
import { VehiculeIntervention } from 'src/app/models/vehiculeIntervention';
@Component({
  selector: "app-intervention-edit",
  templateUrl: "./intervention-edit.component.html",
  styleUrls: ["./intervention-edit.component.scss"]
})
export class InterventionEditComponent implements OnInit {
  idIntervention: number;
  response: any;
  intervention: Intervention;
  responsable: Pompier;

  AddInterventionForm: FormGroup = new FormGroup({

  });
  interventionForm: FormIntervention = {
    numeroIntervention: 2515, //temporaire
    commune: "boumerdes",
    adresse: null,
    typeIntervention: null,
    requerant: "Alerte locale",
    opm: 0,
    important: 0,
    dateDeclenchement: "2020-03-31",
    heureDeclenchement: "16:52",
    dateFin: "2020-03-31",
    heureFin: "16:52",
    // ici faudra recuper l'id de la session
    responsable: "admin admin",
    idcreateur: "1"
  };

  VehiculeUtilise: VehiculeUtilise = {
    IdVehicule: null,
    IDIntervention: null,
    DateDepart: null,
    HeureDepart: null,
    DateArrive: null,
    HeureArrive: null,
    DateRetour: null,
    HeureRetour: null,
    Ronde: null
  };

  listePompier: string[] = [];
  typesIntervention: TypeIntervention[];
  vehicules: Vehicule[];
  selectedvehicule: string = "";
  usedVehicule: RoleVhicule[];
  interventionID: string;
  get vehiculesintervention(): FormArray {

    return <FormArray>this.AddInterventionForm.get('vehiculesintervention');
  }
  get roles(): FormArray {
    return <FormArray>this.vehiculesintervention.get('roles');
  }

  constructor(
    private apiService: BrigadeApiService,
    private dataService: DataService,
    private fb: FormBuilder,
    public routeActive: ActivatedRoute
  ) { }
  getID() {
    this.idIntervention = this.routeActive.snapshot.params.id;
  }
  ngOnInit(): void {
    this.AddInterventionForm = this.fb.group({
      numeroIntervention: 258,
      commune: "",
      adresse: "",
      typeIntervention: "",
      requerant: "Alerte locale",
      opm: false,
      important: false,
      dateDeclenchement: formatDate(
        new Date(),
        "yyyy-MM-dd",
        "fr-FR"
      ),
      heureDeclenchement: formatDate(
        new Date(),
        "shortTime",
        "fr-FR"
      ),
      dateFin: formatDate(
        new Date(),
        "yyyy-MM-dd",
        "fr-FR"
      ),
      heureFin: formatDate(
        new Date(),
        "shortTime",
        "fr-FR"
      ),

      vehiculesintervention: this.fb.array([this.buildVehicule()]),
      responsable: 'admin admin'
    });
    this.getID();
    // this.getInformation();
    this.apiService
      .readOneIntervention(this.idIntervention)
      .subscribe((resultat: Intervention) => {
        this.response = JSON.parse(JSON.stringify(resultat));
        //console.log(this.response);
        this.intervention = this.response.intervention[0];
        this.apiService
          .readOnePompier(this.intervention.IDResponsable)
          .subscribe((res: Pompier) => {
            this.response = JSON.parse(JSON.stringify(res));
            this.responsable = this.response.pompier[0];
            let splitteddatedeclenchement = this.intervention.DateDeclenchement.toString().split(" ");
            let splitteddatedefin = this.intervention.DateFin.toString().split(" ");
            this.AddInterventionForm = this.fb.group({
              numeroIntervention: this.intervention.NIntervention,
              commune: this.intervention.Commune,
              adresse: this.intervention.Adresse,
              typeIntervention: this.intervention.TypeIntervention,
              requerant: this.intervention.Requerant,
              opm: this.intervention.OPM,
              important: this.intervention.Important,
              dateDeclenchement: splitteddatedeclenchement[0],
              heureDeclenchement: splitteddatedeclenchement[1],
              dateFin: splitteddatedefin[0],
              heureFin: splitteddatedefin[1],
              vehiculesintervention: this.fb.array([]),
              responsable: this.responsable.P_PRENOM + " " + this.responsable.P_NOM,
            });
            
            this.populatevehicules(this.intervention.Vehicules);
          }
          );
      });


    this.interventionForm.idcreateur = JSON.parse(
      localStorage.getItem("user")
    ).P_ID;

    // this.datepipe.transform(this.interventionForm.dateDeclenchement,'dd/MM/yyyy');

    this.createListTypeIntervention();
    this.setIDintervention();
    this.createListVehicule();
    this.createListAllPompier();
  }
  populatevehicules(liste:VehiculeIntervention[]){

    for (let i =0; i <liste.length;i++){
   
      
       const control = (<FormArray>this.AddInterventionForm.get('vehiculesintervention')) as FormArray ;
       console.log('-------',control);
       control.push( this.buildedVehicule(liste[i]));
       this.populatevehicule(liste[i].Personnels,i);

    }

  }
  buildedVehicule(v:VehiculeIntervention): FormGroup {
   
      let splitedatedepart = v.DateDepart.toString().split(" ");
      let spliteddatearrivee = v.DateArrive.toString().split(" ");
      let spliteddateretour = v.DateRetour.toString().split(" ");
      return this.fb.group({
        vehicule: v.IDVehicule,
        ronde: v.Ronde,
        dateDepart: splitedatedepart[0],
        heureDepart: splitedatedepart[1],
        dateArrivee: spliteddatearrivee[0],
        heureArrivee: spliteddatearrivee[1],
        dateRetour: spliteddateretour[0],
        heureRetour: spliteddateretour[1],
        roles: this.fb.array([]),
      });
    

  }
  populatevehicule(liste: PersonnelIntervention[],index:number) {



    this.usedVehicule = [];
    let c = (<FormArray>this.AddInterventionForm.controls['vehiculesintervention']).at(index).get('roles') as FormArray;
    c.clear();
    //console.log(value);
    for (let i of liste) {

      
      const control = (<FormArray>this.AddInterventionForm.controls['vehiculesintervention']).at(index).get('roles') as FormArray;
      console.log("--------------------------211",i);
      control.push(this.buildedRoles(i));




    }

  }
  buildVehicule(): FormGroup {
    return this.fb.group({
      vehicule: "",
      ronde: 'false',
      dateDepart: formatDate(
        new Date(),
        "yyyy-MM-dd",
        "fr-FR"
      ),
      heureDepart: formatDate(
        new Date(),
        "shortTime",
        "fr-FR"
      ),
      dateArrivee: formatDate(
        new Date(),
        "yyyy-MM-dd",
        "fr-FR"
      ),
      heureArrivee: formatDate(
        new Date(),
        "shortTime",
        "fr-FR"
      ),
      dateRetour: formatDate(
        new Date(),
        "yyyy-MM-dd",
        "fr-FR"
      ),
      heureRetour: formatDate(
        new Date(),
        "shortTime",
        "fr-FR"
      ),
      roles: this.fb.array([]),
    });

  }

  buildedRoles(p:PersonnelIntervention): FormGroup {

  console.log("---------260--",p);
    return this.fb.group(
      {
        roleid: p.IDrole,
        rolename: p.Role,
        pompiername:p.Personne,
      }
    );



  }


  buildRoles(name, id): FormGroup {

    return this.fb.group({
      roleid: id,
      rolename:name,
      pompiername: '',
    });

  }
  addTeam(index: number, value: string) {

    this.usedVehicule = [];
    var val = +value;
    let c = (<FormArray>this.AddInterventionForm.controls['vehiculesintervention']).at(index).get('roles') as FormArray;
    c.clear();
    //console.log(value);
    for (let i of this.vehicules) {
      if (i.V_ID == val) {
        for (let c of i.ROLE) {
          this.usedVehicule.push((new RoleVhicule(c.ROLE_ID, c.ROLE_NAME, '')));
          const control = (<FormArray>this.AddInterventionForm.controls['vehiculesintervention']).at(index).get('roles') as FormArray;
          control.push(this.buildRoles(c.ROLE_NAME, c.ROLE_ID));
        }



      }
    }
    this.usedVehicule.push(new RoleVhicule('0', 'apprenti(Optionel)', ''));
    const control = (<FormArray>this.AddInterventionForm.controls['vehiculesintervention']).at(index).get('roles') as FormArray;
    control.push(this.buildRoles("apprenti(Optionel)", "0"));
  }

  setIDintervention(): void {

    // recuperer l'id d'une intervention 
    this.dataService.getInterventionID().subscribe((resultat: number) => {
      this.response = JSON.parse(JSON.stringify(resultat));
      let c: number = 1 + Number(this.response.ID);;
      this.interventionID = "" + c;
      console.log(this.interventionID);
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
      console.log(this.listePompier);
      //console.log(this.listePompier);
      //  this.typesIntervention = this.response.typeIntervention;
      //console.log(this.typesIntervention[0]);
    });
  }
  // rajouter l'equipe d'apres le vehicule selectionnée


  selectEvent(item: string) {
    this.interventionForm.responsable = item;
  }

  addVehicule(): void {

    this.vehiculesintervention.push(this.buildVehicule());
  }
  onSubmit() {
 // suppression
    this.dataService.DeleteInterventionID(this.idIntervention).subscribe(

      result => {

        ///ajout
    // console.log(this.AddInterventionForm.value);
    // console.log('saved'+JSON.stringify(this.AddInterventionForm.value));
    console.log("-----------numerointer ", this.AddInterventionForm.value.numeroIntervention);

    this.interventionForm.numeroIntervention = this.AddInterventionForm.value.numeroIntervention;
    this.interventionForm.commune = this.AddInterventionForm.value.commune;
    this.interventionForm.adresse = this.AddInterventionForm.value.adresse;
    this.interventionForm.typeIntervention = this.AddInterventionForm.value.typeIntervention;
    this.interventionForm.requerant = this.AddInterventionForm.value.requerant;
    this.interventionForm.opm = this.AddInterventionForm.value.opm;
    console.log(this.AddInterventionForm.value.important);
    if (this.AddInterventionForm.value.important == "false")
      this.interventionForm.important = 0;
    else this.interventionForm.important = 1;
    this.interventionForm.dateDeclenchement = this.AddInterventionForm.value.dateDeclenchement;
    this.interventionForm.dateFin = this.AddInterventionForm.value.dateFin;
    this.interventionForm.heureDeclenchement = this.AddInterventionForm.value.heureDeclenchement;
    this.interventionForm.heureFin = this.AddInterventionForm.value.heureFin;
    this.interventionForm.responsable = this.AddInterventionForm.value.responsable;
    this.interventionForm.idcreateur = JSON.parse(localStorage.getItem("user")).P_ID;

    console.log(this.interventionForm);
    console.log("in onSubmit:");

    //ajout d'une intervention
    this.dataService.postInterventionForm(this.interventionForm).subscribe(
      result => {
        console.log("success hallelujah", result);
        var c: VehiculeUtilise;
    for (let vi of this.AddInterventionForm.value.vehiculesintervention) {
      c = {
        IdVehicule: vi.vehicule,
        IDIntervention: this.interventionID,
        DateDepart: vi.dateDepart,
        HeureDepart: vi.heureDepart,
        DateArrive: vi.dateArrivee,
        HeureArrive: vi.heureArrivee,
        DateRetour: vi.dateRetour,
        HeureRetour: vi.heureRetour,
        Ronde: vi.ronde
      };
      console.log(2);
      console.log(c);
      console.log(3);
      this.dataService.postVehiculeUsedForm(c).subscribe(
        result => {
          console.log("success", JSON.parse(JSON.stringify(result)));
          
      for (let pom of vi.roles) {
        console.log(pom);
        if (pom.roleid !== '0' || pom.pompiername != "") {
          console.log(pom.roleid);
          this.dataService.postMembertoInntervention(c.IdVehicule, this.interventionID, pom.roleid, pom.pompiername).subscribe(
            result => {
              console.log("success", JSON.parse(JSON.stringify(result)));
            },
            error => console.log("erreur", error)
          );
        }
      }
        },
        error => console.log("erreur", error)
      );





    }
      }

    );
    

      }
    );


 

  }

}


