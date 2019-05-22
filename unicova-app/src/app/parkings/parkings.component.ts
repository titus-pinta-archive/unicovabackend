import { Component, OnInit, Inject } from '@angular/core';
import { ParkingsService } from '../parkings.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { MatDialog, MatDialogRef} from '@angular/material';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ParkingComponent } from '../parking/parking.component';
import { TokenService } from '../token.service';

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
		private token: TokenService,
		private flash: FlashMessagesService,
		@Inject(LOCAL_STORAGE) private storage: WebStorageService
	) { }

	ngOnInit() {
		this.parkingList = this.parkings.getParkings();
	}

	reserveNow(parking_id) {
		let dialogRef = this.confirm.open(ConfirmComponent,
			{data: {type: true}});
		dialogRef.afterClosed().subscribe(ret => {
			if (ret) {
				let user_id = this.token.user()._id;
				this.parkings.reserveParking(parking_id, user_id,
					ret).subscribe(r => {
					this.flash.show('Reservation succesful', {cssClass: 'flash-succes'});
				});
			}
		});
	}

	reserve(parking_id) {
		let dialogRef = this.confirm.open(ConfirmComponent,
			{data: {type: true, input: 'time'}});
		dialogRef.afterClosed().subscribe(ret => {
			if (ret) {
				let user_id = this.token.user()._id;
				this.parkings.reserveParking(parking_id, user_id,
					ret).subscribe(r => {
					this.flash.show('Reservation succesful', {cssClass: 'flash-succes'});
				});
			}
		});
	}

	schedule(parking_id) {
		let dialogRef = this.confirm.open(ConfirmComponent,
			{data: {type: true, input: 'time'}});
		dialogRef.afterClosed().subscribe(ret => {
			if (ret) {
				let user_id = this.token.user()._id;
				this.parkings.reserveParking(parking_id, user_id,
					ret).subscribe(r => {
					this.flash.show('Reservation succesful', {cssClass: 'flash-succes'});
				});
			}
		});
	}

	block(parking_id) {
		let dialogRef = this.confirm.open(ConfirmComponent, {data: {}});
		dialogRef.afterClosed().subscribe(ret => {
			if (ret) {
				this.parkings.blockParking(parking_id).subscribe(r => {
					this.flash.show('Block succesful', {cssClass: 'flash-succes'});
				});
			}
		});
	}

	unblock(parking_id) {
		let dialogRef = this.confirm.open(ConfirmComponent, {data: {}});
		dialogRef.afterClosed().subscribe(ret => {
			if (ret) {
				this.parkings.unblockParking(parking_id).subscribe(r => {
					this.flash.show('Unlock succesful', {cssClass: 'flash-succes'});
				});
			}
		});
	}

	update(parking) {
		let dialogRef = this.parking.open(ParkingComponent);
	}

	delete(parking_id) {
		let dialogRef = this.confirm.open(ConfirmComponent, {data: {}});
		dialogRef.afterClosed().subscribe(ret => {
			if (ret) {
				this.parkings.deleteParking(parking_id).subscribe(r => {
					this.flash.show('Delete succesful', {cssClass: 'flash-succes'});
				});
			}
		});
	}

}
