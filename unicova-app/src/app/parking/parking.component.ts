import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ParkingsService } from '../parkings.service'
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css']
})
export class ParkingComponent implements OnInit {

	parkingForm: FormGroup;

	constructor(
		private dialogRef: MatDialogRef<ParkingComponent>,
		private flash: FlashMessagesService,
		private parkings: ParkingsService,
		private fb: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	ngOnInit() {
		console.log(this.data);
		if (!this.data) {
			this.parkingForm = this.fb.group({
				address: '',
				spots: '',
				long: '',
				lat: ''
			});
		} else {
			this.parkingForm = this.fb.group({
				address: this.data.address,
				spots: this.data.spots.total,
				long: this.data.location.x,
				lat: this.data.location.y
			});
		}
	}

	addParking() {
		console.log(this.data);
		if(this.data == null){
		this.parkings.addParking(this.parkingForm.value).subscribe(ret => {
			if (ret._id != undefined) {
					this.flash.show('Add succesful', {cssClass: 'flash-succes'});
					this.dialogRef.close(true);
			} else {
					this.flash.show(ret, {cssClass: 'flash-error'});
			}
		});
		} else {
			this.dialogRef.close(this.parkingForm.value);
		}
	}
}
