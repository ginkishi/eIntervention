import { Injectable } from '@angular/core';
import { FormIntervention } from '../models/formIntervention';
import { VehiculeUtilise} from '../models/vehiculeutilise';
import { Formatmember} from '../models/formatmembre';
import { Observable,of } from 'rxjs';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
import { Modification } from '../models/modification';
import { Intervention } from '../models/intervention';

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

 const t=  this.http.post(`${this.PHP_API_SERVER}/vehicule`,vehiculeUtilise);
 
  return t;
 
// return of(formIntervention);

} 
setRemarques(m:Modification):Observable<any>{
  console.log("do remark");
  const result= this.http.post(`${this.PHP_API_SERVER}/modification`,m);
  console.log('do remak 1');
  return result;
}
getRemarques(id:number ):Observable<any>{
  console.log("recuperer remak1");
  const result= this.http.get(`${this.PHP_API_SERVER}/modification/`+id);
  console.log('recuperer remark1',result);
  return result;
// return of(formIntervention);
}
getInterventionID( ):Observable<any>{
  console.log("recuperer id de l'intervention");
  const result= this.http.get(`${this.PHP_API_SERVER}/lastintervention`);
  console.log('resultat requete',result);
  return result;
// return of(formIntervention);
}
DeleteInterventionID(id:number ):Observable<{}>{
  console.log("recuperer id de l'intervention");
  const result= this.http.delete(`${this.PHP_API_SERVER}/deleteintervention/`+id);
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

getInterventionsbyNum(id:number ):Observable<Intervention[]>{
  return this.http.get<Intervention[]>(
    `${this.PHP_API_SERVER}/search/` + id
  );
  
  
// return of(formIntervention);
}
getInterventionsbyAdresse(adr:string):Observable<Intervention[]>{
  return this.http.get<Intervention[]>(
    `${this.PHP_API_SERVER}/searchByadr/` +adr
  );
}
}