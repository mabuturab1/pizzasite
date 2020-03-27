import { DeleteDialogComponent } from "../../delete-dialog/delete-dialog.component";
import { MyDialogComponent } from "../../my-dialog/my-dialog.component";
import { singleItem, dialogData } from "../../shared/interface";
import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-single-edit",
  templateUrl: "./single-edit.component.html",
  styleUrls: ["./single-edit.component.css"]
})
export class SingleEditComponent implements OnInit {
  @Input() itemName: string;
  @Input() itemDescription: string;
  @Input() itemList: singleItem[];
  @Input() itemId;
  @Output() itemListener = new EventEmitter<singleItem[]>();
  @Output() deleteListener = new EventEmitter<singleItem>();
  isEditing = false;
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}
  itemClicked(event) {
    let dialogRef = this.dialog.open(MyDialogComponent, {
      data: event,
      maxHeight: "800px",
      width: "700px"
    });
    dialogRef.afterClosed().subscribe((result: dialogData) => {
      if (result == null) return;
      if (result.prevData) {
        let index = this.itemList.indexOf(result.prevData);

        if (index === -1) {
          this.itemListener.emit(this.itemList.concat([result.newData]));
        } else {
          let newList = this.getShallowCopy(this.itemList);

          newList[index] = { ...result.newData };

          this.itemListener.emit(newList);
        }
      }
    });
  }
  getShallowCopy(list: singleItem[]) {
    const newList: singleItem[] = [];
    list.forEach(val => {
      newList.push({ ...val });
    });
    return newList;
  }
  itemDelete(event: singleItem) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        header: "Delete " + event.titleText,
        description: "Are you sure you want to delete. Click okay to proceed"
      },
      maxHeight: "800px",
      width: "700px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.deleteListener.emit(event);
    });
  }
}
