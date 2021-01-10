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
import { NeftComponent } from './components/neft/neft.component';
import { ImpsComponent } from './components/imps/imps.component';
import { RtgsComponent } from './components/rtgs/rtgs.component';
import { AccountStatementComponent } from './components/account-statement/account-statement.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { AccountSummaryComponent } from './components/account-summary/account-summary.component';
import { ChangeIdPasswordComponent } from './components/change-id-password/change-id-password.component';
import { FundTransferComponent } from './components/fund-transfer/fund-transfer.component';
import { AddBeneficiaryComponent } from './components/add-beneficiary/add-beneficiary.component';
import { TransactionPasswordComponent } from './components/transaction-password/transaction-password.component';
import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { TransactionSuccessComponent } from './components/transaction-success/transaction-success.component';
import { TransactionFailedComponent } from './components/transaction-failed/transaction-failed.component';
import { PayeeComponent } from './components/payee/payee.component';
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

  { path: 'userdash', component: UserDashboardComponent,children:
        [
          { path: 'statement',component: AccountStatementComponent},
          { path: 'fund', component:FundTransferComponent},
          { path: 'neft', component: NeftComponent },
          { path: 'imps',component: ImpsComponent },
          { path: 'rtgs', component: RtgsComponent },
          { path: 'details', component: AccountDetailsComponent },
          { path: 'summary', component: AccountSummaryComponent },
          { path: 'change', component: ChangeIdPasswordComponent },
          { path: 'addben', component:AddBeneficiaryComponent  },
          { path: 'transpass', component:TransactionPasswordComponent },
          { path: 'success', component:TransactionSuccessComponent },
          { path: 'cancel', component:TransactionFailedComponent },
          { path: 'payee', component:PayeeComponent },
        ]},  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}

//const routes: Routes = [
  //     { path: '', component: HomePageComponent },
  //     { path: 'login', component: AdminLoginComponent },
  //     { path: 'admindash', component: AdminDashboardComponent },
  //     { path: 'userdash', component: UserDashboardComponent,children:
  //       [{ path: 'statement',component: AccountStatementComponent},
  //       { path: 'fund', component:FundTransferComponent},
  //       { path: 'neft', component: NeftComponent },
  //       { path: 'imps',component: ImpsComponent },
  //       { path: 'rtgs', component: RtgsComponent },
  //       { path: 'details', component: AccountDetailsComponent },
  //       { path: 'summary', component: AccountSummaryComponent },
  //       { path: 'change', component: ChangeIdPasswordComponent },
  //       { path: 'addben', component:AddBeneficiaryComponent  },
  //       { path: 'transpass', component:TransactionPasswordComponent  }]},
  //   ];