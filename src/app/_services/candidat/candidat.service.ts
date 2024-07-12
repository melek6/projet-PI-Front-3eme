import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CandidatService {

  private apiUrl = 'http://localhost:8081/api/candidatures';

  constructor(private http: HttpClient) { }

  getAllCandidats(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(data => console.log('Résultat de getAllCandidats :', data)),
      catchError(this.handleError<any[]>('getAllCandidats', []))
    );
  }

  getCandidatById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(data => console.log(`Résultat de getCandidatById pour l'id ${id} :`, data)),
      catchError(this.handleError<any>(`getCandidatById id=${id}`))
    );
  }

  addCandidat(candidat: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, candidat);
  }


  updateCandidat(id: number, candidat: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, candidat).pipe(
      tap(_ => console.log(`Candidat mis à jour avec l'id ${id}`)),
      catchError(this.handleError<any>('updateCandidat'))
    );
  }

  deleteCandidat(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      tap(_ => console.log(`Candidat supprimé avec l'id ${id}`)),
      catchError(this.handleError<void>('deleteCandidat'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return throwError(error);
    };
  }
    getTopOffres(): Observable<any[]> { // Ajoutez cette méthode
    const url = `${this.apiUrl}/top-offres`;
    return this.http.get<any[]>(url).pipe(
      tap(data => console.log('Résultat de getTopOffres :', data)),
      catchError(this.handleError<any[]>('getTopOffres', []))
    );
  }
}
