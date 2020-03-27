import { ScreenSizeService } from "./../shared/services/screenSizeService";
import { CartItemsService } from "./../shared/services/cartItems.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthProcessService } from "ngx-auth-firebaseui";
import { DomSanitizer } from "@angular/platform-browser";
import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from "@angular/core";
import { MatIconRegistry } from "@angular/material";

@Component({
  selector: "app-logo",
  templateUrl: "./logo.component.html",
  styleUrls: ["./logo.component.css"]
})
export class LogoComponent implements OnInit, OnDestroy {
  @Output() toggleBtnClick = new EventEmitter<boolean>();
  @Output() cartBtnClick = new EventEmitter<boolean>();
  isAuthenticated = false;
  currentUser: any;
  subscription: Subscription[] = [];

  isMobile = false;
  constructor(
    private authProcessService: AuthProcessService,
    private router: Router,
    private screenSizeService: ScreenSizeService
  ) {}
  ngOnInit() {
    if (this.authProcessService.user != null) {
      this.isAuthenticated = true;
      this.currentUser = this.authProcessService.user;
    }
    this.subscription.push(
      this.screenSizeService.isMobileNotifier.subscribe(res => {
        this.isMobile = res;
      })
    );
    this.subscription.push(
      this.authProcessService.user$.subscribe(user => {
        if (user != null) {
          this.isAuthenticated = true;
          this.currentUser = this.authProcessService.user;
        } else {
          this.isAuthenticated = false;
          this.currentUser = null;
        }
      })
    );
  }
  logoClicked() {
    this.router.navigate(["/home"]);
  }
  toggleClicked() {
    this.toggleBtnClick.emit(true);
  }
  cartClicked() {
    this.cartBtnClick.emit(true);
  }
  ngOnDestroy() {
    this.subscription.forEach(val => val.unsubscribe());
  }
}
