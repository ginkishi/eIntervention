import { Injectable } from '@angular/core';
import { FormIntervention } from '../models/formIntervention';
import { Observable,of } from 'rxjs';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  PHP_API_SERVER = "http://localhost/eIntervention/api";
  constructor(private http: HttpClient) { }

  postInterventionForm( formIntervention: FormIntervention):Observable<any>{
         console.log(formIntervention);
       return this.http.post(`${this.PHP_API_SERVER}/intervention`,formIntervention,{
         headers: new HttpHeaders({
           'content-type': 'application/json'
         })
       });
   // return of(formIntervention);

  }
}
