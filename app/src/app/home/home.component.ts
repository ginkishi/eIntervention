import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { BrigadeApiService } from "../services/brigade-api.service";
import { Vehicule } from "../models/vehicule";
import { Pompier } from "../models/pompier";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  response: any;
  vehicules: Vehicule[];
  unPompier: Pompier;
  constructor(private apiService: BrigadeApiService) {}

  ngOnInit(): void {
    // this.createListVehicule();
    // this.displayMyProfil();
    console.log(JSON.parse(localStorage.getItem("user")));
  }
  // createListVehicule() {
  //   this.apiService.readAllVehicule().subscribe((res: Vehicule[]) => {
  //     this.response = JSON.parse(JSON.stringify(res));
  //     this.vehicules = this.response.vehicules;
  //     // console.log(this.vehicules);
  //   });
  // }
  // displayMyProfil() {
  //   this.apiService.readOnePompier(3).subscribe((res: Pompier) => {
  //     this.response = JSON.parse(JSON.stringify(res));
  //     this.unPompier = this.response.pompier;
  //     console.log(this.unPompier);
  //   });
  // }
}
