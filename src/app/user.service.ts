import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8083/api/v1';

  constructor(private httpClient: HttpClient) { }

  getUsers() : Observable<any[]>{
    return this.httpClient.get<any[]>('http://localhost:8083/api/v1/notdelete');
  }

  // createUsers(user:any):Observable<any>{
  //   return this.httpClient.post<any>("http://localhost:8083/api/v1/create",user);
  // }

  // addUser(user: any): Observable<any> {
  //   return this.httpClient.post<any>("http://localhost:8083/api/v1/create", user);
  // }


  // updateUsers(user:any):Observable<any>{
  //   return this.httpClient.put<any>("http://localhost:8083/api/v1/update" ,user);
  // }
  // updateUser(emailId: string, updatedUser: any): Observable<any> {
  //   const url = `${this.apiUrl}/${emailId}`;
  //   return this.httpClient.put<any>(`http://localhost:8083/api/v1/delete/${emailId}`, updatedUser);
  // }
  // deleteUsers(emailId:any):Observable<any>{
  //   return this.httpClient.delete<any>("http://localhost:8083/api/v1/delete/${emailId}");
  // }

  updateUser(emailId:any,User:any): Observable<any> {
    // const url = `${this.apiUrl}/users/${emailId}`;
    // if (emailId) {
      // If emailId is provided, perform update
      console.log(emailId);
      return this.httpClient.put(`http://localhost:8083/api/v1/update/${emailId}`,User);
    // } else {
    //   // If emailId is not provided, perform save
    //   return this.httpClient.post("http://localhost:8083/api/v1/create", User);
    // }
  }

  addUser():Observable<any>{
    return this.httpClient.post("http://localhost:8083/api/v1/create", User); 
   }

  deleteUser(emailId: string): Observable<any> {
    // const url = `${this.apiUrl}/${emailId}`;
    console.log(emailId)
    return this.httpClient.delete<any>(`http://localhost:8083/api/v1/delete/${emailId}`);
  }




// Cadet?
  updateCadet(user:any):Observable<any>{
    return this.httpClient.put(`http://localhost:8084/ncc/update`,user)
  }
 
  createCadet(user:any):Observable<any>{
    return this.httpClient.post(`http://localhost:8084/ncc/create`,user)
  }
 
  getCadet():Observable<any[]>{
    return this.httpClient.get<any[]>(`http://localhost:8084/ncc/notdelete`);
  }

  deleteCadet(mobile:any):Observable<any>{
    return this.httpClient.delete(`http://localhost:8084/ncc/delete/${mobile}`)
  }

  exportCadet():Observable<Blob>{
    return this.httpClient.get(`http://localhost:8084/ncc/excel`,{
      responseType:'blob',
    });
    
  }

  updateexcel(mobile:any,User:any):Observable<any>{
    return this.httpClient.put(`http://localhost:8084/ncc/updateFromExcel/${mobile}`,User)
  }

}
