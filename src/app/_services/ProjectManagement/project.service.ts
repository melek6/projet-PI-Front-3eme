import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8080/api/projects';  // Replace with your API URL

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(data => console.log('Fetched projects:', data)),
      catchError(this.handleError<any[]>('getProjects', []))
    );
  }

  getProjectById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(data => console.log(`Fetched project with id=${id}:`, data)),
      catchError(this.handleError<any>(`getProjectById id=${id}`))
    );
  }

  createProject(project: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, project, httpOptions).pipe(
      tap((newProject: any) => console.log(`Created project with id=${newProject.id}`)),
      catchError(this.handleError<any>('createProject'))
    );
  }

  updateProject(id: number, project: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, project, httpOptions).pipe(
      tap(_ => console.log(`Updated project with id=${id}`)),
      catchError(this.handleError<any>('updateProject'))
    );
  }

  deleteProject(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url, httpOptions).pipe(
      tap(_ => console.log(`Deleted project with id=${id}`)),
      catchError(this.handleError<void>('deleteProject'))
    );
  }

  searchProjects(category?: string, skillsRequired?: string): Observable<any[]> {
    let params = {};
    if (category) {
      params = { ...params, category };
    }
    if (skillsRequired) {
      params = { ...params, skillsRequired };
    }
    return this.http.get<any[]>(`${this.apiUrl}/search`, { params }).pipe(
      tap(data => console.log('Searched projects:', data)),
      catchError(this.handleError<any[]>('searchProjects', []))
    );
  }

  // Generic error handling method
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result as T);
    };
  }
}
