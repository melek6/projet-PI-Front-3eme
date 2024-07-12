import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private apiUrl = 'http://localhost:8081/api/questions'; // URL de votre API

  constructor(private http: HttpClient) { }

  createOrUpdateQuestion(question: any, quizId: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}?quizId=${quizId}`, question, httpOptions);
  }

  getQuestionById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  getAllQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteQuestionById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  updateQuestion(id: number, question: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, question, httpOptions);
  }

  getReponsesByQuestionId(id: number): Observable<string[]> {
    const url = `${this.apiUrl}/${id}/responses`;
    return this.http.get<string[]>(url);
  }


  sendEmailValidationToUser(idUser : number, score : number, quizId){
    return this.http.post<any>(`${this.apiUrl}/sendMail/${idUser}/${score}/${quizId}`, httpOptions);
  }

}
