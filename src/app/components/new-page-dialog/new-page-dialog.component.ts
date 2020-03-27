import { NgForm } from "@angular/forms";
import {
  mainContent,
  headerLinks,
  dialogDataHeader
} from "./../shared/interface";
import { ContentProvider } from "./../shared/services/content-provider";
import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-new-page-dialog",
  templateUrl: "./new-page-dialog.component.html",
  styleUrls: ["./new-page-dialog.component.css"]
})
export class NewPageDialogComponent implements OnInit {
  showError = false;
  headerData: headerLinks[] = [];
  indexPosition: number[] = [];
  selectedValue: number;
  allLabels: string[] = [];
  allUrls: string[] = [];
  constructor(
    public dialogRef: MatDialogRef<NewPageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: headerLinks,
    private contentProvider: ContentProvider
  ) {}

  ngOnInit() {
    this.headerData = this.contentProvider.getHeaderData();
    this.headerData.forEach(val => {
      this.allLabels.push(val.urlLabel);
      this.allUrls.push(val.urlName);
    });
    let maxItems = this.headerData.length;

    if (this.data.urlLabel && this.data.urlLabel != "") {
      let index = this.headerData.findIndex(val => {
        return val.urlLabel === this.data.urlLabel;
      });
     
      if (index != -1) this.selectedValue = index + 1;
      else this.selectedValue = maxItems;
    } else {
      maxItems++;
      this.selectedValue = maxItems;
    }

    this.indexPosition = new Array(maxItems);
    for (var i = 0; i < maxItems; i++) this.indexPosition[i] = i + 1;
  }
  getFormData(form: NgForm) {
    let newItem: headerLinks;
    if (form.valid) {
      newItem = {
        urlLabel: form.value.urlLabel,
        urlName: form.value.urlName,
        urlPopUp: []
      };
    }
    return newItem;
  }
  onNoClick() {
    this.dialogRef.close();
  }
  onYesClicked(form: NgForm) {
    if (form.valid) {
      const itemToSend: dialogDataHeader = {
        newData: this.getFormData(form),
        prevData: this.data,
        newIndex: form.value.urlIndex
      };
      this.dialogRef.close(itemToSend);
    } else this.showError = true;
  }
}
