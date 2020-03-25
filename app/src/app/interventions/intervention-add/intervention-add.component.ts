import { Component, OnInit } from '@angular/core';
import { BrigadeApiService } from "../../services/brigade-api.service";
import { TypeIntervention } from "../../models/typeIntervention";
import { Vehicule } from "../../models/vehicule";
import { RoleVhicule } from "../../models/rolevehicule";
import { FormIntervention } from "../../models/formIntervention";

@Component({
  selector: 'app-intervention-add',
  templateUrl: './intervention-add.component.html',
  styleUrls: ['./intervention-add.component.scss']
})


export class InterventionAddComponent implements OnInit {
  interventionForm: FormIntervention ={
    numeroIntervention: +'2515',
    commune: '',
    adresse: '',
    typeIntervention: '',
    requerant:'',
    opm:false,
    important:false,
    dateDeclenchement: new Date(),
    heureDeclenchement:new Date(),
    dateFin: new Date(),
    heureFin:new Date(),
    responsable:'admin admin'
  }
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
  // rajouter l'equipe d'apres le vehicule selectionnée
  addTeam(value: string){
  
    var val=+value;
    console.log(value);
    for (let i of this.vehicules) 
    {
      if(i.V_ID==val)
      {
        this.usedVehicule=i.ROLE;
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
}
