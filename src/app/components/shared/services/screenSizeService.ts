import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
@Injectable({ providedIn: "root" })
export class ScreenSizeService {
  isMobileNotifier = new BehaviorSubject(false);
  setIsMobile(isMobile: boolean) {
    this.isMobileNotifier.next(isMobile);
  }
}
