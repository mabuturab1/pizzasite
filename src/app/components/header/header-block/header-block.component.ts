import { headerLinks } from "../../shared/interface";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-header-block",
  templateUrl: "./header-block.component.html",
  styleUrls: ["./header-block.component.css"]
})
export class HeaderBlockComponent implements OnInit {
  @Input() itemName: headerLinks;
  @Input() itemPopupList: headerLinks[];
  @Input() id: string;
  @Output() clickListen = new EventEmitter<headerLinks>();
  items: string[] = [
    "The first choice!",
    "And another choice for you.",
    "but wait! A third!"
  ];
  constructor() {}

  ngOnInit() {}
  onHidden(): void {
 
  }
  onShown(): void {
  
  }
  isOpenChange(): void {
   
  }
  itemClicked(event: headerLinks) {
    this.clickListen.emit(event);
  }
}
