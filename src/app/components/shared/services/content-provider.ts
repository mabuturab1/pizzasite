import { SaveDataOnlineService } from "./saveData";
import {
  singleItem,
  mainContent,
  headerLinks,
  SocialMedia
} from "./../interface";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class ContentProvider {
  constructor(private saveData: SaveDataOnlineService) {}
  itemsShow = new Subject<boolean>();
  navigateToRoute = new Subject<string>();
  private itemsToShow: singleItem[];
  allDataReceived = new Subject<boolean>();
  private socialMediaLinks: SocialMedia;
  private headerData: headerLinks[] = [];
  private mapItems: Map<string, mainContent> = new Map();
  private errorMap: Map<string, boolean> = new Map();
  errorNotifier = new Subject<string>();
  private hasModelShown = false;
  private isOnlineStatus = false;
  hasError(error: string) {
    this.errorNotifier.next(error);
  }
  setIsOnline(value: boolean) {
    this.isOnlineStatus = value;
  }
  initItems() {
    this.itemsToShow = this.mapItems.get(this.headerData[0].urlLabel).items;
    this.itemsShow.next(true);
  }
  getItems() {
    return this.itemsToShow;
  }
  getMainSectionData() {
    return this.mapItems.get(this.headerData[0].urlLabel).items;
  }
  getWholeData() {
    return this.getCopy(this.mapItems);
  }
  getAllKeys() {
    return this.mapItems.keys;
  }
  getHeaderData() {
    let items: headerLinks[] = new Array(this.mapItems.keys.length);
    this.headerData.forEach(value => {
      items.push({ ...value });
    });
    return items;
  }
  getHeaderCopy(newMap: Array<{ label: string; popUp: string[] }>) {
    let newMapItems: Array<{ label: string; popUp: string[] }> = [];
    newMap.forEach(value => {
      newMapItems.push({ label: value.label, popUp: value.popUp.slice() });
    });
    return newMapItems;
  }
  getCopy(newMap: Map<string, mainContent>) {
    let newMapItems: Map<string, mainContent> = new Map();
    newMap.forEach((value, key) => {
      let itemList: singleItem[] = [];

      if (!value) return;
      value.items.forEach(el => {
        itemList.push({ ...el });
      });

      newMapItems.set(key, {
        items: itemList
      });
    });
    return newMapItems;
  }
  setItemByUrl(urlName: string) {
    // console.log("Got url", urlName);
    // if (urlName === "home") {
    //   console.log(this.headerData[0].urlLabel);
    //   this.navigateToRoute.next(this.headerData[0].urlLabel);
    //   this.itemsToShow = this.mapItems.get(this.headerData[0].urlLabel).items;
    //   return;
    // }
    let item = this.headerData.find(val => {
      return val.urlName.toLowerCase() == urlName.toLowerCase();
    });
    if (item == null) item = this.headerData[0];
    if (!this.mapItems.has(item.urlLabel)) {
      this.itemsToShow = [];
      this.itemsShow.next(true);
      return;
    }
    this.itemsToShow = this.mapItems.get(item.urlLabel).items;
    this.itemsShow.next(true);
  }
  updateItems(newMapItems: Map<string, mainContent>) {
    this.mapItems = this.getCopy(newMapItems);

    this.saveAllItems();
    this.itemsShow.next(true);
  }
  processClickedItem(id: string) {
    if (this.mapItems.has(id)) {
      this.itemsToShow = this.mapItems.get(id).items;
      this.itemsShow.next(true);
    }
  }
  addNewPage(newData: headerLinks, newIndex: number) {
    let newHeaderData = this.getHeaderData();
    newHeaderData.splice(newIndex - 1, 0, newData);
    this.headerData = newHeaderData;
    this.mapItems.set(newData.urlLabel, {
      items: []
    });
    this.saveHeaderData();
    this.saveAllItems();

    this.itemsShow.next(true);
  }
  updateCurrentPage(
    prevData: headerLinks,
    newData: headerLinks,
    newIndex: number
  ) {
    let newHeaderData = this.getHeaderData();
    let index = newHeaderData.findIndex(val => {
      return val.urlLabel === prevData.urlLabel;
    });
    newHeaderData.splice(index, 1);
    newHeaderData.splice(newIndex - 1, 0, newData);
    this.headerData = newHeaderData;
    let content = this.mapItems.get(prevData.urlLabel);
    this.mapItems.delete(prevData.urlLabel);
    this.mapItems.set(newData.urlLabel, content);

    this.saveHeaderData();
    this.saveAllItems();
    this.itemsShow.next(true);
  }
  deleteHeadItem(index: number) {
    let id = this.headerData[index].urlLabel;
    this.mapItems.delete(id);
    this.headerData.splice(index, 1);
    this.saveHeaderData();
    this.saveAllItems();
    this.itemsShow.next(true);
  }
  deleteItemById(id: string, key: string) {
    let index = this.mapItems.get(key).items.findIndex(val => val.id === id);
    this.mapItems.get(key).items.splice(index, 1);
    this.saveHeaderData();
    this.saveAllItems();
    this.itemsShow.next(true);
  }
  setSocialMedia(socialMedia: SocialMedia) {
    this.socialMediaLinks = socialMedia;
    this.saveSocialMedia();
  }
  getSocialMedia() {
    return { ...this.socialMediaLinks };
  }
  saveAllData() {
    this.saveData.saveAllData(
      this.getWholeData(),
      this.getHeaderData(),
      this.getSocialMedia()
    );
  }
  saveAllItems() {
    this.saveData.saveAllItems(this.getWholeData(), (error: string) => {
      if (error) {
        this.errorNotifier.next("An error occurred while saving data");
      }
    });
  }
  saveHeaderData() {
    this.saveData.saveHeaderData(this.getHeaderData(), (error: string) => {
      if (error) {
        this.errorNotifier.next("An error occurred while saving data");
      }
    });
  }
  saveSocialMedia() {
    this.saveData.saveSocialMedia(this.getSocialMedia(), (error: string) => {
      if (error) {
        this.errorNotifier.next("An error occurred while saving data");
      }
    });
  }
  checkForCompleteData() {
    console.log(
      this.mapItems.size >= 1,
      this.headerData.length >= 1,
      this.socialMediaLinks != null
    );
    if (
      this.mapItems.size >= 1 &&
      this.headerData.length >= 1 &&
      this.socialMediaLinks != null
    ) {
      this.allDataReceived.next(true);
      this.itemsShow.next(true);
    }
  }
  fetchAllData() {
    if (!this.isOnlineStatus) {
      this.errorNotifier.next("An Error occurred while connecting to internet");
      return;
    }
    this.saveData.fetchAllData((responseName: string, data: any, error) => {
      if (responseName == "allItems") {
        if (error) {
          this.errorMap.set("allItems", true);
          this.errorNotifier.next("An error occurred while fetching data");
          return;
        }
        if (!data) {
          this.fetchAllItems(true);
          return;
        }
        this.mapItems = data;
        this.errorMap.set("allItems", false);
        this.itemsShow.next(true);
      } else if (responseName == "headerData") {
        if (error) {
          this.errorMap.set("headerData", true);
          this.errorNotifier.next("An error occurred while fetching data");
          return;
        }
        if (!data) {
          this.fetchHeaderData(true);
          return;
        }
        this.headerData = data;
        this.errorMap.set("headerData", false);
        this.itemsShow.next(true);
      } else if (responseName == "socialMedia") {
        if (error) {
          this.errorMap.set("socialMedia", true);
          this.errorNotifier.next("An error occurred while fetching data");
          return;
        }
        if (!data) {
          this.fetchSocialMedia(true);
          return;
        }
        this.socialMediaLinks = data;
        this.errorMap.set("socialMedia", false);
        this.itemsShow.next(true);
      }
      this.checkForCompleteData();
    });
  }
  fetchAllItems(globalData = false) {
    if (!this.isOnlineStatus) {
      this.errorNotifier.next("An Error occurred while connecting to internet");
      return;
    }
    this.saveData.fetchAllItems((response, error) => {
      if (error) {
        this.errorMap.set("allItems", true);
        this.errorNotifier.next("An error occurred while fetching data");
        return;
      }
      this.mapItems = response;
      this.itemsShow.next(true);
      this.errorMap.set("allItems", false);
      if (globalData) this.saveAllItems();
      this.checkForCompleteData();
    }, globalData);
  }
  fetchHeaderData(globalData = false) {
    if (!this.isOnlineStatus) {
      this.errorNotifier.next("An Error occurred while connecting to internet");
      return;
    }
    this.saveData.fetchHeaderData((response, error) => {
      if (error) {
        this.errorMap.set("headerData", true);
        this.errorNotifier.next("An error occurred while fetching data");
        return;
      }
      this.headerData = response;
      this.itemsShow.next(true);
      this.errorMap.set("headerData", false);
      if (globalData) this.saveHeaderData();
      this.checkForCompleteData();
    }, globalData);
  }
  fetchSocialMedia(globalData = false) {
    if (!this.isOnlineStatus) {
      this.errorNotifier.next("An Error occurred while connecting to internet");
      return;
    }
    this.saveData.fetchSocialMedia((response, error) => {
      if (error) {
        this.errorMap.set("socialMedia", true);
        this.errorNotifier.next("An error occurred while fetching data");
        return;
      }
      this.socialMediaLinks = response;
      this.itemsShow.next(true);
      this.errorMap.set("socialMedia", false);
      if (globalData) this.saveSocialMedia();
      this.checkForCompleteData();
    }, globalData);
  }
}
