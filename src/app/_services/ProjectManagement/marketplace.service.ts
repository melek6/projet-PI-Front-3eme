import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {
  private baseUrl = 'http://localhost:8081/api/projects';

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/view/${id}`);
  }

  createProject(project: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/create`, project, { headers });
  }

  updateProject(id: number, project: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.baseUrl}/update/${id}`, project, { headers });
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }

  searchProjects(category: string, skillsRequired: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/search`, {
      params: {
        category: category,
        skillsRequired: skillsRequired
      }
    });
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }
}
