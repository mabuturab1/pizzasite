import { AuthInterceptorsService } from "./components/auth/AuthInterceptorService";
import { CarouselComponent } from "./components/main-page/carousel/carousel.component";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LogoComponent } from "./components/logo/logo.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDividerModule } from "@angular/material/divider";
import { HeaderBlockComponent } from "./components/header/header-block/header-block.component";
import { HeaderComponent } from "./components/header/header.component";
import { MainSectionComponent } from "./components/main-section/main-section.component";
import { SinglePizzaComponent } from "./components/main-section/single-pizza/single-pizza.component";
import { CartComponent } from "./components/cart/cart.component";
import { MatCardModule } from "@angular/material/card";
import { EditComponent } from "./components/edit/edit.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

import {
  FormsModule,
  ReactiveFormsModule,
  NG_VALIDATORS
} from "@angular/forms";
import { SingleEditComponent } from "./components/edit/single-edit/single-edit.component";
import { MatButtonModule } from "@angular/material/button";
import { MyDialogComponent } from "./components/my-dialog/my-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { NewPageDialogComponent } from "./components/new-page-dialog/new-page-dialog.component";
import { EditPageComponent } from "./components/edit-page/edit-page.component";
import { EditSinglePageComponent } from "./components/edit-page/edit-single-page/edit-single-page.component";
import {
  NgxAuthFirebaseUIModule,
  AuthProcessService
} from "ngx-auth-firebaseui";
import { AuthComponent } from "./components/auth/auth.component";
import { DeleteDialogComponent } from "./components/delete-dialog/delete-dialog.component";
import { ForbiddenValuesDirective } from "./components/shared/forbidden-values.directive";
import { MainPageComponent } from "./components/main-page/main-page.component";

import { FooterComponent } from "./components/footer/footer.component";
import { OrderItemComponent } from "./components/main-section/order-item/order-item.component";
import { OrderDetailsComponent } from "./components/cart/order-details/order-details.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { NguCarouselModule } from "@ngu/carousel";
import { ScrollPanelModule } from "primeng/scrollpanel";

import { SingleCartComponent } from "./components/cart/single-cart/single-cart.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  MatRadioModule,
  MAT_RADIO_DEFAULT_OPTIONS
} from "@angular/material/radio";
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { ErrorDialogComponent } from "./components/error-dialog/error-dialog.component";
import { MatIconModule } from "@angular/material";
@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    HeaderBlockComponent,
    HeaderComponent,
    MainSectionComponent,
    SinglePizzaComponent,
    CartComponent,
    EditComponent,
    SingleEditComponent,
    MyDialogComponent,
    NewPageDialogComponent,
    EditPageComponent,
    EditSinglePageComponent,
    AuthComponent,
    DeleteDialogComponent,
    ForbiddenValuesDirective,
    MainPageComponent,
    CarouselComponent,
    FooterComponent,
    OrderItemComponent,
    OrderDetailsComponent,
    SingleCartComponent,
    SpinnerComponent,
    ErrorDialogComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDividerModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,

    MatDialogModule,
    MatSelectModule,

    MatSidenavModule,
    NguCarouselModule,
    ScrollPanelModule,
    MatRadioModule,
    MatIconModule,
    NgxAuthFirebaseUIModule.forRoot(
      {
        apiKey: "",

        projectId: "",
        authDomain: "",
        databaseURL: "",
        storageBucket: "",
        messagingSenderId: ""
      },
      // () => "",
      null,
      {
        enableFirestoreSync: true, // enable/disable autosync users with firestore
        toastMessageOnAuthSuccess: true, // whether to open/show a snackbar message on auth success - default : true
        toastMessageOnAuthError: true, // whether to open/show a snackbar message on auth error - default : true
        authGuardFallbackURL: "/", // url for unauthenticated users - to use in combination with canActivate feature on a route
        authGuardLoggedInURL: "/home", // url for authenticated users - to use in combination with canActivate feature on a route
        passwordMaxLength: 60, // `min/max` input parameters in components should be within this range.
        passwordMinLength: 8, // Password length min/max in forms independently of each componenet min/max.
        // Same as password but for the name
        nameMaxLength: 50,
        nameMinLength: 2,
        // If set, sign-in/up form is not available until email has been verified.
        // Plus protected routes are still protected even though user is connected.
        guardProtectedRoutesUntilEmailIsVerified: true,
        enableEmailVerification: true // default: true
      }
    )
  ],
  entryComponents: [
    MyDialogComponent,
    NewPageDialogComponent,
    DeleteDialogComponent,
    ErrorDialogComponent
  ],
  providers: [
    AuthProcessService,
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenValuesDirective,
      multi: true
    },
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: "accent" }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
