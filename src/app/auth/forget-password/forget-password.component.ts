import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../../customer.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
  standalone:false

})
export class ForgetPasswordComponent implements OnInit{
forgotForm =new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)])
})


  constructor(private toastr:ToastrService,private _customerService:CustomerService){

  }
  ngOnInit(): void {
   
  }
 onSubmit(data:FormGroup) {
    if (this.forgotForm.valid) {
      this._customerService.forgerPassword(data.value).subscribe({
        next: (res) => {
          console.log(res)
                this.toastr.success(res.message, 'Success!');

        }
        ,
        error: (err) => 
        {
          this.toastr.error(err.error.message, 'Sorry!');
        },
        complete:()=>{
          console.log("done")
        }
      });
    }
  }

}
