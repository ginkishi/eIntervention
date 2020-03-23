import { Component, OnInit } from "@angular/core";
import { BrigadeApiService } from "../services/brigade-api.service";
import { Vehicule } from "../models/vehicule";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  response: any;
  vehicules: Vehicule[];
  constructor(private apiService: BrigadeApiService) {}

  ngOnInit(): void {
    this.createListVehicule();
  }
  createListVehicule() {
    this.apiService.readAllVehicule().subscribe((res: Vehicule[]) => {
      this.response = JSON.parse(JSON.stringify(res));
      this.vehicules = this.response.vehicules;
      // console.log(this.vehicules);
    });
  }
}
