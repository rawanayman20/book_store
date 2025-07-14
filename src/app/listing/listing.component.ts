import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CustomerService } from '../customer.service';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listing',
  imports: [CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,FormsModule ,MatInputModule , 
    MatPaginatorModule, NavbarComponent, FooterComponent],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.scss'
})
export class ListingComponent implements OnInit{
 books: any[] = [];
  pagedBooks: any[] = [];
showQuantityInput: { [key: string]: boolean } = {};

  quantities: { [bookId: string]: number } = {};
  sortOption = 'az';
  pageIndex = 0;
  pageSize = 12;
  isGridView = true;

  constructor(private bookService: CustomerService,private toaster:ToastrService) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.bookService.getbooks().subscribe({
      next: (res) => {
        this.books = res.data;
        this.sortBooks();
        this.updatePagedBooks();
      },
      error: (err) => console.error('Error fetching books:', err)
    });
  }

  sortBooks(): void {
    if (this.sortOption === 'az') {
      this.books.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.sortOption === 'za') {
      this.books.sort((a, b) => b.name.localeCompare(a.name));
    }
    this.updatePagedBooks();
  }

  updatePagedBooks(): void {
    const start = this.pageIndex * this.pageSize;
    this.pagedBooks = this.books.slice(start, start + this.pageSize);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedBooks();
  }

  onPageChangeSize(): void {
    this.pageIndex = 0;
    this.updatePagedBooks();
  }

  toggleView(view: 'grid' | 'list'): void {
    this.isGridView = view === 'grid';
  }

showInput(bookId: string) {
  this.showQuantityInput[bookId] = true;
  if (!this.quantities[bookId]) {
    this.quantities[bookId] = 1;
  }
}




confirmAddToCart(book: { _id: string }): void {
  const bookId = book._id;
  const quantity = this.quantities?.[bookId] || 1;

  this.bookService.getCart().subscribe({
    next: (cartRes: any) => {
      // Handle both response structures: cartRes.data.items and cartRes.items
      const items = (cartRes?.data?.items || cartRes?.items || [])
        .filter((item: any) => item?.book); // Filter out items with null/undefined books

      // Check if book exists in cart
      const alreadyInCart = items.some((item: any) => {
        const id = typeof item.book === 'object' ? item.book._id : item.book;
        return id === bookId && item.quantity > 0;
      });

      if (alreadyInCart) {
        alert('This book is already in your cart');
        this.showQuantityInput[bookId] = false;
        return;
      }

      // Add to cart if not already present
      this.bookService.addToCart({ book: bookId, quantity }).subscribe({
        next: (res: any) => {
          this.toaster.success(res.message || 'Added to cart', 'Success!');
          this.showQuantityInput[bookId] = false;
        },
        error: (err: any) => {
          alert('Failed to add to cart');
          console.error(err);
        }
      });
    },
    error: (err: any) => {
      console.error('Failed to check cart:', err);
      // Optional: proceed with adding to cart even if cart check fails
      // this.addToCartWhenCheckFails(bookId, quantity);
    }
  });
}
}
