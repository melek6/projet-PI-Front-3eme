// offre.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OffreService {
  private apiUrl = 'http://localhost:8081/api/offres';

  constructor(private http: HttpClient) {}

  getAllOffres(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(data => console.log('Résultat de getAllOffres :', data)),
      catchError(this.handleError<any[]>('getAllOffres', []))
    );
  }

  getOffreById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(data => console.log(`Résultat de getOffreById pour l'id ${id} :`, data)),
      catchError(this.handleError<any>(`getOffreById id=${id}`))
    );
  }

  addOffre(offre: any): Observable<any> {
    // Si votre backend attend une date de création automatique, vous pouvez la créer ici
    offre.createDate = new Date(); // Date de système par défaut
    return this.http.post<any>(this.apiUrl, offre, httpOptions).pipe(
      tap((newOffre: any) => console.log(`Offre ajoutée avec l'id ${newOffre.id}`)),
      catchError(this.handleError<any>('addOffre'))
    );
  }

  updateOffre(id: number, offre: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, offre, httpOptions).pipe(
      tap(_ => console.log(`Offre mise à jour avec l'id ${id}`)),
      catchError(this.handleError<any>('updateOffre'))
    );
  }

  deleteOffre(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, httpOptions).pipe(
      tap(_ => console.log(`Offre supprimée avec l'id ${id}`)),
      catchError(this.handleError<void>('deleteOffre'))
    );
  }

  // Méthode générique pour la gestion des erreurs
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }
}
