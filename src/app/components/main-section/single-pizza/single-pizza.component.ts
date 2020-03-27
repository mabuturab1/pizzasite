import { Router } from "@angular/router";
import { singleItem } from "./../../shared/interface";
import { CartItemsService } from "./../../shared/services/cartItems.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-single-pizza",
  templateUrl: "./single-pizza.component.html",
  styleUrls: ["./single-pizza.component.css"]
})
export class SinglePizzaComponent implements OnInit {
  @Input() item: singleItem;
  constructor(
    private cartItemService: CartItemsService,
    private router: Router
  ) {}

  ngOnInit() {}
  orderBtnClicked() {
    this.cartItemService.currentSelectedItem(this.item);
    this.router.navigate(["/order"]);
  }
}
