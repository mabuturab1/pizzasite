import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ErrorDialogComponent } from "./components/error-dialog/error-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { SaveDataOnlineService } from "./components/shared/services/saveData";
import { ScreenSizeService } from "./components/shared/services/screenSizeService";
import { CartItemsService } from "./components/shared/services/cartItems.service";
import { Subscription } from "rxjs";
import { AuthProcessService } from "ngx-auth-firebaseui";
import { ContentProvider } from "./components/shared/services/content-provider";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Observer, fromEvent, merge } from "rxjs";
import { map } from "rxjs/operators";
import { MatIconRegistry } from "@angular/material";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "pizza";
  isAuthenticated = false;
  isMobile = false;
  isLoading = false;
  isOnline = false;
  allDataAvailable = false;
  needsRelaoading = false;
  private subscription: Subscription[] = [];

  constructor(
    private contentProvider: ContentProvider,
    private authProcessService: AuthProcessService,
    private screenSizeService: ScreenSizeService,
    private saveDataService: SaveDataOnlineService,
    public dialog: MatDialog,
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "pizza",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../../assets/icon/pizza.svg"
      )
    );
  }
  ngOnInit() {
    this.isLoading = true;
    if (window.innerWidth <= 580) {
      this.isMobile = true;
      this.screenSizeService.setIsMobile(true);
    } else {
      this.isMobile = false;
      this.screenSizeService.setIsMobile(false);
    }
    if (this.authProcessService.user == null) {
      this.isLoading = false;
      this.isAuthenticated = false;
    }
    if (this.authProcessService.user != null) {
      this.isLoading = true;
      this.isAuthenticated = true;
      if (this.isOnline)
        this.processAuthenticated(this.authProcessService.user);
    }
    this.subscription.push(
      this.authProcessService.user$.subscribe(user => {
        if (user != null) {
          this.isLoading = true;

          this.isAuthenticated = true;
          if (this.isOnline) this.processAuthenticated(user);
        }
      })
    );
    this.subscription.push(
      this.contentProvider.errorNotifier.subscribe(res => {
        this.isLoading = false;
        this.showDialog(res);
      })
    );
    this.subscription.push(
      this.contentProvider.allDataReceived.subscribe(res => {
        this.isLoading = false;
        this.allDataAvailable = true;
        // this.contentProvider.initItems();
      })
    );
    this.subscription.push(
      this.createOnline$().subscribe(isOnline => {
        this.contentProvider.setIsOnline(isOnline);
        // if (isOnline && !this.isLoading) this.isLoading = true;
        this.isOnline = isOnline;
        if (!isOnline) {
          if (this.isLoading) {
            this.isLoading = false;
          }
          this.needsRelaoading = true;
          this.showDialog(
            "An error occurred while connecting to internet.Please check your internet connection"
          );
        }
        if (isOnline && !this.needsRelaoading) {
          if (this.isAuthenticated)
            this.processAuthenticated(this.authProcessService.user);
        }
        if (isOnline && this.needsRelaoading) {
          {
            window.location.reload();
          }
        }
      })
    );
  }
  processAuthenticated(user) {
    if (user != null) {
      this.isAuthenticated = true;
      if (user.email != null && user.uid != null) {
        this.saveDataService.setUid(user.uid);
        this.contentProvider.fetchAllData();
      } else {
        this.saveDataService.setGeneral();
        this.contentProvider.fetchAllData();
      }
    } else {
      this.isAuthenticated = false;
      this.saveDataService.setGeneral();
      this.contentProvider.fetchAllData();
    }
  }
  showDialog(res: string) {
    let dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: {
        description: res
      },
      maxHeight: "800px",
      width: "700px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
  createOnline$() {
    return merge<boolean>(
      fromEvent(window, "offline").pipe(map(() => false)),
      fromEvent(window, "online").pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
  }
  toggleClicked() {}
  onResize(event: any) {
    if ((event.target as Window).innerWidth <= 580) {
      this.isMobile = true;
      this.screenSizeService.setIsMobile(true);
    } else {
      this.isMobile = false;
      this.screenSizeService.setIsMobile(false);
    }
  }
  ngOnDestroy() {
    this.subscription.forEach(val => val.unsubscribe());
  }
}
