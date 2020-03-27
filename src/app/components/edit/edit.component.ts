import { Subscription } from "rxjs";
import { ContentProvider } from "./../shared/services/content-provider";
import { singleItem, mainContent, headerLinks } from "./../shared/interface";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.component.html",
  styleUrls: ["./edit.component.css"]
})
export class EditComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  logoName: string;

  mapItems: Map<string, mainContent>;
  keysList: string[];
  headerData: headerLinks[];
  items: singleItem[];
  itemSubscription: Subscription;
  keys: string;
  constructor(private contentProvider: ContentProvider) {}

  ngOnInit() {
    this.mapItems = this.contentProvider.getWholeData();
    this.headerData = this.contentProvider.getHeaderData();
    this.itemSubscription = this.contentProvider.itemsShow.subscribe(result => {
      if (result) this.mapItems = this.contentProvider.getWholeData();
    });
    this.keysList = new Array(this.mapItems.keys.length);
    this.items = new Array(this.mapItems.keys.length);
  }
  getList(key: string) {
    return this.mapItems.get(key).items;
  }
  updateItems(event: singleItem[], key: string) {

    this.mapItems.set(key, { items: event });

    this.contentProvider.updateItems(this.mapItems);
  }
  deleteItem(event: singleItem, key: string) {
    this.contentProvider.deleteItemById(event.id, key);
  }
  ngOnDestroy() {
    this.itemSubscription.unsubscribe();
  }
}
