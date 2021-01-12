import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() main: string;
  @Input() opt1: string;
  @Input() opt2: string;
  @Input() opt3: string;
  @Input() mainLink: string;
  @Input() link1: string;
  @Input() link2: string;
  @Input() link3: string;

  @Input() isLogin: boolean;
  constructor(private authService: AuthService, private router: Router) {}

  // logout = () => {
  //   this.router.navigateByUrl('logout');
  // };

  ngOnInit(): void {}
}
