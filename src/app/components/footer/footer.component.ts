import { Subscription } from "rxjs";
import { ContentProvider } from "./../shared/services/content-provider";
import { SocialMedia } from "./../shared/interface";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit, OnDestroy {
  footerItems: Map<number, string[]> = new Map();
  socialMedia: SocialMedia;
  subscription: Subscription;
  constructor(private contentProvider: ContentProvider) {}

  ngOnInit() {
    this.subscription = this.contentProvider.itemsShow.subscribe(res => {
      this.socialMedia = this.contentProvider.getSocialMedia();
    });
    this.socialMedia = this.contentProvider.getSocialMedia();
    this.footerItems.set(0, ["About Us", "Our Story", "Recruitment"]);
    this.footerItems.set(1, [
      "Help & Services",
      "Contact Us",
      "Locate Us",
      "FAQS & Help"
    ]);
    this.footerItems.set(2, [
      "Our Policies",
      "Privacy",
      "Terms and Conditions"
    ]);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
