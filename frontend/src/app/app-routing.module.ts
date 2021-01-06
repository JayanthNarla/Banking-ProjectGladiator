import { RegisterOptsComponent } from './components/register-opts/register-opts.component';
import { TrackApplicationComponent } from './components/track-application/track-application.component';
import { RegisterDashboardComponent } from './components/register-dashboard/register-dashboard.component';
import { AllDeniedListComponent } from './components/all-denied-list/all-denied-list.component';
import { AllApprovedListComponent } from './components/all-approved-list/all-approved-list.component';
import { AllPendingListComponent } from './components/all-pending-list/all-pending-list.component';
import { AllApprovalsListComponent } from './components/all-approvals-list/all-approvals-list.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: AdminLoginComponent },
  {
    path: 'admindash',
    component: AdminDashboardComponent,
    children: [
      { path: '', component: AllPendingListComponent },
      { path: 'allApplications', component: AllApprovalsListComponent },
      { path: 'approved', component: AllApprovedListComponent },
      { path: 'denied', component: AllDeniedListComponent },
    ],
  },
  { path: 'userdash', component: UserDashboardComponent },
  {
    path: 'register',
    component: RegisterDashboardComponent,
    children: [
      {
        path: '',
        component: RegisterOptsComponent,
      },
      { path: 'RgstrNetbanking', component: RegisterPageComponent },
      {
        path: 'trackApplication',
        component: TrackApplicationComponent,
      },
      {
        path: 'newaccount',
        component: PersonalDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
