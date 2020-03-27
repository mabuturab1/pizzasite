import { singleItem, dialogData } from "./../shared/interface";
import { Component, OnInit, Inject } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-my-dialog",
  templateUrl: "./my-dialog.component.html",
  styleUrls: ["./my-dialog.component.css"]
})
export class MyDialogComponent implements OnInit {
  urlNotValid = false;
  showError = false;
  defaultUrl: string =
    "https://images.unsplash.com/photo-1493124325580-27c4b1f7e4c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80";
  constructor(
    public dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}
  onSubmitForm(form: NgForm) {
    let newItem: singleItem;
    if (form.valid) {
      newItem = form.value;
    }
  }
  getFormData(form: NgForm) {
    let newItem: singleItem;
    if (form.valid) {
      newItem = { ...form.value, id: new Date().toString() };
    }
    return newItem;
  }
  onNoClick() {
    this.dialogRef.close();
  }
  onYesClicked(form: NgForm) {
    if (form.valid) {
      const itemToSend: dialogData = {
        newData: this.getFormData(form),
        prevData: this.data
      };
      this.dialogRef.close(itemToSend);
    } else this.showError = true;
  }
  updateUrl(isTouched: boolean, imageSrc: any) {
    if (isTouched) {
      imageSrc.value = this.defaultUrl;
    }
  }
}
