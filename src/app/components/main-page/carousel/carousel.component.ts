import { carouselModel } from "./../../shared/services/cartItems.service";
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  ViewChild
} from "@angular/core";
import { CartItemsService } from "../../shared/services/cartItems.service";
import {
  NguCarouselConfig,
  NguCarousel,
  NguCarouselStore
} from "@ngu/carousel";
@Component({
  selector: "app-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.css"]
})
export class CarouselComponent implements OnInit, AfterViewInit {
  items: carouselModel[];
  name = "Angular";
  slideNo = 0;
  withAnim = true;
  resetAnim = true;

  @ViewChild("myCarousel", { static: false }) myCarousel: NguCarousel<
    carouselModel
  >;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 3,
    interval: { timing: 4000, initialDelay: 1000 },
    loop: true,
    touch: true,
    velocity: 0.2
  };
  carouselItems: carouselModel[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private cartItemsService: CartItemsService
  ) {}
  ngOnInit() {
    this.carouselItems = this.cartItemsService.getCarouselItems();
  }
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  reset() {
    this.myCarousel.reset(!this.resetAnim);
  }

  moveTo(slide) {
    this.myCarousel.moveTo(slide, !this.withAnim);
  }
}
