import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../customer.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-catgories',
  imports: [CommonModule, MatIconModule],
  templateUrl: './catgories.component.html',
  styleUrl: './catgories.component.scss'
})
export class CatgoriesComponent implements OnInit {
  allCategories: any[] = [];
  displayedCategories: any[] = [];
  batchSize = 3;

  constructor(private service: CustomerService) {}

  ngOnInit(): void {
    this.service.getCategories().subscribe({
      next: (res) => {
        this.allCategories = res;
        this.displayedCategories = this.allCategories.slice(0, this.batchSize);
      },
      error: (err) => console.error('Category fetch error:', err)
    });
  }

  showMore(): void {
    const next = this.displayedCategories.length + this.batchSize;
    this.displayedCategories = this.allCategories.slice(0, next);
  }

  showLess(): void {
    this.displayedCategories = this.allCategories.slice(0, this.batchSize);
  }

  get canShowMore(): boolean {
    return this.displayedCategories.length < this.allCategories.length;
  }

  get canShowLess(): boolean {
    return this.displayedCategories.length > this.batchSize;
  }
}
