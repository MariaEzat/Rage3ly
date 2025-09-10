import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();

    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: { Authorization: token }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const publicPaths = ['/home', '/privacy', '/comingSoon'];
          const currentUrl = this.router.url;

          // لو مش واقف على صفحة عامة → روح للـ login
          if (!publicPaths.includes(currentUrl)) {
            this.tokenService.clearUserData();
            this.router.navigate(['/auth/login']).then(() => {
              window.location.reload();
            });
          }
        }
        return throwError(() => error);
      }),
      tap(event => {
        if (event instanceof HttpResponse) {
          if (event.body && event.body.errorCode === 7) {
            const publicPaths = ['/home', '/privacy', '/comingSoon'];
            const currentUrl = this.router.url;

            if (!publicPaths.includes(currentUrl)) {
              this.tokenService.clearUserData();
              this.router.navigate(['/auth/login']).then(() => {
                window.location.reload();
              });
            }
          }
        }
      })
    );
  }
}
