import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-reservationspage',
  templateUrl: './reservationspage.component.html',
  styleUrls: ['./reservationspage.component.css']
})
export class ReservationspageComponent implements OnInit {

	private reservationsList: any;

	constructor(
		private reservations: ReservationsService,
	) { }

  ngOnInit() {
		this.reservationsList = this.reservations.getReservations();
	}

}
