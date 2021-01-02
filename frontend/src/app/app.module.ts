import { CustomerService } from './services/customer.service';
import { LoginService } from './services/login.service';
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
import { ApprovalItemComponent } from './components/approval-item/approval-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AllApprovalsListComponent } from './components/all-approvals-list/all-approvals-list.component';
import { AllPendingListComponent } from './components/all-pending-list/all-pending-list.component';
import { AllDeniedListComponent } from './components/all-denied-list/all-denied-list.component';
import { AllApprovedListComponent } from './components/all-approved-list/all-approved-list.component';

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
    ApprovalItemComponent,
    AllApprovalsListComponent,
    AllPendingListComponent,
    AllDeniedListComponent,
    AllApprovedListComponent,
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
  providers: [LoginService, CustomerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
