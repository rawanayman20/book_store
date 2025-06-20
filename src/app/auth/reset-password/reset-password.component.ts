import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../customer.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
    standalone:false

})
export class ResetPasswordComponent implements OnInit {
    hide = true;

  resetForm = new FormGroup({
  email: new FormControl(null, [
    Validators.required,
    Validators.email,
  ]),
  
  password: new FormControl(null, [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/)
  ]),
      otp: new FormControl(null,Validators.required),
      // rememberMe: new FormControl(false),


});
  constructor(private _customerService:CustomerService, private toastr:ToastrService){}
  ngOnInit(): void {
    
  }
onSubmit(data: FormGroup) {

    // ADD MODE
    this._customerService.reset_password(data.value).subscribe({
      next: (res) => {
         this.toastr.success(res.message, 'Success!');
        console.log('password reset:', res);

      },
      error: (err) => {
              this.toastr.error(err.error.message, 'Sorry!');
        console.error('Add failed:', err);
      }, 
      complete:()=>{
        console.log("Done")
      }
    });
  }
}
