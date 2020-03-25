import { Component, OnInit } from '@angular/core';
import { BrigadeApiService } from "../../services/brigade-api.service";
import { TypeIntervention } from "../../models/typeIntervention";
import { Vehicule } from "../../models/vehicule";
import { RoleVhicule } from "../../models/rolevehicule";
import { Pompier } from "../../models/pompier";
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-intervention-add',
  templateUrl: './intervention-add.component.html',
  styleUrls: ['./intervention-add.component.scss']
})


export class InterventionAddComponent implements OnInit {
  response: any;
  typesIntervention: TypeIntervention[];
  vehicules :Vehicule[];
  listPompiers: Pompier[];
  selectedvehicule: string='';
  usedVehicule: RoleVhicule[];

  myControl=new FormControl();
  options: string[];



  constructor(private apiService: BrigadeApiService) {}

  ngOnInit(): void {
    this.createListTypeIntervention();
    this.createListVehicule();
    this.createListPompiers();
  }

  createListTypeIntervention() :void
  {
      this.apiService.readAllTypeIntervention().subscribe((resultat: TypeIntervention[]) => {
   //   console.log(resultat);
      this.response = JSON.parse(JSON.stringify(resultat));
  //    console.log(this.response);
      this.typesIntervention = this.response.typeIntervention;
    //console.log(this.typesIntervention[0]);
    });
  }
  createListVehicule() :void
  {
    this.apiService.readAllVehicule().subscribe((res: Vehicule[]) => {
      this.response = JSON.parse(JSON.stringify(res));
      this.vehicules = this.response.vehicules;
      // console.log(this.vehicules);
    });
  }
  createListPompiers():void
  {
    this.apiService. readAllPompier().subscribe((res: Pompier[]) => {
      this.response = JSON.parse(JSON.stringify(res));
      this.listPompiers = this.response.listPompiers;
      for (let i of this.listPompiers) 
      {
         let str:string=i.P_PRENOM+" "+i.P_NOM;
         this.options.push(str);
         console.log(this.options);
      }
    });

  }
  addTeam(value: string)
  {
  
    var val=+value;
    console.log(value);
    for (let i of this.vehicules) {
      if(i.V_ID==val){
        this.usedVehicule=i.ROLE;
     
      }
   
  }
 
  
 
  }
}
