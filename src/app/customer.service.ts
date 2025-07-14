import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _HttpClient:HttpClient) { }

 isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Check if token exists
  }
  onLogin(data:any):Observable<any>{

return this._HttpClient.post(`/auth/login`,data)

  }


  resgisterCustomer(data:any):Observable<any>{
  return this._HttpClient.post(`/auth/register`,data)

}
forgerPassword(email:any):Observable<any>{
  return this._HttpClient.post(`/auth/forgot-password`,email)

}
reset_password(data:any):Observable<any>{
return this._HttpClient.post(`/auth/reset-password`,data)
}
 changePassword(data:any):Observable<any>{
  return this._HttpClient.post(`/auth/change-password`, data);
 }
 
  getbooks():Observable<any>{
  return this._HttpClient.get(`/book`)
 }


  
  getCategories():Observable<any>{
  return this._HttpClient.get(`/category`)
 }
  getBokkById(id:number){
    return  this._HttpClient.get(`/book/${id}`)
  }

   addToCart(data:any):Observable<any>{
  return this._HttpClient.post(`/basket/item`, data);
 }

 getCart(): Observable<any> {
  return this._HttpClient.get(`/basket`);
}

removeCartItem(data: any): Observable<any> {
  return this._HttpClient.delete(`/basket/item`, {
    body: data
  });
}
getBookById(id: string): Observable<any> {
  return this._HttpClient.get(`/book/${id}`);
}


updateCartItem(itemId: string,data:any): Observable<any> {
  return this._HttpClient.put(`/basket/${itemId}`,data);
}
getStripeSessionByOrderId(orderId: string) {
  return this._HttpClient.get(`/api/order/${orderId}`);
}

}


