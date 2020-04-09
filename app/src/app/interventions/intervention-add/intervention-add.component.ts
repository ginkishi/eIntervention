import { Component, OnInit } from "@angular/core";
import { BrigadeApiService } from "../../services/brigade-api.service";
import { TypeIntervention } from "../../models/typeIntervention";
import { Vehicule } from "../../models/vehicule";
import { RoleVhicule } from "../../models/rolevehicule";
import { FormIntervention } from "../../models/formIntervention";
import { DataService } from "src/app/services/data.service";
import { FormBuilder, FormControl,FormGroup, FormArray } from "@angular/forms";
import { formatDate } from "@angular/common";
import { ProfilComponent } from "src/app/profil/profil.component";
import { Pompier } from "src/app/models/pompier";
import { VehiculeUtilise } from "src/app/models/vehiculeutilise";
import { NotExpr } from '@angular/compiler';
import { PompierRoles } from 'src/app/models/pompierRoles';
import { stringify } from 'querystring';

@Component({
  selector: "app-intervention-add",
  templateUrl: "./intervention-add.component.html",
  styleUrls: ["./intervention-add.component.scss"]
})
export class InterventionAddComponent implements OnInit {
  AddInterventionForm: FormGroup;
  interventionForm: FormIntervention = {
    numeroIntervention: null, //temporaire
    commune: "boumerdes",
    adresse: null,
    typeIntervention: null,
    requerant: "Alerte locale",
    opm: 0,
    important: 0,
    dateDeclenchement: "2020-03-31",
    heureDeclenchement:"16:52",
    dateFin: "2020-03-31",
    heureFin:"16:52",
    // ici faudra recuper l'id de la session
    responsable:JSON.parse(localStorage.getItem("user")).P_PRENOM +
    " " +
    JSON.parse(localStorage.getItem("user")).P_NOM,

    idcreateur:JSON.parse(localStorage.getItem("user")).P_ID,
    statut:0
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
   nbvehicule:Number=0;
  listePompier: string[] = [];
  response: any;
  typesIntervention: TypeIntervention[];
  vehicules: Vehicule[];
  selectedvehicule: string = "";
  usedVehicule: RoleVhicule[];
  interventionID:string;
  status:number;
  sauvegarder:string="sauvegarder";
  valider:string="valider";
  get vehiculesintervention():FormArray{

    return <FormArray>this.AddInterventionForm.get('vehiculesintervention');
  }
  get roles():FormArray{
    return <FormArray>this.vehiculesintervention.get('roles');
  }
  
  constructor(
    private apiService: BrigadeApiService,
    private dataService: DataService,
    private fb:FormBuilder,
  ) {}

  ngOnInit(): void {
    this.AddInterventionForm=this.fb.group({
      numeroIntervention:"",
      commune: "",
      adresse: "",
      typeIntervention:"",
      requerant:"Alerte locale",
      opm:false,
      important: false,
      dateDeclenchement: formatDate(
        new Date(),
        "yyyy-MM-dd",
        "fr-FR"
      ),
      heureDeclenchement:  formatDate(
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
     
      vehiculesintervention:this.fb.array([this.buildVehicule()]),
      responsable:JSON.parse(localStorage.getItem("user")).P_PRENOM +
      " " +
      JSON.parse(localStorage.getItem("user")).P_NOM,
      sauvegarder:"Sauvegarder",
      valider:"Valider",


    });
  /*his.usedVehicule.push(new RoleVhicule('0','Apprenti(Optionel)',''));
        this.usedVehicule[0].POMPIER_NAME=
        JSON.parse(localStorage.getItem("user")).P_PRENOM +
        " " +
        JSON.parse(localStorage.getItem("user")).P_NOM;
      }
    )
   */
    this.interventionForm.idcreateur = JSON.parse(
      localStorage.getItem("user")
    ).P_ID;
   
    // this.datepipe.transform(this.interventionForm.dateDeclenchement,'dd/MM/yyyy');

    this.createListTypeIntervention();
    this.setIDintervention();
    this.createListVehicule();
    this.createListAllPompier();
  }
  
  buildVehicule(): FormGroup{
    return this.fb.group({
      vehicule: "",
      ronde:'false',
      dateDepart:formatDate(
        new Date(),
        "yyyy-MM-dd",
        "fr-FR"
      ),
      heureDepart:formatDate(
        new Date(),
        "shortTime",
        "fr-FR"
      ),
      dateArrivee:formatDate(
        new Date(),
        "yyyy-MM-dd",
        "fr-FR"
      ),
      heureArrivee:formatDate(
        new Date(),
        "shortTime",
        "fr-FR"
      ),
      dateRetour:formatDate(
        new Date(),
        "yyyy-MM-dd",
        "fr-FR"
      ),
      heureRetour:formatDate(
        new Date(),
        "shortTime",
        "fr-FR"
      ),
     roles:this.fb.array([]),
    });
    
  }
  getvalue(value: string){
    if(value=="sauvegarder")
    {
        this.status=0;
    }
    else
    {
     this.status=1;
    }
   
  }
  buildRoles(name,id):FormGroup{
   if(this.nbvehicule==0)
   {  this.nbvehicule=1;
    return this.fb.group({
      roleid:id,
      rolename:name,
      pompiername:JSON.parse(localStorage.getItem("user")).P_PRENOM +
      " " +
      JSON.parse(localStorage.getItem("user")).P_NOM,
    });
   }
   else
   {
    return this.fb.group({
      roleid:id,
      rolename:name,
      pompiername:'',
    });
   }
  

  }
  addTeam(index:number,value: string) {
    
    this.usedVehicule=[];
    var val = +value;
    let c= (<FormArray>this.AddInterventionForm.controls['vehiculesintervention']).at(index).get('roles') as FormArray;
    c.clear();
    //console.log(value);
    for (let i of this.vehicules) {
      if (i.V_ID == val) {
        for( let c of  i.ROLE)
        {  
          this.usedVehicule.push((new RoleVhicule(c.ROLE_ID,c.ROLE_NAME,'')));
          const control = (<FormArray>this.AddInterventionForm.controls['vehiculesintervention']).at(index).get('roles') as FormArray;
          control.push(this.buildRoles(c.ROLE_NAME,c.ROLE_ID));
        }

          
       
      }
    }
    this.usedVehicule.push(new RoleVhicule('0','apprenti(Optionel)',''));
    const control = (<FormArray>this.AddInterventionForm.controls['vehiculesintervention']).at(index).get('roles') as FormArray;
          control.push(this.buildRoles("apprenti(Optionel)","0"));
  }
 
  setIDintervention():void{

 // recuperer l'id d'une intervention 
      this.dataService.getInterventionID().subscribe((resultat :number)=>{
      this.response=JSON.parse(JSON.stringify(resultat));
      let c:number=1+Number(this.response.ID);;
      this.interventionID=""+c;
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

      //console.log(this.listePompier);
      //  this.typesIntervention = this.response.typeIntervention;
      //console.log(this.typesIntervention[0]);
    });
  }
  // rajouter l'equipe d'apres le vehicule selectionnée
 

  selectEvent(item: string) {
    this.interventionForm.responsable = item;
  }

  addVehicule():void{

    this.vehiculesintervention.push(this.buildVehicule());
  }
  deleteVehicule(i:number){
    const control=this.vehiculesintervention as FormArray;
    control.removeAt(i);

  }
 onSubmit() {


   console.log("------------------",this.AddInterventionForm.value);
  // console.log('saved'+JSON.stringify(this.AddInterventionForm.value));
  console.log("-----------numerointer ",this.AddInterventionForm.value.numeroIntervention);
  
   this.interventionForm.numeroIntervention=this.AddInterventionForm.value.numeroIntervention;
   this.interventionForm.commune=this.AddInterventionForm.value.commune;
   this.interventionForm.adresse=this.AddInterventionForm.value.adresse;
   this.interventionForm.typeIntervention=this.AddInterventionForm.value.typeIntervention;
   this.interventionForm.requerant=this.AddInterventionForm.value.requerant;
   this.interventionForm.opm=this.AddInterventionForm.value.opm;
   console.log(this.AddInterventionForm.value.important);
   if(this.AddInterventionForm.value.important=="false")
   this.interventionForm.important=0;
   else  this.interventionForm.important=1;
   this.interventionForm.dateDeclenchement=this.AddInterventionForm.value.dateDeclenchement;
   this.interventionForm.dateFin=this.AddInterventionForm.value.dateFin;
   this.interventionForm.heureDeclenchement=this.AddInterventionForm.value.heureDeclenchement;
   this.interventionForm.heureFin=this.AddInterventionForm.value.heureFin;
   this.interventionForm.responsable=this.AddInterventionForm.value.responsable;
   this.interventionForm.idcreateur=JSON.parse(localStorage.getItem("user")).P_ID;
   this.interventionForm.statut=this.status;
   console.log(this.interventionForm);
  console.log("in onSubmit:");

       //ajout d'une intervention
     this.dataService.postInterventionForm(this.interventionForm).subscribe(
      result =>
      {
        console.log("success hallelujah",result);
        var c:VehiculeUtilise;
        for(let vi of this.AddInterventionForm.value.vehiculesintervention)
        { c={
          IdVehicule:vi.vehicule,
          IDIntervention:this.interventionID,
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
            result => 
            {
              console.log("success", JSON.parse(JSON.stringify(result)));
            },
            error => console.log("erreur", error)
          );
          
          for(let pom of vi.roles)
          {  console.log("-----",vi.roles);
            if(pom.roleid!=='0' || pom.pompiername!="")
          {
          console.log(c.IdVehicule,this.interventionID,pom.roleid,pom.pompiername);
            this.dataService.postMembertoInntervention(c.IdVehicule,this.interventionID,pom.roleid,pom.pompiername).subscribe(
              result => 
              {
                console.log("success", JSON.parse(JSON.stringify(result)));
              },
              error => console.log("erreur", error)
            );
            }
            else if(pom.roleid=='0' && pom.pompiername!="")
            {
              console.log(c.IdVehicule,this.interventionID,pom.roleid,pom.pompiername);
            this.dataService.postMembertoInntervention(c.IdVehicule,this.interventionID,pom.roleid,pom.pompiername).subscribe(
              result => 
              {
                console.log("success", JSON.parse(JSON.stringify(result)));
              },
              error => console.log("erreur", error)
            );
            }
          }
        
          
          
             
        }    
      }
   
    );
  
     
  }

}  
    
 
