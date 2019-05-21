import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

	constructor(
		private login: MatDialog,
		private router: Router
	) { }

	ngOnInit() {
		console.log(this.router.url);
		if (this.router.url === '/admin') {
			this.openLogin();
		}
	}

	openLogin() {
			let dialogRef = this.login.open(LoginComponent);
			dialogRef.afterClosed().subscribe(res => {
				if (!res) {
					this.openLogin();
				}
			});
	}

}
