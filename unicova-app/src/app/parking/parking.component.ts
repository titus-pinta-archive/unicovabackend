import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormBuilder } from '@angular/forms';

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
		private fb: FormBuilder
	) { }

  ngOnInit() {
		this.parkingForm = this.fb.group({
			address: '',
			spots: '',
			long: '',
			lat: ''
		});
  }

}
