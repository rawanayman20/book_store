import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from '../../customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  standalone:false
})
export class ChangePasswordComponent implements OnInit {
  hideOld = true;
hideNew = true;
  changePasswordForm = new FormGroup({
  password: new FormControl(null, [
    Validators.required,
  ]),
 password_new: new FormControl(null, [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/)
    // Min 6 chars, at least 1 uppercase, 1 lowercase, 1 number
  ]), 
});
  constructor(private _customerService:CustomerService, private toastr:ToastrService){}
  ngOnInit(): void {
  }

  onSave(data:FormGroup) {
    if (this.changePasswordForm.invalid) {
      return;
    }

     this._customerService.changePassword(data.value).subscribe({
      
      next: (res) => {
         this.toastr.success(res.message, 'Success!');
        console.log('Record Updated:', res);

      },
      error: (err) => {
              this.toastr.error(err.error.message, 'Sorry!');
        console.error('Record failed:', err);
      },
      complete:()=>
      {
        console.log("Done")
      }
    });
     
  }

}
