import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  createProject(project: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}/create`, project);
  }

  updateProject(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/update/${id}`, value);
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }

  searchProjects(category: string, skillsRequired: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search`, {
      params: {
        category: category,
        skillsRequired: skillsRequired
      }
    });
  }
}
