import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from 'src/auth.config';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';

const AUTH_API = 'http://localhost:8081/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private roles: string[] = [];

  //  constructor(private http: HttpClient){}
  
  // login(username: string, password: string ): Observable<any> {
  //   return this.http.post(
  //     AUTH_API + 'signin',
  //     {
  //       username,
  //       password,
  //     },
  //     httpOptions
  //   );
  // }

  // register(username: string, email: string, password: string): Observable<any> {
  //   return this.http.post(
  //     AUTH_API + 'signup',
  //     {
  //       username,
  //       email,
  //       password,
  //     },
  //     httpOptions
  //   );
  // }
 
  // getCurrentUser(): any {
  //   const user = sessionStorage.getItem('auth-user');
  //   return user ? JSON.parse(user) : null;
  // }
  

  // logout(): Observable<any> {
  //   sessionStorage.removeItem('currentUser');
  //   return this.http.post(AUTH_API + 'logout',{});
  // }
  // isLoggedIn(): boolean {
  //   return this.roles.length > 0;
  // }
  // hasRole(role: string): boolean {
  //   return this.roles.includes(role);
  // }

  // hasAnyRole(roles: string[]): boolean {
  //   return roles.some(role => this.roles.includes(role));
  // }


  constructor(private http: HttpClient, private router: Router,private storageService: StorageService) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      { username, password },
      httpOptions
    ).pipe(
      tap((response: any) => {
        if (response.token) {
          // localStorage.setItem('token', response.token);
          // this.roles = response.roles || [];
          // sessionStorage.setItem('auth-user', JSON.stringify(response.user));
          this.storageService.saveToken(response.token); // Save token using StorageService
          this.roles = response.roles || [];
          this.storageService.saveUser(response.user); // Save user using StorageService
        }
      }),
      catchError(this.handleError('login', []))
    );

  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      { username, email, password },
      httpOptions
    ).pipe(
      catchError(this.handleError('register', []))
    );
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');
    sessionStorage.removeItem('auth-user');
    this.roles = [];
    return this.http.post(AUTH_API + 'logout', {}, httpOptions).pipe(
      tap(() => this.router.navigate(['/login'])),
      catchError(this.handleError('logout', []))
    );
  }

  // getCurrentUser(): any {
  //   const user = sessionStorage.getItem('auth-user');
  //   return user ? JSON.parse(user) : null;
  // }
  getCurrentUser(): any {
    return this.storageService.getUser(); // Get user using StorageService
  }

  // 
  isAuthenticated(): boolean {
    return !!this.storageService.getToken(); // Check token using StorageService
  }
  getToken(): string {
    return this.storageService.getToken(); // Get token using StorageService
  }
  getUserRoles(): string[] {
    if (!this.roles.length) {
      const user = this.getCurrentUser();
      this.roles = user ? user.roles : [];
    }
    return this.roles;
  }

  hasRole(role: string): boolean {
    return this.getUserRoles().includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.getUserRoles().includes(role));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}
