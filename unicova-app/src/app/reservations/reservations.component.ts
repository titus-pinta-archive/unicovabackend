import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ReservationsService } from '../reservations.service';
import { TokenService } from '../token.service';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
	private reservationsList :any;

	constructor(
		private dialogRef: MatDialogRef<ReservationsComponent>,
		private token :TokenService,
		private reservations: ReservationsService
	
	) { 
		this.reservations.getMyReservations(this.token.user()._id);
	}

  ngOnInit() {
  }

}
