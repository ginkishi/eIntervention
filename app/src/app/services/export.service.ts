import { Injectable } from '@angular/core';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  data: any;
  // csvOptions = {
  //   fieldSeparator: ',',
  //   quoteStrings: ''',
  //   decimalseparator: '.',
  //   showLabels: true,
  //   showTitle: true,
  //   title: 'Your Holiday List :',
  //   useBom: true,
  //   noDownload: false,
  //   headers: ['Holiday ID', 'Holiday Date', 'Holiday Comment', 'Holiday Status']
  // };
  constructor() { }

  exportToCSV(data, nameFile: string, options = null) {
    new AngularCsv(data, nameFile, options);
  }
}
