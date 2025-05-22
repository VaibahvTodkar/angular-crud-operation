import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:3000/api/'
  constructor(private http:HttpClient) { }

  getUsersList(){
    return this.http.get(this.url+"user")
  }

  createUser(data:any){
    return this.http.post(this.url+"user", data)
  }

  getUserbyId(id:any){
    return this.http.get(this.url+"user/:"+id)
  }
 

  updateUser(data:any){
    return this.http.put(this.url+"user", data)
  }

  deleteUser(id:any){
    return this.http.delete(this.url+"user/"+id)
  }

} 
