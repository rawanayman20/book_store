import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-book-details',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent implements OnInit{
ngOnInit(): void {
   this.carId=this._ActivedRoute.snapshot.params['id']
   if(this.carId){
this.getCarById(this.carId)
   }
  }
bookDetails: any = null;
  carId:number=0
constructor(private _customerService:CustomerService,private _ActivedRoute:ActivatedRoute){

}
getCarById(id:number){
   this._customerService.getBokkById(id).subscribe({next:(res:any)=>{
     this.bookDetails=res
     console.log("hi",this.bookDetails)
      
    }, error:(err)=>{
      console.log(err)
    }, complete:()=>{
      console.log("Done")
    }})
   
  }
 
  

}

