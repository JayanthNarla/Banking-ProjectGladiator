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

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: AdminLoginComponent },
  {
    path: 'admindash',
    component: AdminDashboardComponent,
    children: [
      { path: '', component: AllApprovalsListComponent },
      { path: 'pending', component: AllPendingListComponent },
      { path: 'approved', component: AllApprovedListComponent },
      { path: 'denied', component: AllDeniedListComponent },
    ],
  },
  { path: 'userdash', component: UserDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
