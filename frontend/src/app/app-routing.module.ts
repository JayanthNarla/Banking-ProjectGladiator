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

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: AdminLoginComponent },
  { path: 'admindash', component: AdminDashboardComponent },
  { path: 'userdash', component: UserDashboardComponent },
  { path: 'neft', component: NeftComponent },
  { path: 'imps', component: ImpsComponent },
  { path: 'rtgs', component: RtgsComponent },
  { path: 'statement', component: AccountStatementComponent,},
  { path: 'details', component: AccountDetailsComponent },
  { path: 'summary', component: AccountSummaryComponent },
  { path: 'change', component: ChangeIdPasswordComponent },
  { path: 'fund', component:FundTransferComponent  },
  { path: 'addben', component:AddBeneficiaryComponent  },
  { path: 'transpass', component:TransactionPasswordComponent  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
