import { AuthProcessService } from "ngx-auth-firebaseui";
import { mainContent, headerLinks, SocialMedia } from "./../interface";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
interface MapItemData {
  urlLabel: string;
  data: mainContent;
}
@Injectable({ providedIn: "root" })
export class SaveDataOnlineService {
  idToken: String;
  url = "https://portfolio-abuturab.firebaseio.com";
  generalUrl = "https://portfolio-abuturab.firebaseio.com" + "/global";
  userUrl = "https://portfolio-abuturab.firebaseio.com" + "/users/";
  uid: string = "";
  constructor(
    private http: HttpClient,
    private authProcessService: AuthProcessService
  ) {}
  isLoggedIn = false;
  async setUid(uid) {
    this.isLoggedIn = true;
    this.uid = uid;

    this.url = this.userUrl + this.uid;
  }
  async setGeneral() {
    const id = await this.authProcessService.user.getIdToken();
    this.isLoggedIn = false;
    this.url = this.generalUrl;
  }
  async saveAllData(
    mapItems: Map<string, mainContent>,
    headerData: headerLinks[],
    socialMedia: SocialMedia
  ) {
    if (!this.isLoggedIn) return;
    const id = await this.authProcessService.user.getIdToken();

    let newData: MapItemData[] = [];

    mapItems.forEach((val, key) => {
      newData.push({
        urlLabel: key,
        data: { ...val }
      });
    });
    this.http
      .put(this.url + "/allItems.json" + "?auth=" + id, newData)
      .pipe(
        map((data: MapItemData[]) => {
          return data;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      )
      .subscribe(res => {});
    this.http
      .put(this.url + "/headerData.json" + "?auth=" + id, headerData)
      .pipe(
        map((data: { [key: string]: headerLinks[] }) => {
          return data;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      )
      .subscribe();
    this.http
      .put(this.url + "/socialMedia.json" + "?auth=" + id, socialMedia)
      .pipe(
        map((data: { [key: string]: SocialMedia }) => {
          return data;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      )
      .subscribe();
  }
  async saveAllItems(mapItems: Map<String, mainContent>, callback) {
    const id = await this.authProcessService.user.getIdToken();
    if (!this.isLoggedIn) return;
    let newData: any = [];

    mapItems.forEach((val, key) => {
      newData.push({
        urlLabel: key,
        data: { ...val }
      });
    });
    this.http
      .put(this.url + "/allItems.json" + "?auth=" + id, newData)
      .pipe(
        map((data: { [key: string]: Map<string, mainContent> }) => {
          return data;
        }),
        catchError(errorRes => {
          callback("An error occurred");
          return throwError(errorRes);
        })
      )
      .subscribe();
  }
  async saveHeaderData(headerData: headerLinks[], callback) {
    if (!this.isLoggedIn) return;
    const id = await this.authProcessService.user.getIdToken();
    this.http
      .put(this.url + "/headerData.json" + "?auth=" + id, headerData)
      .pipe(
        map((data: { [key: string]: headerLinks[] }) => {
          return data;
        }),
        catchError(errorRes => {
          callback("An error occurred");
          return throwError(errorRes);
        })
      )
      .subscribe();
  }
  async saveSocialMedia(socialMedia: SocialMedia, callback) {
    if (!this.isLoggedIn) return;
    const id = await this.authProcessService.user.getIdToken();
    this.http
      .put(this.url + "/socialMedia.json" + "?auth=" + id, socialMedia)
      .pipe(
        map((data: { [key: string]: SocialMedia }) => {
          return data;
        }),
        catchError(errorRes => {
          callback("An error occurred");
          return throwError(errorRes);
        })
      )
      .subscribe();
  }
  async fetchAllData(callback, globalData = false) {
    this.fetchAllItems(
      (data, error) => callback("allItems", data, error),
      globalData
    );
    this.fetchHeaderData(
      (data, error) => callback("headerData", data, error),
      globalData
    );
    this.fetchSocialMedia(
      (data, error) => callback("socialMedia", data, error),
      globalData
    );
  }
  async fetchAllItems(
    callback: (data: Map<string, mainContent>, error: string) => void,
    globalData = false
  ) {
    const id = await this.authProcessService.user.getIdToken();
    this.http
      .get(
        globalData
          ? this.generalUrl + "/allItems.json" + "?auth=" + id
          : this.url + "/allItems.json" + "?auth=" + id
      )
      .pipe(
        map((data: { urlLabel: string; data: mainContent }[]) => {
          let mapItems: Map<string, mainContent> = new Map();
          if (!data) {
            callback(null, null);
            return;
          }
          data.forEach(val => {
            mapItems.set(val.urlLabel, { ...val.data });
          });

          callback(mapItems, null);
        }),
        catchError(errorRes => {
          callback(undefined, "An Error occurred");
          return throwError(errorRes);
        })
      )
      .subscribe();
  }
  async fetchHeaderData(callback, globalData = false) {
    const id = await this.authProcessService.user.getIdToken();
    this.http
      .get(
        globalData
          ? this.generalUrl + "/headerData.json" + "?auth=" + id
          : this.url + "/headerData.json" + "?auth=" + id
      )
      .pipe(
        map((data: headerLinks[]) => {
          callback(data, null);
        }),
        catchError(errorRes => {
          callback(null, "An error ocurred");
          return throwError(errorRes);
        })
      )
      .subscribe();
  }
  async fetchSocialMedia(callback, globalData = false) {
    const id = await this.authProcessService.user.getIdToken();
    this.http
      .get(
        globalData
          ? this.generalUrl + "/socialMedia.json" + "?auth=" + id
          : this.url + "/socialMedia.json" + "?auth=" + id
      )
      .pipe(
        map((data: SocialMedia) => {
          callback(data, null);
        }),
        catchError(errorRes => {
          callback(null, "An error ocurred");
          return throwError(errorRes);
        })
      )
      .subscribe();
  }
}
