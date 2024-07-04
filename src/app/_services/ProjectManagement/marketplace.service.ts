import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  createProjectWithParams(project: any): Observable<any> {
    const params = new URLSearchParams();
    params.append('title', project.title);
    params.append('description', project.description);
    params.append('category', project.category);
    params.append('skillsRequired', project.skillsRequired);
    params.append('deadline', project.deadline);
    params.append('budget', project.budget.toString());

    return this.http.post<any>(`${this.baseUrl}/create?${params.toString()}`, {});
  }

  updateProject(id: number, params: HttpParams): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update/${id}`, {}, { params });
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
  }

  searchProjects(category: string, minBudget: number, maxBudget: number): Observable<any[]> {
    let params = new HttpParams();
    if (category) {
      params = params.append('category', category);
    }
    if (minBudget !== null) {
      params = params.append('minBudget', minBudget.toString());
    }
    if (maxBudget !== null) {
      params = params.append('maxBudget', maxBudget.toString());
    }
    return this.http.get<any[]>(`${this.baseUrl}/search`, { params });
  }
  
  
  

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }
}