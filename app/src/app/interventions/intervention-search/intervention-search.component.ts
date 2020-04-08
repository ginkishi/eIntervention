import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgModel } from "@angular/forms";
import { formatDate } from "@angular/common";
import { Pompier } from 'src/app/models/pompier';
import { BrigadeApiService } from 'src/app/services/brigade-api.service';
import { DataService } from 'src/app/services/data.service';
import { Item } from 'src/app/models/item';
import { Intervention } from 'src/app/models/intervention';
@Component({
  selector: 'app-intervention-search',
  templateUrl: './intervention-search.component.html',
  styleUrls: ['./intervention-search.component.scss']
})
export class InterventionSearchComponent implements OnInit {
  
  itemsList: Item[] = [
    {
        name:'Numero d\'intervention',
        value:'numerointervention'
     },
     {
         name:'Date',
         value:'date'
      },
      {
          name:'Adresse',
          value:'adresse'
       },
       {
           name:'Redacteur',
           value:'redacteur'
        }
];
value:string;
radioSel:any;
radioSelected:string;
radioSelectedString:string;
item:string;
  numerointervention:string;
  adresse:string;
  date:string;
  redacteur:string;
  listePompier: string[] = [];
  intervention:Intervention[]=[];
  response:any;
  constructor(private apiService: BrigadeApiService,
    private dataService: DataService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
   
    this.createListAllPompier();
  }
  createListAllPompier(): void {
    this.apiService.readAllPompier().subscribe((resultat: Pompier[]) => {
      //   console.log(resultat);
      this.response = JSON.parse(JSON.stringify(resultat));
      for (let i of this.response.pompiers) {
        let c: string = i.P_PRENOM + " " + i.P_NOM;
        this.listePompier.push(c);
      }
    //  console.log(this.listePompier);
      //console.log(this.listePompier);
      //  this.typesIntervention = this.response.typeIntervention;
      //console.log(this.typesIntervention[0]);
    });
  }
  getSelecteditem(){
    this.radioSel = this.itemsList.find(Item => Item.value === this.radioSelected);
    this.radioSelectedString = JSON.stringify(this.radioSel);
  }

  onItemChange(item){
    this.getSelecteditem();
  }

  onSubmit(f){
    this.intervention=[];
    console.log(f.value);
    console.log(this.radioSelected);
    console.log(f.value.adresse);
    if(f.value.item='adresse')
    {
      this.dataService.getInterventionsbyAdresse(f.value.adresse).subscribe((resultat: Intervention[]) => {
        this.response = JSON.parse(JSON.stringify(resultat));
        this.intervention = this.response.interventions;
     
        console.log(this.intervention);
      });
    }
   if(f.value.item='numerointervention')
    {
      this.dataService.getInterventionsbyNum(f.value.numerointervention).subscribe((resultat: Intervention[]) => {
        this.response = JSON.parse(JSON.stringify(resultat));
        this.intervention = this.response.interventions;
     
        console.log(this.intervention);
      });
     
    }
    if(f.value.item='date')
    {
      
    }
    if(f.value.item='redacteur')
    {
      
    }
   
   
  }

}
