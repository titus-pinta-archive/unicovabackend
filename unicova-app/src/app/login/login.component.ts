import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FormGroup, FormBuilder } from '@angular/forms';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;

	constructor(
		private dialogRef: MatDialogRef<LoginComponent>,
		private flash: FlashMessagesService,
		private router: Router,
		private user: UsersService,
		private fb: FormBuilder,
		@Inject(LOCAL_STORAGE) private storage: WebStorageService
	) { }

  ngOnInit() {
		this.loginForm = this.fb.group({
			email: '',
			password: ''
		});
	}

	logIn() {
		if (this.router.url === '/admin') {
			this.user.loginadmin(this.loginForm.value);
		} else {
			this.user.login(this.loginForm.value);
		}
		this.storage.set('jwt', 'merge');
		this.flash.show('Log in succesful', {cssClass: 'flash-succes'});
	}

}
