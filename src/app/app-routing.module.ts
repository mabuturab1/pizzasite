import { OrderItemComponent } from "./components/main-section/order-item/order-item.component";

import { MainPageComponent } from "./components/main-page/main-page.component";

import { AuthComponent } from "./components/auth/auth.component";
import { EditPageComponent } from "./components/edit-page/edit-page.component";
import { EditComponent } from "./components/edit/edit.component";
import { MainSectionComponent } from "./components/main-section/main-section.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoggedInGuard } from "ngx-auth-firebaseui";

const routes: Routes = [
  { path: "", redirectTo: "/auth", pathMatch: "full" },
  { path: "auth", component: AuthComponent },
  { path: "editShop", component: EditComponent, canActivate: [LoggedInGuard] },
  {
    path: "editPage",
    component: EditPageComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: "home",
    component: MainPageComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: "order",
    component: OrderItemComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: ":urlName",
    component: MainSectionComponent,
    canActivate: [LoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
