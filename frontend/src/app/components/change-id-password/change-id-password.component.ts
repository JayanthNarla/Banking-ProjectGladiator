import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-change-id-password',
  templateUrl: './change-id-password.component.html',
  styleUrls: ['./change-id-password.component.css'],
})
export class ChangeIdPasswordComponent implements OnInit {
  chngUid: FormGroup;
  new_userid: string;
  con_new_userid: string;
  error_messages = {
    uid: [{ type: 'required', message: 'User ID is required' }],
    cuid: [{ type: 'required', message: 'User ID is required' }],
  };
  toast: any;
  constructor(private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.toast = 'toast';
    this.chngUid = this.formBuilder.group({
      uid: new FormControl('', Validators.compose([Validators.required])),
      cuid: new FormControl('', Validators.compose([Validators.required])),
    });
  }
  updateUserID = () => {};

  checkBothNewUid = () => {
    // console.log(this.chngUid.get('uid').value);
    // console.log(this.chngUid.get('cuid').value);
    if (this.chngUid.get('uid').value != this.chngUid.get('cuid').value) {
      this.toastr.error('Both user ID should be the same');
      this.chngUid.get('uid').setValue('');
      this.chngUid.get('cuid').setValue('');
    }
  };
  ngOnInit(): void {}
}
