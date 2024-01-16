import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private pendingHTTPRequests$ = new Subject<void>();

  constructor() { }

  public cancelPendingRequests() {
      this.pendingHTTPRequests$.next();
  }

  public onCancelPendingRequests() {
      return this.pendingHTTPRequests$.asObservable();
  }
}
