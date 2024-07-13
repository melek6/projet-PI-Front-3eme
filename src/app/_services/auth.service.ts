import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, lastValueFrom, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
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

  

  constructor(private http: HttpClient, 
    private router: Router,
    private afAuth: AngularFireAuth,
    private fireauth : AngularFireAuth,
    private storageService : StorageService,
    // private afAuth: AngularFireAuth
  ) {
    
  }
  updateProfilePicture(userId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('userId', userId.toString());
    formData.append('file', file, file.name);

    return this.http.put(AUTH_API +'update-profile-picture', formData);
  }
  updateUser(id: number, updateUserDTO: any): Observable<any> {
    return this.http.put(`${AUTH_API}users/${id}`, updateUserDTO, httpOptions);
  }
  changePassword(userId: number, oldPassword: string, newPassword: string): Observable<any> {
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('oldPassword', oldPassword)
      .set('newPassword', newPassword);

    return this.http.put(AUTH_API +'change-password', {}, { params });
  }
  
  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      { username, password },
      httpOptions
    ).pipe(
      tap((response: any) => {
        console.log("Login response:", response);
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.roles = response.roles || [];
          sessionStorage.setItem('auth-user', JSON.stringify(response.user));
          console.log();
        }
      }),
      catchError(this.handleError('login', []))
    );
  }
 



googleSignIn() {
  return this.fireauth.signInWithPopup(new GoogleAuthProvider()).then(res => {
    const user = res.user;

    if (user) {
      const userData = {
        email: user.email,
        name: user.displayName|| 'Bonjour Haythem',
        photoURL: user.photoURL
      };

      return this.http.post('http://localhost:8081/api/auth/google-signin', userData).toPromise()
        .then((response: any) => {
          console.log("Google Sign-In response:", response);
          if (response.accessToken) {
            this.storageService.saveToken(response.accessToken);
            this.storageService.saveUserr(response);
          }
          const username = response.username;
                  const password = "randomPassword";
                  console.log(response);
          //         localStorage.setItem('token', response.token);
          // this.roles = response.roles || [];
          // sessionStorage.setItem('auth-user', JSON.stringify(response.user));
          return this.login(username, password);
        })
        .then((loginResponse: any) => {
          console.log("Login response after Google Sign-In:", loginResponse);
          return loginResponse;
        })
        .catch(error => {
          console.error("Error during login after Google Sign-In:", error);
        });
    }
  }).catch(error => {
    console.error('Google sign-in error', error);
  });
}











  
  registerUser(signUpRequest: any, file: File, attestation?: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('signUpRequest', JSON.stringify(signUpRequest));
    formData.append('file', file);
    if (attestation) {
      formData.append('attestation', attestation);
    }

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post(AUTH_API+'signup', formData, { headers });
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


  public getCurrentUser(): any {
    const user = sessionStorage?.getItem( 'auth-user');
    console.log("Retrieved user:", user); // Log the retrieved user
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




