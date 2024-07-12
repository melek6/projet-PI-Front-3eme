import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EvalformationService {
  private apiUrl = 'http://localhost:8081/api/evalformation';  // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  getAllEvaluations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(data => console.log('Résultat de getAllevaluations :', data)),
      catchError(this.handleError<any[]>('getAllevaluations', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }

  getEvaluationById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(data => console.log(`Résultat de getevalformationById pour l'id ${id} :`, data)),
      catchError(this.handleError<any>(`getEvaluationById id=${id}`))
    );
  }

  addEvaluation(evalformation: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, evalformation);
  }

  updateEvaluation(id: number, evalformation: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, evalformation, httpOptions).pipe(
      tap(_ => console.log(`evalformation mise à jour avec l'id ${id}`)),
      catchError(this.handleError<any>('updateEvaluation'))
    );
  }

  deleteEvaluation(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, httpOptions).pipe(
      tap(_ => console.log(`evalformation supprimée avec l'id ${id}`)),
      catchError(this.handleError<void>('deleteEvaluation'))
    );
  }

  addEvaluationToFormation(formationId: number, evaluation: any): Observable<any> {
    const url = `${this.apiUrl}/${formationId}/evaluations`;
    return this.http.post<any>(url, evaluation);
  }
}
