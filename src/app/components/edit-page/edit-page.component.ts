import { DeleteDialogComponent } from "../delete-dialog/delete-dialog.component";
import { ContentProvider } from "./../shared/services/content-provider";
import {
  headerLinks,
  dialogDataHeader,
  SocialMedia
} from "./../shared/interface";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { NewPageDialogComponent } from "../new-page-dialog/new-page-dialog.component";
import { Subscription } from "rxjs";

@Component({
  selector: "app-edit-page",
  templateUrl: "./edit-page.component.html",
  styleUrls: ["./edit-page.component.css"]
})
export class EditPageComponent implements OnInit, OnDestroy {
  headerItems: headerLinks[];
  itemName = "Headers";
  dataSubscribe: Subscription;
  socialMedia: SocialMedia;
  itemDescription = "Create new header links";
  constructor(
    private contentProvider: ContentProvider,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.socialMedia = this.contentProvider.getSocialMedia();
    this.headerItems = this.contentProvider.getHeaderData();
    this.dataSubscribe = this.contentProvider.itemsShow.subscribe(result => {
      if (result) this.headerItems = this.contentProvider.getHeaderData();
    });
  }
  itemClicked(event) {
    let dialogRef = this.dialog.open(NewPageDialogComponent, {
      data: event !== "add" ? event : { urlLabel: "", urlName: "" },
      maxHeight: "800px",
      width: "700px"
    });
    dialogRef.afterClosed().subscribe((result: dialogDataHeader) => {
      
     
      if (result == null) return;
      if (result.prevData) {
        let index = this.headerItems.indexOf(result.prevData);
   
        if (index === -1) {
          this.contentProvider.addNewPage(result.newData, result.newIndex);
        } else {
          this.contentProvider.updateCurrentPage(
            result.prevData,
            result.newData,
            result.newIndex
          );
        }
      }
    });
  }
  getShallowCopy(itemList: headerLinks[]) {
    let items = [];
    itemList.forEach(value => {
      items.push({ ...value });
    });
    return items;
  }
  itemDelete(event: headerLinks, index: number) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        header: "Delete " + event.urlLabel,
        description:
          "Deleting this item will also delete all page content. Click okay to delete all."
      },
      maxHeight: "800px",
      width: "700px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.contentProvider.deleteHeadItem(index);
    });
  }
  ngOnDestroy() {
    this.dataSubscribe.unsubscribe();
  }
  saveSocialMedia(expansion: any) {
    this.contentProvider.setSocialMedia(this.socialMedia);
    expansion.close();
  }
}
