import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule, 
	 MatButtonModule,
	 MatDialogModule,
	MatListModule,
	MatInputModule
	} from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';

import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ParkingsComponent } from './parkings/parkings.component';

import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';

import { StorageServiceModule } from 'angular-webstorage-service';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { ReservationspageComponent } from './reservationspage/reservationspage.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ParkingComponent } from './parking/parking.component';
import { ProfitspageComponent } from './profitspage/profitspage.component';

import { ChartsModule } from 'ng2-charts'
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ParkingsComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    ReservationspageComponent,
    ReservationsComponent,
    ConfirmComponent,
    ParkingComponent,
    ProfitspageComponent,
	],
	entryComponents: [
		LoginComponent,
		RegisterComponent,
		ConfirmComponent,
		ParkingComponent,
		ReservationsComponent
	],
  imports: [
		ChartsModule,
	  BrowserModule,
	  AppRoutingModule,
	  BrowserAnimationsModule,
	  MatToolbarModule,
	  MatExpansionModule,
	  MatButtonModule,
		MatDialogModule,
		MatListModule,
		MatInputModule,
		FormsModule,
		ReactiveFormsModule,

		HttpClientModule,

		StorageServiceModule,

		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyC5-OHS0HJt_UBd7pWJJrEBqeMOTWirhvk' 
		}),
		FlashMessagesModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
