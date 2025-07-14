import { Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { VariationComponent } from './variation/variation.component';
import { ListingComponent } from './listing/listing.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [{ path: '', redirectTo: 'book', pathMatch: 'full' },  // or 'home'
  { path: 'book', component: VariationComponent }, 
    { path: 'all-products', component: ListingComponent },    
     { path: 'cart', component: CartComponent }, 

    { path: 'book/:id', component: BookDetailsComponent }
,
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {path:"**",component:PagenotfoundComponent}

];
