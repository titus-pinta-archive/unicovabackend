import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfitspageComponent } from './profitspage/profitspage.component';
import { ReservationspageComponent } from './reservationspage/reservationspage.component';

const routes: Routes = [
	{path: '', component: HomepageComponent},
	{path: 'admin', component: HomepageComponent},
	{path: 'profits', component: ProfitspageComponent},
	{path: 'reservations', component: ReservationspageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
