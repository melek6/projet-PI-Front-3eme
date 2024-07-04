import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class InscritformationService {
  private apiUrl = 'http://localhost:8081/api/inscriptions'; 

  constructor(private http: HttpClient) { }

  getAllInscriptions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(data => console.log('Résultat de getAllInscriptions :', data)),
      catchError(this.handleError<any[]>('getAllInscriptions', []))
    );
  }

  getInscriptionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      tap(data => console.log(`Résultat de getInscriptionById pour l'id ${id} :`, data)),
      catchError(this.handleError<any>(`getInscriptionById id=${id}`))
    );
  }

  createInscription(inscription: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/hello', inscription, httpOptions).pipe(
      tap(data => console.log('Inscription créée :', data)),
      catchError(this.handleError<any>('createInscription'))
    );
  }
  updateInscription(id: number, inscription: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, inscription, httpOptions).pipe(
      tap(data => console.log(`Inscription mise à jour avec l'id ${id}`)),
      catchError(this.handleError<any>('updateInscription'))
    );
  }

  deleteInscription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, httpOptions).pipe(
      tap(_ => console.log(`Inscription supprimée avec l'id ${id}`)),
      catchError(this.handleError<void>('deleteInscription'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }
}
