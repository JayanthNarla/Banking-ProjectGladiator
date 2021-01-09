import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  main = 'Home';
  opt1 = 'FAQs';
  opt2 = 'Services';
  opt3 = 'ContactUs';
  isLogin = true;
  mainLink = '/';
  link1 = 'faq';
  link2 = 'services';
  link3 = 'contactUs';
  constructor() {}

  ngOnInit(): void {}
}
