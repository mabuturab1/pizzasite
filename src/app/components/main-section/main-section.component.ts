import { ContentProvider } from "./../shared/services/content-provider";
import { singleItem, headerLinks } from "./../shared/interface";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-main-section",
  templateUrl: "./main-section.component.html",
  styleUrls: ["./main-section.component.css"]
})
export class MainSectionComponent implements OnInit, OnDestroy {
  items: singleItem[];
  itemSubscription: Subscription[] = [];
  urlPath: string;
  isLoading = false;
  constructor(
    private contentProvider: ContentProvider,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // this.isLoading = true;
    this.contentProvider.fetchAllData();
    this.items = this.contentProvider.getItems();
    this.itemSubscription.push(
      this.contentProvider.itemsShow.subscribe(show => {
        if (show) {
          // this.isLoading = false;
          this.items = this.contentProvider.getItems();
        
        }
      })
    );
    this.itemSubscription.push(
      this.contentProvider.navigateToRoute.subscribe(route => {
        this.router.navigate(["/" + route]);
      })
    );
    this.urlPath = this.route.snapshot.params["urlName"];
    if (this.urlPath) this.contentProvider.setItemByUrl(this.urlPath);
    
    this.route.params.subscribe((params: Params) => {
      this.urlPath = params["urlName"];
    
      if (this.urlPath) this.contentProvider.setItemByUrl(this.urlPath);
      // this.contentProvider.processUrlPath()
    });
  }
  ngOnDestroy() {
    this.itemSubscription.forEach(val => {
      val.unsubscribe();
    });
  }
}
