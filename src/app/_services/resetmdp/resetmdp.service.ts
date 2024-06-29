import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetmdpService {

  private baseUrl = 'http://localhost:8081/password-reset'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) { }

  requestPasswordReset(email: string): Observable<any> {
    const body = { email };
    return this.http.post(`${this.baseUrl}/request`, body, { responseType: 'text' });
  }

  validateResetToken(email: string, token: string): Observable<any> {
    const body = { email, token };
    return this.http.post(`${this.baseUrl}/validate`, body, { responseType: 'text' });
  }

  changePassword(email: string, token: string, newPassword: string): Observable<any> {
    const body = { email, token, newPassword };
    return this.http.post(`${this.baseUrl}/change`, body, { responseType: 'text' });
  }
}
