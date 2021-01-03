import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NeftComponent } from './components/neft/neft.component';
import { ImpsComponent } from './components/imps/imps.component';
import { RtgsComponent } from './components/rtgs/rtgs.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: AdminLoginComponent },
  { path: 'admindash', component: AdminDashboardComponent },
  { path: 'userdash', component: UserDashboardComponent },
  { path: 'neft', component: NeftComponent },
  { path: 'imps', component: ImpsComponent },
  { path: 'rtgs', component: RtgsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
