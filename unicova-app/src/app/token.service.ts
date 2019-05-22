import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

	constructor(
		@Inject(LOCAL_STORAGE) private storage: WebStorageService
	) { }
	decode (token) :any {
		    let base64Url = token.split('.')[1];
		    let base64 = decodeURIComponent(atob(base64Url).split('').map(function(c) {
					        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
					    }).join(''));

		    return JSON.parse(base64);
	}

	user() :any {
		if (this.storage.get('jwt')) {
			let t = this.decode(this.storage.get('jwt'));
				if (t.exp >= Date.now() / 1000 ) {
					return this.decode(this.storage.get('jwt')).data;
				} else {
					this.storage.remove('jwt');
				}
		}
	}
}
