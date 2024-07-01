import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

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
    return this.http.get<any[]>(this.apiUrl);
  }

  getInscriptionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createInscription(inscription: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, inscription);
  }

  updateInscription(id: number, inscription: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, inscription);

  }

  deleteInscription(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Méthode générique pour la gestion des erreurs
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }
}
