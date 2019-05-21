import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

	constructor(
		private dialogRef: MatDialogRef<ReservationsComponent>,
	
	) { }

  ngOnInit() {
  }

}
