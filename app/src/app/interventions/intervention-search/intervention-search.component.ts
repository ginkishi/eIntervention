import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from "@angular/forms";
import { formatDate } from "@angular/common";
@Component({
  selector: 'app-intervention-search',
  templateUrl: './intervention-search.component.html',
  styleUrls: ['./intervention-search.component.scss']
})
export class InterventionSearchComponent implements OnInit {

  SearchForm: FormGroup = new FormGroup({
 
  });
  constructor() { }

  ngOnInit(): void {
    this.SearchForm.patchValue({
      date:formatDate(
        new Date(),
        "yyyy-MM-dd",
        "fr-FR"
      ),
      numeroIntervention:null,
      adresse:null,
      redacteur:null
    });
  }

  onSubmit(){
    console.log(this.SearchForm.value);
  }

}
