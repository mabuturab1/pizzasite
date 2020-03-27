import {
  cartItem,
  pizzaSize,
  CartItemsService
} from "./../../shared/services/cartItems.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-single-cart",
  templateUrl: "./single-cart.component.html",
  styleUrls: ["./single-cart.component.css"]
})
export class SingleCartComponent implements OnInit {
  @Input() cartItem: cartItem;
  constructor(private cartItemService: CartItemsService) {}
  incQuantity(cartItem: cartItem) {
    this.cartItemService.incQuant(cartItem.id, cartItem.size);
  }
  decQuantity(cartItem: cartItem) {
    this.cartItemService.decQuant(cartItem.id, cartItem.size);
  }
  delItem(cartItem: cartItem) {
    this.cartItemService.removeCartItem(cartItem.id, cartItem.size);
  }

  ngOnInit() {}
  getPizzaSize() {
    switch (this.cartItem.size) {
      case pizzaSize.small:
        return "Small";
      case pizzaSize.medium:
        return "Medium";
      case pizzaSize.large:
        return "Large";
    }
  }
}
