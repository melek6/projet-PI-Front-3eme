import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8081/api/admin/';

  constructor(private http: HttpClient,private router: Router) { }
  getTotalUsers(): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'total');
  }

  getBlockedUsers(): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'blocked');
  }

  getModerators(): Observable<number> {
    return this.http.get<number>(this.baseUrl + 'moderators');
  }
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'users').pipe(
      tap(data => console.log('Résultat de getAllUsers :', data)),
      catchError(this.handleError)
    );
  }
  getBlockedModerators(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'blocked-moderators').pipe(
      tap(data => console.log('Résultat de getAll blocked-moderators :', data)),
      catchError(this.handleError)
    );
  }
  

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'addUser', user, httpOptions).pipe(
      tap((newUser: any) => console.log(`User ajouté avec l'id ${newUser.id}`)),
      catchError(this.handleError)
    );
  }

  updateUser(id: number, user: any): Observable<any> {
    const url = `${this.baseUrl}users/${id}`;
    return this.http.put(url, user, httpOptions).pipe(
      tap(_ => console.log(`User mis à jour avec l'id ${id}`)),
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<void> {
    const url = `${this.baseUrl}users/${id}`;
    return this.http.delete<void>(url, httpOptions).pipe(
      tap(_ => console.log(`User supprimé avec l'id ${id}`)),
      catchError(this.handleError)
    );
  }

  blockUser(id: number): Observable<any> {
    const url = `${this.baseUrl}users/block/${id}`;
    return this.http.put(url, {}, httpOptions).pipe(
      tap(_ => console.log(`User bloqué/débloqué avec l'id ${id}`)),
      catchError(this.handleError)
    );
  }

  // Handle errors
  private handleError(error: HttpErrorResponse) {
    if (error.status === 401 || error.status === 403) {
      // Traitez ici l'erreur d'autorisation
      alert('Accès non autorisé : Vous n\'avez pas les droits nécessaires pour accéder à cette ressource.');

      console.error('Accès non autorisé : Vous n\'avez pas les droits nécessaires pour accéder à cette ressource.', error);
      // Vous pouvez lever une nouvelle erreur ou gérer d'une autre manière
      this.router.navigate(['/dashboard']);

      //return throwError('Accès non autorisé');
    }
    // Gérez d'autres types d'erreurs comme vous le souhaitez
    console.error('Une erreur s\'est produite :', error);
    return throwError('Une erreur s\'est produite');
  }
 
}
