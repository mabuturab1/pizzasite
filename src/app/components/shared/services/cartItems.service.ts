import { BehaviorSubject } from "rxjs";
import { singleItem } from "./../interface";
import { ScreenSizeService } from "./screenSizeService";
import { Injectable } from "@angular/core";
export interface carouselModel {
  src: string;
}
export enum pizzaSize {
  small,
  medium,
  large
}
export interface cartItem {
  id: string;

  name: string;
  price: number;
  quantity: number;
  size: pizzaSize;
}
@Injectable({
  providedIn: "root"
})
export class CartItemsService {
  private isMobile = false;
  private allCartItems: cartItem[] = [];
  private currentCartItem: singleItem;
  cartItemsUpdated = new BehaviorSubject<cartItem[]>([]);
  constructor(private screenSizeService: ScreenSizeService) {}
  private carouselItems: carouselModel[] = [
    {
      src:
        "https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_960_720.jpg"
    },
    {
      src:
        "https://cdn.pixabay.com/photo/2017/01/03/11/33/pizza-1949183_960_720.jpg"
    },
    {
      src:
        "https://cdn.pixabay.com/photo/2017/08/12/18/59/snack-2635035_960_720.jpg"
    }
  ];
  private carouselItemsVertical: carouselModel[] = [
    {
      src:
        "https://cdn.pixabay.com/photo/2017/08/06/06/43/pizza-2589577_960_720.jpg"
    },
    {
      src:
        "https://cdn.pixabay.com/photo/2017/08/06/06/43/pizza-2589575_960_720.jpg"
    },
    {
      src:
        "https://cdn.pixabay.com/photo/2017/08/06/06/42/pizza-2589569_960_720.jpg"
    }
  ];
  getCarouselItems() {
    return this.getCarouselCopy();
  }
  currentSelectedItem(item: singleItem) {
    this.currentCartItem = item;
  }
  getCurrentlySelectedItem() {
    return this.currentCartItem;
  }
  addCartItem(singleItem: singleItem, size: pizzaSize) {
    let item: cartItem = {
      name: singleItem.titleText,
      price: singleItem.btnText,
      quantity: 1,
      size: size,
      id: singleItem.id
    };
    var index = this.allCartItems.findIndex(
      val => val.id == singleItem.id && val.size == size
    );
    if (index == -1) this.allCartItems.push(item);
    else {
      let item = { ...this.allCartItems[index] };
      item.quantity += 1;
      this.allCartItems[index] = item;
    }
    this.cartItemsUpdated.next(this.allCartItems);
  }
  incQuant(id: string, size: pizzaSize) {
    var index = this.allCartItems.findIndex(
      val => val.id == id && val.size == size
    );
    if (index != -1) {
      let item = { ...this.allCartItems[index] };
      item.quantity += 1;
      this.allCartItems[index] = item;
    }
    this.cartItemsUpdated.next(this.allCartItems);
  }
  decQuant(id: string, size: pizzaSize) {
    var index = this.allCartItems.findIndex(
      val => val.id == id && val.size == size
    );
    if (index != -1) {
      let item = { ...this.allCartItems[index] };
      item.quantity -= 1;
      this.allCartItems[index] = item;
    }
    this.cartItemsUpdated.next(this.allCartItems);
  }
  removeCartItem(id: string, size: pizzaSize) {
    var index = this.allCartItems.findIndex(
      val => val.id == id && val.size == size
    );
    this.allCartItems.splice(index, 1);
    this.cartItemsUpdated.next(this.allCartItems);
  }
  clearCartItems() {
    this.allCartItems = [];
    this.cartItemsUpdated.next(this.allCartItems);
  }
  private getCarouselCopy() {
    this.screenSizeService.isMobileNotifier
      .subscribe(result => (this.isMobile = result))
      .unsubscribe();
    let carouselNew: carouselModel[] = [];

    if (!this.isMobile)
      this.carouselItems.forEach(val => {
        carouselNew.push({ ...val });
      });
    else
      this.carouselItemsVertical.forEach(val => {
        carouselNew.push({ ...val });
      });
    return carouselNew;
  }
}
