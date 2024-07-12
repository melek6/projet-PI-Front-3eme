import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { FormationCategory } from 'src/app/pages/gestion-formation/formation-category.enum';
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
  getRecommendedFormations(): Observable<any[]> {
    const url = `${this.apiUrl}/recommended`;
    return this.http.get<any[]>(url).pipe(
      tap(data => console.log('Recommended formations:', data)),
      catchError(this.handleError<any[]>('getRecommendedFormations', []))
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
  getFormationsByCategory(category: string): Observable<any[]> {
    const url = `${this.apiUrl}/category/${category}`;
    return this.http.get<any[]>(url).pipe(
      tap(data => console.log(`Formations for category ${category}:`, data)),
      catchError(this.handleError<any[]>('getFormationsByCategory', []))
    );
  }

  getAllCategories(): Observable<any[]> {
    const url = `${this.apiUrl}/categories`;
    return this.http.get<any[]>(url).pipe(
      tap(data => console.log('Categories:', data)),
      catchError(this.handleError<any[]>('getAllCategories', []))
    );
  }
  createFormation(formation: any): Observable<any> {
    // Assurez-vous que la formation inclut une catégorie valide
    if (!Object.values(FormationCategory).includes(formation.category)) {
      formation.category = FormationCategory.Other; // Catégorie par défaut si non spécifiée
    }
    return this.http.post<any>(this.apiUrl, formation, httpOptions);
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

  // addEvaluationToFormation(formationId: number, evaluation: any): Observable<any> {
  //   const url = `${this.apiUrl}/${formationId}/evaluations`;
  //   return this.http.post<any>(url, evaluation);
  // }
  uploadPlanning(formationId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const url = `${this.apiUrl}/${formationId}/uploadPlanning`;
    return this.http.post(url, formData, { responseType: 'json' }).pipe(
      catchError(this.handleError<any>('uploadPlanning'))
    );
  }
  getCompletedFormationsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8081/api/inscriptions/user/${userId}/completed`);
  }
  addEvaluationToFormation(formationId: number, evaluation: any): Observable<any> {
    const url = `${this.apiUrl}/${formationId}/evaluations`;
    return this.http.post<any>(url, evaluation, httpOptions).pipe(
      tap(_ => console.log('Évaluation ajoutée')),
      catchError(this.handleError<any>('addEvaluationToFormation'))
    );
  }
}


