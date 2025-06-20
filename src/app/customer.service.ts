import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private _HttpClient:HttpClient) { }


  onLogin(data:any):Observable<any>{

return this._HttpClient.post(`/login`,data)

  }


  resgisterCustomer(data:any):Observable<any>{
  return this._HttpClient.post(`/register`,data)

}
forgerPassword(email:any):Observable<any>{
  return this._HttpClient.post(`/forgot-password`,email)

}
reset_password(data:any):Observable<any>{
return this._HttpClient.post(`/reset-password`,data)
}
 changePassword(data:any):Observable<any>{
  return this._HttpClient.post(`/change-password`, data);
 }
 
}
