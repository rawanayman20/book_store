import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
 standalone:false

})
export class LoginComponent implements OnInit{
  hidePassword = true;

  loginForm= new FormGroup({
  email:new FormControl(null,[Validators.required,Validators.email,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]),
password:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.maxLength(16),Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
])


})
  constructor(private _customerService:CustomerService,private router:Router,private toaster:ToastrService){}
  ngOnInit(): void {
   
  }
  onLogin (data:FormGroup){
  this._customerService.onLogin(data.value).subscribe({
    next:(res)=>{
      console.log(res)
      localStorage.setItem('accessToken',res.data.accessToken)
      
      this.toaster.success(res.message, 'Success!');
this.router.navigate(['/book']); // Navigate to /cart page
    },
    
    error:(err)=>{
      this.toaster.error(err.error.message, 'Sorry!');

      console.log(err)

    },
    
    complete:()=>{
console.log("Done")
    }
  })
}
}
