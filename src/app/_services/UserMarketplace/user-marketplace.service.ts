import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserMarketplaceService {
  private baseUrl = "http://localhost:8081/api/projects";
  private proposalUrl = "http://localhost:8081/api/propositions";
  private QrApi = "http://localhost:8081/api/qrcode";

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/all`);
  }

  submitProposal(
    projectId: number,
    detail: string,
    amount: number,
    file: File
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("detail", detail);
    formData.append("amount", amount.toString());
    formData.append("file", file);

    return this.http.post(`${this.proposalUrl}/${projectId}`, formData);
  }

  getUserProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/user/GetById`);
  }

  createProject(project: any): Observable<any> {
    let body = new HttpParams();
    body = body.set("title", project.title);
    body = body.set("description", project.description);
    body = body.set("category", project.category);
    body = body.set("skillsRequired", project.skillsRequired);
    body = body.set("deadline", project.deadline);
    body = body.set("budget", project.budget.toString());

    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.post(`${this.baseUrl}/create`, body.toString(), {
      headers,
    });
  }

  updateProject(projectId: number, project: any): Observable<any> {
    let body = new HttpParams();
    body = body.set("title", project.title);
    body = body.set("description", project.description);
    body = body.set("category", project.category);
    body = body.set("skillsRequired", project.skillsRequired);
    body = body.set("deadline", project.deadline);
    body = body.set("budget", project.budget.toString());

    const headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    return this.http.put(
      `${this.baseUrl}/update/${projectId}`,
      body.toString(),
      { headers }
    );
  }

  deleteProject(projectId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${projectId}`);
  }

  getProjectCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }

  getPropositionsByProjectId(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.proposalUrl}/${projectId}`);
  }

  approveProposition(propositionId: number): Observable<any> {
    return this.http.post(`${this.proposalUrl}/${propositionId}/approve`, {});
  }

  declineProposition(propositionId: number): Observable<any> {
    return this.http.post(`${this.proposalUrl}/${propositionId}/decline`, {});
  }

  getUsersWithApprovedPropositions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.proposalUrl}/approvedUsers`);
  }
  getUserProposals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.proposalUrl}/user`);
  }

  deleteUserProposition(propositionId: number): Observable<void> {
    return this.http.delete<void>(`${this.proposalUrl}/user/${propositionId}`);
  }

  updateUserProposition(
    propositionId: number,
    detail: string,
    amount: number,
    file?: File,
    removeExistingFile: boolean = false
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("detail", detail);
    formData.append("amount", amount.toString());
    formData.append("removeExistingFile", removeExistingFile.toString());
    if (file) {
      formData.append("file", file);
    }

    return this.http.put<any>(
      `${this.proposalUrl}/user/${propositionId}`,
      formData
    );
  }

  downloadFile(fileName: string): Observable<Blob> {
    const params = new HttpParams().set("filePath", fileName.split("?")[0]);
    return this.http.get(`${this.proposalUrl}/download`, {
      params,
      responseType: "blob",
    });
  }

  getDownloadUrl(fileName: string): string {
    const params = new HttpParams().set("filePath", fileName.split("?")[0]);
    return `${this.proposalUrl}/download?${params.toString()}`;
  }

  getApprovedPropositions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.proposalUrl}/approved`);
  }

  generateQRCode(propositionId: number): Observable<Blob> {
    return this.http.get(`${this.QrApi}/${propositionId}`, {
      responseType: "blob",
    });
  }
}
