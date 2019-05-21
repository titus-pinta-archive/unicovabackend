import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Parking } from './parking.model';

import { Observable, of } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ParkingsService {
	parkings: any;

	readonly ROOT_URL = '/parkings';


	constructor(private http: HttpClient) {
		this.updateParkings();
	}

	updateParkings() {
		this.parkings = this.http.get(this.ROOT_URL);
	}

	addParking() {
	
	}

	deleteParking() {
	
	}

	updateParking() {
	
	}

	getParkings(): any {
		return this.parkings;
	}
}
