import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { takeUntil } from 'rxjs';

@Injectable()
export class requestInterceptor implements HttpInterceptor {
  constructor(
    router: Router,
    private httpService: HttpService,
  ) {
    
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
          this.httpService.cancelPendingRequests();
      }
  });

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(takeUntil(this.httpService.onCancelPendingRequests()));
  }
}