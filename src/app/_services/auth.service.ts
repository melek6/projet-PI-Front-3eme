import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from 'src/auth.config';
import { Router } from '@angular/router';

const AUTH_API = 'http://localhost:8081/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private roles: string[] = [];

  

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      { username, password },
      httpOptions
    ).pipe(
      tap((response: any) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.roles = response.roles || [];
          sessionStorage.setItem('auth-user', JSON.stringify(response.user));
        }
      }),
      catchError(this.handleError('login', []))
    );

  }

  // register(username: string, email: string, password: string): Observable<any> {
  //   return this.http.post(
  //     AUTH_API + 'signup',
  //     { username, email, password },
  //     httpOptions
  //   ).pipe(
  //     catchError(this.handleError('register', []))
  //   );
  // }
  // registerr(username: string, email: string, password: string): Observable<any> {
  //   return this.http.post(AUTH_API + 'signup', { username, email, password }, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('register', []))
  //     );
  // }
  register(signUpRequest: any, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('signUpRequest', JSON.stringify(signUpRequest));
    formData.append('file', file);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(AUTH_API + 'signup', formData, { headers });
  }

  verify(token: string): Observable<any> {
    return this.http.get(AUTH_API + 'verify?token=' + token, httpOptions)
      .pipe(
        catchError(this.handleError('verify', []))
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

  getCurrentUser(): any {
    const user = sessionStorage.getItem('auth-user');
    console.log(user);
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
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
