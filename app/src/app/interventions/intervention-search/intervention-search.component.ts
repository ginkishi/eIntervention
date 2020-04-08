import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from "@angular/forms";
import { formatDate } from "@angular/common";
import { Pompier } from 'src/app/models/pompier';
import { BrigadeApiService } from 'src/app/services/brigade-api.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-intervention-search',
  templateUrl: './intervention-search.component.html',
  styleUrls: ['./intervention-search.component.scss']
})
export class InterventionSearchComponent implements OnInit {
  
  SearchForm: FormGroup = new FormGroup({

  });
  date:string;
  adresse:string;
  redacteur:string;
  numeroIntervention:string;
  listePompier: string[] = [];
  response:any;
  constructor(private apiService: BrigadeApiService,
    private dataService: DataService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.SearchForm=this.fb.group({
      date:formatDate(
        new Date(),
        "yyyy-MM-dd",
        "fr-FR"
      ),
      numeroIntervention:null,
      adresse:null,
      redacteur:null
    });
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

  onSubmit(){
    console.log(this.SearchForm.value);
  }

}
