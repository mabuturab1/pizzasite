import { Router } from "@angular/router";
import {
  pizzaSize,
  CartItemsService
} from "./../../shared/services/cartItems.service";
import { singleItem } from "./../../shared/interface";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-order-item",
  templateUrl: "./order-item.component.html",
  styleUrls: ["./order-item.component.css"]
})
export class OrderItemComponent implements OnInit {
  singleItem: singleItem;
  pizzaSizeItems = ["Small", "Medium", "Large"];
  selectedPizzaSize: any = "Small";
  constructor(
    private cartItemService: CartItemsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.singleItem = this.cartItemService.getCurrentlySelectedItem();
    if (!this.singleItem) this.router.navigate(["/home"]);
  }
  orderBtnClicked() {
    this.cartItemService.addCartItem(
      {
        ...this.singleItem,
        btnText:
          this.singleItem.btnText *
          this.getMultiplyingFactor(this.getPizzaVal(this.selectedPizzaSize))
      },
      this.getPizzaVal(this.selectedPizzaSize)
    );
  }
  getMultiplyingFactor(pizza: pizzaSize) {
    switch (pizza) {
      case pizzaSize.small:
        return 1.0;
      case pizzaSize.medium:
        return 1.5;
      case pizzaSize.large:
        return 2.0;
    }
  }
  getPizzaVal(reqSize: String) {
    switch (reqSize) {
      case "Small":
        return pizzaSize.small;
      case "Medium":
        return pizzaSize.medium;
      case "Large":
        return pizzaSize.large;
      default:
        return pizzaSize.small;
    }
  }
}
