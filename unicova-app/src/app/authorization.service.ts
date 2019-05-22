import { Injectable, Inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService implements HttpInterceptor {

	constructor(
		@Inject(LOCAL_STORAGE) private storage: WebStorageService
	) { }
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		console.log(this.storage.get('jwt'));
		req = req.clone({
			setHeaders: {
				'Authorization': `Bearer ${ this.storage.get('jwt') }`,
			},
		});
		return next.handle(req);
	}
}
