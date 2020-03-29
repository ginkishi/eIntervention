import { Injectable } from '@angular/core';
import { FormIntervention } from '../models/formIntervention';
import { VehiculeUtilise} from '../models/vehiculeutilise';
import { Formatmember} from '../models/formatmembre';
import { Observable,of } from 'rxjs';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  PHP_API_SERVER = "http://localhost/eIntervention/api";
  constructor(private http: HttpClient) { }

postInterventionForm( formIntervention: FormIntervention){
       
         const result=  this.http.post(`${this.PHP_API_SERVER}/intervention`,formIntervention);
      
       return result;
   // return of(formIntervention);

  }
  postVehiculeUsedForm(vehiculeUtilise: VehiculeUtilise):Observable<any>{
    console.log("coucou");
    console.log(vehiculeUtilise);
    console.log("coucou1");
 const t=  this.http.post(`${this.PHP_API_SERVER}/vehicule`,vehiculeUtilise);
 
  return t;
 
// return of(formIntervention);

} 

getInterventionID( ):Observable<any>{
  console.log("recuperer id de l'intervention");
  const result= this.http.get(`${this.PHP_API_SERVER}/lastintervention`);
  console.log('resultat requete',result);
  return result;
// return of(formIntervention);
}
//$IDvehicule, $IDintervention,$IDrole,$nom
postMembertoInntervention(IDvehicule:string, IDintervention:string,IDrole:string,nom:string ):Observable<any>{
  let format:Formatmember={IDvehicule, IDintervention,IDrole,nom};
const t=  this.http.post(`${this.PHP_API_SERVER}/addMember`,format);

return t;

}
}
