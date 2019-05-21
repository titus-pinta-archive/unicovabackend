import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

	reservations: any;

	readonly ROOT_URL = 'https://jsonplaceholder.typicode.com/users';
	//readonly ROOT_URL = 'localhost:8080/parkings';


	constructor(private http: HttpClient) {
		this.updateReservations();
	}

	updateReservations() {
		this.reservations = this.http.get(this.ROOT_URL);
	}

	getReservations(): any {
		return this.reservations;
	}
}
