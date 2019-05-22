import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

	constructor(
		private login: MatDialog,
		@Inject(LOCAL_STORAGE) private storage: WebStorageService,
		private token: TokenService,
		private router: Router
	) { }

	ngOnInit() {
		if (this.router.url === '/admin') {
			if(!(this.token.user()) || !(this.token.user().admin)) {
				this.openLogin();
			}
		}
	}

	openLogin() {
			let dialogRef = this.login.open(LoginComponent);
			dialogRef.afterClosed().subscribe(res => {
				if (!res) {
					this.openLogin()
				}
			});
	}

}
