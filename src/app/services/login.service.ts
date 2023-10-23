import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }


  public loginStatusSubject=new Subject<boolean>();

  //getting current user which is logged in
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  //Generate token
  public generateToken(loginForm : any){
      return this.http.post(`${baseUrl}/generate-token`, loginForm)
  }

  //Login uer : set token in local storage
  public loginUser(token){
    localStorage.setItem("token", token);
    
    return true;
  }

  //islogin: user is logged in or not
  public isLoggedIn(){
    let tokenStr=localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr == '' || tokenStr==null){
      return false;
    }else {
      return true;
    }
  }


  //logout : remove token from local storage
  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }


  //getToken
  public getToken(){
    return localStorage.getItem("token");
  }

  //set UserDetails
  public setUser(user){
    localStorage.setItem("user", JSON.stringify(user));
  }

  //get uSer
  public getUser(){
    let userStr=localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr);
    }else {
      this.logout();
      return null;
    }
  }


  //getUserRole
  public getUserRole(){
    let user=this.getUser();
    return user.authorities[0].authority;
  }
}
