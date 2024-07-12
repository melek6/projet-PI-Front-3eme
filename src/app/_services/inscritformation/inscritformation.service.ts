import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InscriptionFormation } from 'src/app/pages/liste-inscrit/inscription-formation.model';
import { AuthService } from '../auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class InscritformationService {
  private apiUrl = 'http://localhost:8081/api/inscriptions'; 

  constructor(private http: HttpClient,private authService: AuthService) { }

  getAllInscriptions(): Observable<InscriptionFormation[]> {
    return this.http.get<InscriptionFormation[]>(this.apiUrl).pipe(
      tap(data => console.log('Résultat de getAllInscriptions :', data)),
      catchError(this.handleError<InscriptionFormation[]>('getAllInscriptions', []))
    );
  }

  getInscriptionById(id: number): Observable<InscriptionFormation> {
    return this.http.get<InscriptionFormation>(`${this.apiUrl}/${id}`).pipe(
      tap(data => console.log(`Résultat de getInscriptionById pour l'id ${id} :`, data)),
      catchError(this.handleError<InscriptionFormation>(`getInscriptionById id=${id}`))
    );
  }

  createInscription(inscription: InscriptionFormation): Observable<InscriptionFormation> {
    return this.http.post<InscriptionFormation>(this.apiUrl + '/hello', inscription, httpOptions).pipe(
      tap(data => console.log('Inscription créée :', data)),
      catchError(this.handleError<InscriptionFormation>('createInscription'))
    );
  }

  updateInscription(id: number, inscription: InscriptionFormation): Observable<InscriptionFormation> {
    return this.http.put<InscriptionFormation>(`${this.apiUrl}/${id}`, inscription, httpOptions).pipe(
      tap(data => console.log(`Inscription mise à jour avec l'id ${id}`)),
      catchError(this.handleError<InscriptionFormation>('updateInscription'))
    );
  }

  deleteInscription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, httpOptions).pipe(
      tap(_ => console.log(`Inscription supprimée avec l'id ${id}`)),
      catchError(this.handleError<void>('deleteInscription'))
    );
  }
  getInscriptionsByUserAndEtat(etat: string): Observable<any[]> {
    const userId = this.authService.getUserId();
    const url = `${this.apiUrl}/user/${userId}/etat/${etat}`;
    return this.http.get<any[]>(url).pipe(
      tap(data => console.log(`Inscriptions for user by etat ${etat}:`, data)),
      catchError(this.handleError<any[]>('getInscriptionsByUserAndEtat', []))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }
}
