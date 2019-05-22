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

	confirmForm :FormGroup;

	constructor(
		private dialogRef: MatDialogRef<ConfirmComponent>,
		private flash: FlashMessagesService,
		private fb: FormBuilder,
		@Inject(MAT_DIALOG_DATA) public data: any
	) { }

	ngOnInit() {
		this.confirmForm = this.fb.group({
			time: '',
			type: ''
		});
	}

	yes() {
		this.dialogRef.close(this.confirmForm.value);
	}

}
