import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout-component',
  templateUrl: './logout-component.component.html',
  styleUrls: ['./logout-component.component.css'],
})
export class LogoutComponentComponent implements OnInit {
  main = 'Home';
  opt1 = 'FAQs';
  opt2 = 'Services';
  opt3 = 'ContactUs';
  isLogin = true;
  mainLink = '/';
  link1 = 'faq';
  link2 = 'services';
  link3 = 'contactUs';
  lastLoggedTime: string;
  constructor() {
    this.lastLoggedTime = localStorage.getItem('loggedTime');
  }

  ngOnInit(): void {}
}
