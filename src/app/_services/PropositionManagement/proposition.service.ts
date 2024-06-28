import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropositionService {
  private baseUrl = 'http://localhost:8081/api/propositions';
  private projectsUrl = 'http://localhost:8081/api/projects';

  constructor(private http: HttpClient) { }

  getAllPropositions(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getPropositionsByProjectId(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${projectId}`);
  }

  createProposition(projectId: number, proposition: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.baseUrl}/${projectId}`, proposition, { headers });
  }

  updateProposition(id: number, proposition: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(`${this.baseUrl}/${id}`, proposition, { headers });
  }

  deleteProposition(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  approveProposition(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}/approve`, {});
  }

  declineProposition(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}/decline`, {});
  }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.projectsUrl}/all`);
  }
}
