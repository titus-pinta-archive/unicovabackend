import { Component, OnInit, Inject } from '@angular/core';
import { ParkingsService } from '../parkings.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MatDialog, MatDialogRef} from '@angular/material';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ParkingComponent } from '../parking/parking.component';

@Component({
  selector: 'app-parkings',
  templateUrl: './parkings.component.html',
  styleUrls: ['./parkings.component.css']
})
export class ParkingsComponent {

	private parkingList: any;

	constructor(
		private confirm: MatDialog,
		private parkings: ParkingsService,
		private router: Router,
		private parking: MatDialog,
		private flash: FlashMessagesService,
		@Inject(LOCAL_STORAGE) private storage: WebStorageService
	) { }

	ngOnInit() {
		this.parkingList = this.parkings.getParkings();
	}

	reserveNow() {
		let dialogRef = this.confirm.open(ConfirmComponent, {data: {}});
	}

	reserve() {
		let dialogRef = this.confirm.open(ConfirmComponent, {
			data: {input: 'time'}
		});
	}

	schedule() {
		let dialogRef = this.confirm.open(ConfirmComponent, {
			data: {input: 'time'}
		});
	}

	block() {
		let dialogRef = this.confirm.open(ConfirmComponent, {data: {}});
	}

	unblock() {
		let dialogRef = this.confirm.open(ConfirmComponent, {data: {}});
	}

	update() {
		let dialogRef = this.parking.open(ParkingComponent);
	}

	delete() {
		let dialogRef = this.confirm.open(ConfirmComponent, {data: {}});
	}

}
