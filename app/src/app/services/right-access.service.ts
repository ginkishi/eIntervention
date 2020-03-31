import { Injectable } from "@angular/core";
import { Droit } from "../models/droit";

@Injectable({
  providedIn: "root"
})
export class RightAccessService {
  private static right: Droit[] = null;
  private writingAccess: boolean;
  private readingAccess: boolean;
  private editingAccess: boolean;
  private requestEditingAccess: boolean;
  private exportingAccess: boolean;
  private deletingAccess: boolean;
  private validatingAccess: boolean;
  constructor() {
    this.checkRight();
  }

  haveWritingAccess() {
    return this.writingAccess;
  }
  haveEditingAccess() {
    return this.editingAccess;
  }
  haveValidatingAccess() {
    return this.validatingAccess;
  }
  haveExportingAccess() {
    return this.exportingAccess;
  }
  haveReadinggAccess() {
    return this.readingAccess;
  }
  haveDeletingAccess() {
    return this.deletingAccess;
  }
  haveRequestEditingAccess() {
    return this.requestEditingAccess;
  }

  searchRight(id) {
    this.getRight().forEach(element => {
      if (element.F_ID == id) {
        return true;
      }
    });
    return false;
  }

  getRight() {
    if (RightAccessService.right == null) {
      RightAccessService.right = JSON.parse(localStorage.getItem("user")).ROLE;
    }
    return RightAccessService.right;
  }
  checkRight() {
    this.writingAccess = this.searchRight(78);
    if (this.writingAccess) console.log("A le droit d'écriture d'intervention");
    this.editingAccess = this.searchRight(79);
    this.validatingAccess = this.searchRight(80);
    this.readingAccess = this.searchRight(81);
    this.deletingAccess = this.searchRight(82);
    this.requestEditingAccess = this.searchRight(83);
    this.exportingAccess = this.searchRight(84);
  }
}
