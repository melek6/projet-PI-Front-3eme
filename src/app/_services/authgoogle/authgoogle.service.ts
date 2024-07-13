import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { lastValueFrom, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthgoogleService {
  private apiUrl = 'YOUR_BACKEND_API_URL';
  private roles: string[] = [];

  constructor(private afAuth: AngularFireAuth, private http: HttpClient) { }

  async loginWithGoogle(): Promise<any> {
    try {
      const result = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      const user = result.user;
      if (user) {
        const idToken = await user.getIdToken();
        const email = user.email;
        const response = await lastValueFrom(
          this.http.post<any>(`${this.apiUrl}/verify-token`, { idToken, email }).pipe(
            tap(response => this.setSession(response))
          )
        );
        if (response) {
          return this.setSession(response);
        }
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false; // Return a default value in case of error
    }
  }

  private setSession(response: any) {
    localStorage.setItem('idToken', response.idToken);
    this.roles = response.roles;
    return response;
  }

  getRols(): string[] {
    return this.roles;
  }
}
