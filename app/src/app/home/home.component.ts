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
    console.log(localStorage.getItem("setupTime"));
  }
}
