import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CustomerService } from '../customer.service';
import { CommonModule } from '@angular/common';
import { CatgoriesComponent } from "./catgories/catgories.component";
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-variation',
  imports: [MatIconModule, MatButtonModule, CommonModule, CatgoriesComponent, MatCardModule, RouterModule, FormsModule, FooterComponent, NavbarComponent],
  templateUrl: './variation.component.html',
  styleUrl: './variation.component.scss', standalone: true
})
export class VariationComponent  implements OnInit{
days = 768;
  hours = 1;
  minutes = 27;
  seconds = 55;
email=''
  books: any[] = [];
  currentIndex = 0;
constructor(private bookService: CustomerService ,private router:Router) {}



  ngOnInit(): void {
    this.bookService.getbooks().subscribe({
      next: (res) => {
        this.books = res.data.slice(0, 5); // First 5 books
      },
      error: (err) => {
        console.error('Error fetching books:', err);
      }
    });
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.books.length;
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.books.length) % this.books.length;
  }
  goTo(index: number): void {
  this.currentIndex = index;
}

viewAllProducts() {
  this.router.navigate(['all-products']);
}
}
