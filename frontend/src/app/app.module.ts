import { PersonalDetailsComponent } from './components/personal-details/personal-details.component';
import { CustomerService } from './services/customer.service';
import { LoginService } from './services/login.service';
import { TransactionService } from './services/transaction.service';
import { AccountStatementService } from './services/accountstatement.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './components/home-page/home-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { NeftComponent } from './components/neft/neft.component';
import { ImpsComponent } from './components/imps/imps.component';
import { RtgsComponent } from './components/rtgs/rtgs.component';
import { AccountSummaryComponent } from './components/account-summary/account-summary.component';
import { AccountStatementComponent } from './components/account-statement/account-statement.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';

import { ChangeIdPasswordComponent } from './components/change-id-password/change-id-password.component';
import { FundTransferComponent } from './components/fund-transfer/fund-transfer.component';
import { AddBeneficiaryComponent } from './components/add-beneficiary/add-beneficiary.component';
import { TransactionPasswordComponent } from './components/transaction-password/transaction-password.component';
import { NavbarLogoutComponent } from './components/navbar-logout/navbar-logout.component';
import { TransactionSuccessComponent } from './components/transaction-success/transaction-success.component';

import { ApprovalItemComponent } from './components/approval-item/approval-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AllApprovalsListComponent } from './components/all-approvals-list/all-approvals-list.component';
import { AllPendingListComponent } from './components/all-pending-list/all-pending-list.component';
import { AllDeniedListComponent } from './components/all-denied-list/all-denied-list.component';
import { AllApprovedListComponent } from './components/all-approved-list/all-approved-list.component';
import { RegisterDashboardComponent } from './components/register-dashboard/register-dashboard.component';
import { TrackApplicationComponent } from './components/track-application/track-application.component';
import { RegisterOptsComponent } from './components/register-opts/register-opts.component';
import { TransactionFailedComponent } from './components/transaction-failed/transaction-failed.component';
import { PayeeComponent } from './components/payee/payee.component';
import { BeneficiaryService } from './services/beneficiary.service';
import { ViewBeneficiariesComponent } from './components/view-beneficiaries/view-beneficiaries.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    FooterComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    NeftComponent,
    ImpsComponent,
    RtgsComponent,
    AccountSummaryComponent,
    AccountStatementComponent,
    AccountDetailsComponent,
    ChangeIdPasswordComponent,
    FundTransferComponent,
    AddBeneficiaryComponent,
    TransactionPasswordComponent,
    NavbarLogoutComponent,
    TransactionSuccessComponent,
    ApprovalItemComponent,
    AllApprovalsListComponent,
    AllPendingListComponent,
    AllDeniedListComponent,
    AllApprovedListComponent,
    PersonalDetailsComponent,
    RegisterPageComponent,
    RegisterDashboardComponent,
    TrackApplicationComponent,
    RegisterOptsComponent,
    TransactionFailedComponent,
    PayeeComponent,
    ViewBeneficiariesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
    }),

  ],
  providers: [LoginService, CustomerService,TransactionService,AccountStatementService,BeneficiaryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
