import { Component, OnInit, Inject } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ReservationsComponent } from '../reservations/reservations.component';
import { ParkingComponent } from '../parking/parking.component';
import { MatDialog, MatDialogRef} from '@angular/material';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	constructor(
		private login: MatDialog,
		private register: MatDialog,
		private reservations: MatDialog,
		private parking: MatDialog,
		private router: Router,
		private flash: FlashMessagesService,
		@Inject(LOCAL_STORAGE) private storage: WebStorageService
	) { }

  ngOnInit() {
	}

	openLogin() {
		let dialogRef = this.login.open(LoginComponent);
	}

	openRegister() {
		let dialogRef = this.register.open(RegisterComponent);
	}

	openReservations() {
		let dialogRef = this.reservations.open(ReservationsComponent);
	}

	openParking() {
		let dialogRef = this.parking.open(ParkingComponent);
	}

	logOut() {
		this.storage.remove('jwt');
		this.flash.show('Log out succes', {cssClass: 'flash-succes'});
	}
}
