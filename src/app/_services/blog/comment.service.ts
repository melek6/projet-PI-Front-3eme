import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8081/api/commentaires';

  constructor(private http: HttpClient) {}

  getAllCommentaires(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCommentaireById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createCommentaire(commentaire: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, commentaire);
  }

  updateCommentaire(id: number, commentaire: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, commentaire);
  }

  deleteCommentaire(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
