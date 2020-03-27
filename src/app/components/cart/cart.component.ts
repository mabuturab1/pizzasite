import { Subscription } from "rxjs";
import {
  cartItem,
  pizzaSize,
  CartItemsService
} from "./../shared/services/cartItems.service";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  cartItems: cartItem[] = [];
  totalPrice: number = 0;
  orderSuccess = false;
  constructor(private cartItemService: CartItemsService) {}

  ngOnInit() {
    this.subscription = this.cartItemService.cartItemsUpdated.subscribe(res => {
      this.cartItems = res;
      this.totalPrice = 0;
      if (this.cartItems.length >= 1) {
        this.orderSuccess = false;
      }
      this.cartItems.forEach(val => {
        this.totalPrice += val.price * val.quantity;
      });
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  orderBtnClicked() {
    this.orderSuccess = true;
    this.cartItemService.clearCartItems();
  }
}
