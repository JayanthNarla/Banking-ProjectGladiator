import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
