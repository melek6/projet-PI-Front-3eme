import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserupdateService {

  private baseUrl = 'http://localhost:8081/api/users';

  constructor(private http: HttpClient) { }
  getUserDetails(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, user);
  }

  uploadProfilePicture(id: number, file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<string>(`${this.baseUrl}/${id}/uploadProfilePicture`, formData);
  }
}
