import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from '../../customer.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resgister',
  templateUrl: './resgister.component.html',
  styleUrl: './resgister.component.scss',
    standalone:false

})
export class ResgisterComponent implements OnInit {
  hidePassword = true;

registerForm = new FormGroup({
  first_name: new FormControl(null, [
    Validators.required,
    Validators.pattern(/^[A-Za-z]+$/), // only letters
  ]),
  last_name: new FormControl(null, [
    Validators.required,
    Validators.pattern(/^[A-Za-z]+$/),
  ]),
  email: new FormControl(null, [
    Validators.required,
    Validators.email,
  ]),
  password: new FormControl(null, [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/)
    // Min 6 chars, at least 1 uppercase, 1 lowercase, 1 number
  ]),
  role: new FormControl(null, [Validators.required]),
});

    roles: string[] = ['Admin', 'Customer'];

   constructor(private _cutomerService:CustomerService, private router:Router,private toaster:ToastrService){}
  ngOnInit(): void {
    
  }
onSubmitUser(data: FormGroup) {

    // ADD MODE
    this._cutomerService.resgisterCustomer(data.value).subscribe({
      next: (res) => {
         this.toaster.success(res.message, 'Success!');
        console.log('User added:', res);

      },
      error: (err) => {
              this.toaster.error(err.error.message, 'Sorry!');
        console.error('Add failed:', err);
      },
      complete:()=>{
        console.log("Done")
      }
    });
  }
navigateToLogin() {
  this.router.navigate(['/auth/login']);
}
}
