import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReactService {
  private apiUrl = 'http://localhost:8081/api/reacts';

  constructor(private http: HttpClient) {}

  getAllReacts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getReactById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createReact(react: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, react);
  }

  updateReact(id: number, react: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, react);
  }

  deleteReact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
