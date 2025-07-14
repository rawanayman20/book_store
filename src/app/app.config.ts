import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { globalInterceptor } from './global.interceptor';
import { SharedModule } from './shared/shared.module';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(withEventReplay()),importProvidersFrom(AuthModule,SharedModule), importProvidersFrom(
      AuthModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot()
    ),provideHttpClient(withInterceptors([globalInterceptor]))]
};
