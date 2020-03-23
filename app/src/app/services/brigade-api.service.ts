import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Vehicule } from "../models/vehicule";
import { Observable } from "rxjs";
import { Pompier } from "../models/pompier";

@Injectable({
  providedIn: "root"
})
export class BrigadeApiService {
  PHP_API_SERVER = "http://localhost/eIntervention/api";
  constructor(private httpClient: HttpClient) {}

  readAllVehicule(): Observable<Vehicule[]> {
    return this.httpClient.get<Vehicule[]>(`${this.PHP_API_SERVER}/vehicule`);
  }
  readAllPompier(): Observable<Pompier[]> {
    return this.httpClient.get<Pompier[]>(`${this.PHP_API_SERVER}/pompier`);
  }
  readOnePompier(id: number): Observable<Pompier[]> {
    return this.httpClient.get<Pompier[]>(
      `${this.PHP_API_SERVER}/pompier/` + id
    );
  }
}
