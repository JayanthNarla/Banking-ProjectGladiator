import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-dashboard',
  templateUrl: './register-dashboard.component.html',
  styleUrls: ['./register-dashboard.component.css'],
})
export class RegisterDashboardComponent implements OnInit {
  main = 'Home';
  opt1 = 'Open New Account';
  opt2 = 'Net Banking Registeration';
  opt3 = 'Track Application';
  isLogin = false;
  mainLink = '../';
  link1 = 'newaccount';
  link2 = 'RgstrNetbanking';
  link3 = 'trackApplication';
  constructor() {}

  ngOnInit(): void {}
}
