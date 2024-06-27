import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private apiUrl = 'http://localhost:8081/api/quizzes';

  constructor(private http: HttpClient) {}

  getAllQuizzes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getQuizById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createOrUpdateQuiz(quiz: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, quiz, httpOptions);
  }

  updateQuiz(id: number, quiz: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, quiz, httpOptions);
  }

  deleteQuizById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getQuestionsByQuizId(quizId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/quizzes/${quizId}/questions`);
  }
}

