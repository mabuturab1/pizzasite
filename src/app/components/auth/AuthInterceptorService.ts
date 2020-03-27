import { AuthProcessService } from "ngx-auth-firebaseui";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams
} from "@angular/common/http";
import { from } from "rxjs";
import { switchMap } from "rxjs/operators";
export class AuthInterceptorsService implements HttpInterceptor {
  constructor(private authProcessService: AuthProcessService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return from(this.authProcessService.user.getIdToken()).pipe(
      switchMap(res => {
        let searchParams = new HttpParams();
        searchParams.append("auth", JSON.parse(res));
        const modiefiedRequest = req.clone({
          params: searchParams
        });

        return next.handle(modiefiedRequest);
      })
    );
  }
}
