import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

	constructor(
		private dialogRef: MatDialogRef<ConfirmComponent>,
		private flash: FlashMessagesService,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	ngOnInit() {
		console.log(this.data);
  }

}
