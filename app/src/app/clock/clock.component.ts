import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-clock",
  templateUrl: "./clock.component.html",
  styleUrls: ["./clock.component.scss"]
})
export class ClockComponent implements OnInit {
  public currentDate: Date;
  public currentTime: any;
  constructor() { }

  ngOnInit(): void {
    this.currentDate = new Date();

    if (this.currentDate.getMinutes() < 10) {
      this.currentTime =
        this.currentDate.getHours() +
        ":" +
        "0" +
        this.currentDate.getMinutes();
    } else {
      this.currentTime =
        this.currentDate.getHours() + ":" + this.currentDate.getMinutes();
    }
    setInterval(() => {
      this.currentDate = new Date();

      if (this.currentDate.getMinutes() < 10) {
        this.currentTime =
          this.currentDate.getHours() +
          ":" +
          "0" +
          this.currentDate.getMinutes();
      } else {
        this.currentTime =
          this.currentDate.getHours() + ":" + this.currentDate.getMinutes();
      }
    }, 1000);
  }
}
