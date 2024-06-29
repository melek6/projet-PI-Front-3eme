import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private apiUrl = 'http://localhost:8081/api/formations';  // Remplacez par l'URL de votre API
 

  constructor(private http: HttpClient) { }

  getAllFormations(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl).pipe(
      tap(data => console.log('Résultat de getAllformations :', data)),
      catchError(this.handleError<any[]>('getAllformations', []))
    );
  }
    // Méthode générique pour la gestion des erreurs
    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(`${operation} failed:`, error);
        return of(result as T);
      };
    }

  getFormationById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(data => console.log(`Résultat de getformationById pour l'id ${id} :`, data)),
      catchError(this.handleError<any>(`getformationById id=${id}`))
    );
  }

  createFormation(formation: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formation);
  }

  updateFormation(id: number, formation: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, formation, httpOptions).pipe(
      tap(_ => console.log(`formation mise à jour avec l'id ${id}`)),
      catchError(this.handleError<any>('updateformation'))
    );
  }

  deleteFormation(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, httpOptions).pipe(
      tap(_ => console.log(`formation supprimée avec l'id ${id}`)),
      catchError(this.handleError<void>('deleteformation'))
    );
  }

  addEvaluationToFormation(formationId: number, evaluation: any): Observable<any> {
    const url = `${this.apiUrl}/${formationId}/evaluations`;
    return this.http.post<any>(url, evaluation);
  }
}


