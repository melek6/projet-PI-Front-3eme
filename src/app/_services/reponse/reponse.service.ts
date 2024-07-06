import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {
  private apiUrl = 'http://localhost:8081/api/reponses';

  constructor(private http: HttpClient) { }

  createOrUpdateReponse(reponse: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, reponse);
  }

  getReponseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getAllReponses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteReponseById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateReponse(id: number, reponse: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, reponse);
  }

  createOrUpdateReponseForQuestion(reponse: any, questionId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}?questionId=${questionId}`, reponse);
  }
}
