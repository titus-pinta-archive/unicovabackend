import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
	parkings: any;

	readonly ROOT_URL = '';
	readonly LOGIN_URL = 'localhost:8080/login';


	constructor(private http: HttpClient) {
	}

	addUser() {
	
	}

	deleteUser() {
	
	}

	updateUser() {
	
	}

	login(value: any): any {
		console.log(value.email);
		return this.http.get(this.LOGIN_URL, {params: {
			email: value.email, 
			password: value.password
		}});
	}
	loginadmin(value: any): any {
		console.log(value.email);
		return this.http.get(this.LOGIN_URL, {params: {
			email: value.email, 
			password: value.password
		}});
	}
}
