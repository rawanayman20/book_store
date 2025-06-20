import { HttpInterceptorFn } from '@angular/common/http';
const baseURL :string=`https://upskilling-egypt.com:3007/api/auth`
export const globalInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('accessToken');
console.log("accessToken",token)
   const apiReq = req.clone({
    url: baseURL+req.url, // Append relative URL to base URL
     setHeaders: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return next(apiReq);
};
