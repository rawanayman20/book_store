import { Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

export const routes: Routes = [{ path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {path:"**",component:PagenotfoundComponent}

];
