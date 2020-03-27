import { ContentProvider } from "./../shared/services/content-provider";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthProvider } from "ngx-auth-firebaseui";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.css"]
})
export class AuthComponent implements OnInit {
  providers = AuthProvider;
  constructor(
    private router: Router,
    private contentProvider: ContentProvider
  ) {}

  ngOnInit() {}
  printUser(event) {
    this.router.navigate(["/home"]);
  }
  printError() {
    this.contentProvider.hasError(
      "An Error occurred while processing request."
    );
  }
}
