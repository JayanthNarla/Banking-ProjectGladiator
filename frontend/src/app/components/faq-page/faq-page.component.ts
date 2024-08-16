import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.css'],
})
export class FaqPageComponent implements OnInit {
  main = 'Home';
  opt1 = 'FAQs';
  opt2 = 'Services';
  opt3 = 'ContactUs';
  isLogin = true;
  mainLink = '/';
  link1 = '/faq';
  link2 = '/services';
  link3 = '/contactUs';
  constructor() {}

  ngOnInit(): void {}
}
