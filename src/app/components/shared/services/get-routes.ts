import { EditComponent } from "./../../edit/edit.component";
import { MainSectionComponent } from "./../../main-section/main-section.component";
import { Routes } from "@angular/router";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class getRoutes {
  routesToShow: Routes = [
    { path: "", redirectTo: "/pizza", pathMatch: "full" },
    { path: "pizza", component: MainSectionComponent },
    { path: "burger", component: MainSectionComponent },
    { path: "drinks", component: MainSectionComponent },
    { path: "editShop", component: EditComponent }
  ];
  routesUpdated = new Subject<boolean>();
  getRoutes() {
    return this.getCopy(this.routesToShow);
  }
  getCopy(routes: Routes) {
    let newRoutes: Routes = [];
    routes.forEach(value => {
      newRoutes.push({ ...value });
    });
    return newRoutes;
  }
  addNewRoute(pathName: string) {
    this.routesToShow.push({ path: pathName, component: MainSectionComponent });
    this.routesUpdated.next(true);
  }
}
