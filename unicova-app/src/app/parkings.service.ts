import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Parking } from './parking.model';

import { Observable, of, BehaviorSubject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ParkingsService {
	parkings: any;

	readonly ROOT_URL = '/parkings';
	readonly API_ROOT_URL = '/api/parkings';


	constructor(private http: HttpClient) {
		this.updateParkings();
		this.subscribe();
		this.parkings = new BehaviorSubject(null);
	}

	updateParkings() {
		this.http.get(this.ROOT_URL)
			.subscribe(x => this.parkings.next(x));
	}

	addParking(value :any) :any {
		let val = {
			address: value.address,
			location: {
				x: value.lat,
				y: value.long
			},
			spots: value.spots
		};
		return this.http.post(this.API_ROOT_URL, val);
	
	}

	deleteParking(parking_id) {
		return this.http.delete(`${this.API_ROOT_URL}/${parking_id}`);
	}

	updateParking(value:any) :any {
		let val = {
			_id: value._id,
			address: value.address,
			location: {
				x: value.lat,
				y: value.long
			},
			spots: value.spots
		};
		return this.http.put(`${this.API_ROOT_URL}/${value._id}`, val);
	
	}

	getParkings(): any {
		return this.parkings;
	}

	blockParking(parking_id) {
		return this.http.post(`/api/block/${parking_id}`, {});
	}
	
	unblockParking(parking_id) {
		return this.http.post(`/api/unblock/${parking_id}`, {});
	}

	subscribe() {
		var source = new EventSource('/subscribe');
		source.addEventListener('message', e => this.updateParkings());
	}

	reserveParking(parking_id, user_id, vals) {
		console.log(vals);
		return this.http.post(`/api/reserve/${parking_id}/${user_id}`, vals);
	}

	scheduleParking (parking_id, user_id, vals) {
		console.log(vals);
		return this.http.post(`/api/schedule/${parking_id}/${user_id}`, vals);
	}
}
