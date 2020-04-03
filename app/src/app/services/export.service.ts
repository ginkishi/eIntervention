import { Injectable } from "@angular/core";
import { AngularCsv } from "angular7-csv/dist/Angular-csv";
import * as xlsx from "xlsx";

@Injectable({
  providedIn: "root"
})
export class ExportService {
  data: any;
  // csvOptions = {
  //   fieldSeparator: ',',
  //   quoteStrings: '"',
  //   decimalseparator: '.',
  //   showLabels: true,
  //   showTitle: true,
  //   title: 'Your Holiday List :',
  //   useBom: true,
  //   noDownload: false,
  //   headers: ["Holiday ID", "Holiday Date", "Holiday Comment", "Holiday Status"]
  // };
  constructor() {}

  exportToCSV(data, nameFile: string, options = null) {
    new AngularCsv(data, nameFile, options);
  }
  exportToExcel(epltable) {
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(
      epltable.nativeElement
    );
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
    xlsx.writeFile(wb, "testExcel.xlsx");
  }
}
