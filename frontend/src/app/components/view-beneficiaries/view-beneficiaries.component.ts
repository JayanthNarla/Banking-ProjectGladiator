import { SplitInterpolation } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Add_beneficiary } from 'src/app/models/add_ben.model';
import { BeneficiaryService } from 'src/app/services/beneficiary.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-beneficiaries',
  templateUrl: './view-beneficiaries.component.html',
  styleUrls: ['./view-beneficiaries.component.css'],
})
export class ViewBeneficiariesComponent implements OnInit {
  all: any;
  list: any = [];
  show = true;
  empty = false;
  constructor(private toastr: ToastrService, private ser: BeneficiaryService) {
    this.ser.getBenefiaries().subscribe(
      (d) => {
        // console.log((this.all = d));
        this.Split();
      },
      (err) => {
        this.empty = true;
        this.show = false;
      }
    );
  }

  ngOnInit(): void {}

  Split() {
    for (let x of this.all) {
      if (x.cust_id == JSON.parse(localStorage.getItem('cust_id'))['value']) {
        this.list.push(x);
      }
    }
    if (this.list.length == 0) {
      this.show = false;
      this.empty = true;
    }
  }
}
