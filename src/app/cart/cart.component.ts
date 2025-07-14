import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { loadStripe } from '@stripe/stripe-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule, NavbarComponent, FooterComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: any[] = [];
  taxRate = 0.045;
basketId:any
  shippingForm!: FormGroup;

  constructor(private cartService: CustomerService, private router: Router,
    private fb: FormBuilder) {}

  ngOnInit() {
    this.loadCart();
    this.shippingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,15}$')]],
    });
  }


async loadCart(): Promise<void> {
  try {
    const res: any = await this.cartService.getCart().toPromise();
    const basket = res?.data || res;

    if (basket && Array.isArray(basket.items)) {
      this.basketId = basket._id;

      const enrichedItems = [];

      for (const item of basket.items) {
        if (item.quantity > 0) {
          const bookId = item.book;
          const bookRes = await this.cartService.getBookById(bookId).toPromise();
          enrichedItems.push({
            ...item,
            book: bookRes?.data || bookRes 
          });
        }
      }

      this.cartItems = enrichedItems;
      console.log("Cart loaded:", this.cartItems);
    } else {
      this.cartItems = [];
      this.basketId = null;
    }
  } catch (err) {
    console.error("Failed to load cart:", err);
    this.cartItems = [];
    this.basketId = null;
  }
}



updateQuantity(item: any, delta: number) {
  const newQty = item.quantity + delta;
  if (newQty < 1) return;

  // Build new items list with updated quantity
  const updatedItems = this.cartItems.map(cartItem => {
    return {
      book: typeof cartItem.book === 'object' ? cartItem.book._id : cartItem.book,
      quantity: cartItem.book === item.book ? newQty : cartItem.quantity
    };
  });

  const updatePayload = { items: updatedItems };

  this.cartService.updateCartItem(this.basketId, updatePayload).subscribe(
    (response) => {
      console.log(' Cart updated:', response);
      item.quantity = newQty;
    },
    (error) => {
      console.error('Update error:', error);
    }
  );
}



deleteItem(item: any): void {
  const bookId = typeof item.book === 'object' ? item.book._id : item.book;

  if (!bookId) {
    console.error('Invalid book ID:', item);
    return;
  }

  const payload = { book: bookId };

  this.cartService.removeCartItem(payload).subscribe({
    next: (res: any) => {
      console.log('Delete successful:', res);
      this.loadCart();
    },
    error: (error) => {
      console.error(' Delete error:', error);
    }
  });
}



get total() {
  return (this.cartItems ?? []).reduce((sum, item) => {
    const price = item?.book?.price ?? 0;
    return sum + item.quantity * price;
  }, 0);
}

get tax() {
  return +(this.total * this.taxRate).toFixed(2);
}

get totalCost() {
  return +(this.total + this.tax).toFixed(2);
}
async proceedToCheckout() {
   if (!this.cartService.isLoggedIn()) {
  localStorage.setItem('returnUrl', this.router.url); // ✅ save the current route
  alert('Please login to proceed to checkout.');
  this.router.navigate(['/auth/login']);
  return;
}


    if (this.shippingForm.invalid) {
      this.shippingForm.markAllAsTouched();
      alert('Please complete the shipping form before checkout.');
      return;
    }

    const orderId = this.basketId;

    try {
      const res: any = await this.cartService.getStripeSessionByOrderId(orderId).toPromise();
      const sessionId = res?.sessionId || res?.id;

      if (!sessionId) {
        alert('No Stripe session ID found.');
        return;
      }

      const stripe = await loadStripe('pk_test_YOUR_PUBLIC_KEY'); // 🔁 Replace with your actual key
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Stripe redirect error:', error);
    }
  }

}


