import { Component, OnInit } from '@angular/core';
import { BrigadeApiService } from "../../services/brigade-api.service";
import { TypeIntervention } from "../../models/typeIntervention";
import { Vehicule } from "../../models/vehicule";
import { RoleVhicule } from "../../models/rolevehicule";

@Component({
  selector: 'app-intervention-add',
  templateUrl: './intervention-add.component.html',
  styleUrls: ['./intervention-add.component.scss']
})


export class InterventionAddComponent implements OnInit {
  response: any;
  typesIntervention: TypeIntervention[];
  vehicules :Vehicule[];
  selectedvehicule: string='';
  usedVehicule: RoleVhicule[];



  constructor(private apiService: BrigadeApiService) {}

  ngOnInit(): void {
    this.createListTypeIntervention();
    this.createListVehicule();
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
  addTeam(value: string){
  
    var val=+value;
    console.log(value);
    for (let i of this.vehicules) {
      if(i.V_ID==val){
        this.usedVehicule=i.ROLE;
     
      }
   
  }
 
  
 
  }
}
