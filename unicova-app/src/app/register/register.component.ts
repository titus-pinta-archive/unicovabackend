import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormBuilder } from '@angular/forms';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	registerForm: FormGroup;

	constructor(
		private dialogRef: MatDialogRef<RegisterComponent>,
		private flash: FlashMessagesService,
		private user: UsersService,
		private fb: FormBuilder,
		@Inject(LOCAL_STORAGE) private storage: WebStorageService
	) { }

  ngOnInit() {
		this.registerForm = this.fb.group({
			email: '',
			password: '',
			firstName: '',
			lastName: '',
			licencePlate: ''
		});
	}

	register() {
			this.user.addUser(this.registerForm.value).subscribe(ret => {
				if (ret._id != undefined) {
					this.flash.show('Register in succesful', {cssClass: 'flash-succes'});
					this.dialogRef.close(true);
				
				} else {
					this.flash.show(JSON.parse(ret), {cssClass: 'flash-error'});
				}
			});
	}

}
