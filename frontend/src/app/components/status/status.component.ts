import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonalDetailsService } from 'src/app/services/personal-details.service';
import { Status } from '../../Models/status';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent implements OnInit {
  cid: any;
  status: any;
  constructor(
    private service: PersonalDetailsService,
    private route: ActivatedRoute
  ) {
    this.status = new Status();
    this.cid = this.route.snapshot.params['id'];
    // console.log(this.cid);
    this.service.getDetails(this.cid).subscribe((data) => {
      this.status = data;
      // console.log(data);
      // console.log(this.status);
    });
  }

  ngOnInit(): void {}
}
