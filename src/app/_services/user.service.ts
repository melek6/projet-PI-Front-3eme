import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8081/api/test/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
  getall(): Observable<any> {
    return this.http.get(API_URL + 'all');
  }
  getallCand(): Observable<any> {
    return this.http.get(API_URL + 'allc');
  }
  findById(id): Observable<any> {
    return this.http.get(`$API_URL + 'find'}/${id}`);
  }
  findByUsername(username): Observable<any> {
    return this.http.get(`${API_URL + 'findusername'}/${username}`);
  }
  delete(id) {
    return this.http.delete(`${API_URL + 'delete'}/${id}`);
  }
}
