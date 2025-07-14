// global.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

const baseURL: string = `https://upskilling-egypt.com:3007/api`;

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const apiReq = req.clone({
    url: baseURL + req.url,
    setHeaders: token ? { Authorization: `Bearer ${token}` } : {},
  });

  return next(apiReq);
};
