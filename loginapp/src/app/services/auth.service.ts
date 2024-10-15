import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import {  Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl = 'http://127.0.0.1:8000/api/';  // Change to your Django server URL

  constructor( private http: HttpClient,private router:Router) { }

  // Registration API call
  signup(username:string,email:string,password:string,confirmpassword:string): Observable<any> {
    // Prepare the payload with username,email and  password
    const body={username,email,password,confirmpassword}
    // Make a POST request to the backend login URL with the payload
    return this.http.post(`${this.baseUrl}signup/`, body);
  }
  // Login API call
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.baseUrl}login/`, body);
    
    
  }

  storeToken(token: string): void {
    sessionStorage.setItem('access_token', token);
  }
  //Retrive token from the localstorage
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  //logout by removing the token 
  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
  getAccessToken() {
    return localStorage.getItem('access_token');
  }
  isLoggedIn(): boolean {
    // Check the localStorage or a token to verify if the user is authenticated
    return !!localStorage.getItem('access_token');
  }
}