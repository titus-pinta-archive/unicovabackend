import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

	reservations: any;

	readonly ROOT_URL = '/api/reservations';


	constructor(private http: HttpClient) {
		this.updateReservations();
	}

	getMyReservations(user_id) {
		return this.http.get(`${this.ROOT_URL}/${user_id}`);
	}

	updateReservations() {
		this.reservations = this.http.get(this.ROOT_URL);
	}

	getReservations(): any {
		return this.reservations;
	}

	Unsubscribe(user_id, reservation_id) :any {
		return this.http.post(`/api/unschedule/${user_id}/${reservation_id}`, {});
	}
}
