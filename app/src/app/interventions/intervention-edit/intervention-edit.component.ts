import { Component, OnInit } from '@angular/core';
import { BrigadeApiService } from 'src/app/services/brigade-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-intervention-edit',
  templateUrl: './intervention-edit.component.html',
  styleUrls: ['./intervention-edit.component.scss']
})
export class InterventionEditComponent implements OnInit {
   idIntervention: number;
  constructor(public api: BrigadeApiService,
    public routeActive: ActivatedRoute) { }
 
  ngOnInit(): void {
    this.getID();
    console.log(this.idIntervention);
  }
  getID() {
    this. idIntervention = this.routeActive.snapshot.params.id;
  }
}
