import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
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

  contact = () => {
    // console.log('Contacted');
  };

  ngOnInit(): void {}
}
