import { AuthProcessService } from "ngx-auth-firebaseui";
import { headerLinks } from "./../shared/interface";
import { ContentProvider } from "./../shared/services/content-provider";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  headerData: headerLinks[] = [];
  isAuthenticated = false;
  currentUser: any;
  itemSubscription: Subscription;
  subscription: Subscription;
  logOut: headerLinks = {
    urlLabel: "LOGOUT",
    urlName: "logout"
  };
  logIn: headerLinks = {
    urlLabel: "LOGIN",
    urlName: "login"
  };
  edit: headerLinks = {
    urlLabel: "EDIT SHOP",
    urlName: "",
    urlPopUp: [
      { urlLabel: "Edit Shop Data", urlName: "editShop" },
      { urlLabel: "Edit Pages", urlName: "editPage" }
    ]
  };
  constructor(
    private contentProvider: ContentProvider,
    private router: Router,
    private authProcessService: AuthProcessService
  ) {}
  ngOnInit() {
    this.headerData = this.contentProvider.getHeaderData();
    
    if (this.authProcessService.user != null) {
      this.isAuthenticated = true;
      this.currentUser = this.authProcessService.user;
    }
    this.subscription = this.authProcessService.user$.subscribe(user => {
      if (user != null) {
        this.isAuthenticated = true;
        this.currentUser = this.authProcessService.user;
      } else {
        this.isAuthenticated = false;
        this.currentUser = null;
      }
    });
    this.itemSubscription = this.contentProvider.itemsShow.subscribe(show => {
      if (show) this.headerData = this.contentProvider.getHeaderData();
     
    });
  }
  async headerClicked(event: headerLinks) {
    if (event.urlName === "logout") {
      await this.authProcessService.signOut();
      this.router.navigate(["/"]);
      return;
    }
    if (event.urlName === "login") {
      this.router.navigate(["/auth"]);
      return;
    }
    this.contentProvider.processClickedItem(event.urlLabel);
    if (event.urlName != "") this.router.navigate(["/" + event.urlName]);
  }
  ngOnDestroy() {
    this.itemSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }
}
