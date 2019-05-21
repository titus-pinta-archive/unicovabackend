import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
	parkings: any;

	readonly ROOT_URL = '';
	readonly LOGIN_URL = '/login';
	readonly ADMIN_LOGIN_URL = '/adminlogin';
	readonly REGISTER_URL = '/api/users';



	constructor(private http: HttpClient) {
	}

	addUser(value: any) {
		return this.http.post(this.REGISTER_URL, {params: value});
	}

	deleteUser() {
	
	}

	updateUser() {
	
	}

	login(value: any): any {
		return this.http.get(this.LOGIN_URL, {params: value});
	}
	loginadmin(value: any): any {
		return this.http.get(this.ADMIN_LOGIN_URL, {params: value});
	}
}
