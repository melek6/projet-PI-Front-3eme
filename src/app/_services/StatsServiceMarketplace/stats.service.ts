import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StatsService {
  private baseUrl = "http://localhost:8081/api/stats";

  constructor(private http: HttpClient) {}

  getProjectsByCategory(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(
      `${this.baseUrl}/projects-by-category`
    );
  }

  getPropositionsByStatus(): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(
      `${this.baseUrl}/propositions-by-status`
    );
  }

  getTotalProjects(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total-projects`);
  }

  getApprovedPropositionsStats(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/approved-propositions`);
  }

  getRecentProjectActivities(): Observable<ProjectActivityDTO[]> {
    return this.http.get<ProjectActivityDTO[]>(
      `${this.baseUrl}/recent-project-activities`
    );
  }

  getTopProjectOwners(): Observable<TopProjectOwnerDTO[]> {
    return this.http.get<TopProjectOwnerDTO[]>(
      `${this.baseUrl}/top-project-owners`
    );
  }

  getProjectsCreatedOverTime(): Observable<ProjectCreatedOverTimeDTO[]> {
    return this.http.get<ProjectCreatedOverTimeDTO[]>(
      `${this.baseUrl}/projects-created-over-time`
    );
  }
}

export class ProjectActivityDTO {
  activityType: string;
  projectName: string;
  createdAt: Date;

  constructor(activityType: string, projectName: string, createdAt: Date) {
    this.activityType = activityType;
    this.projectName = projectName;
    this.createdAt = createdAt;
  }
}

export class TopProjectOwnerDTO {
  username: string;
  projectCount: number;
  overallActivity: number;

  constructor(username: string, projectCount: number, overallActivity: number) {
    this.username = username;
    this.projectCount = projectCount;
    this.overallActivity = overallActivity;
  }
}

export class ProjectCreatedOverTimeDTO {
  date: Date;
  projectCount: number;

  constructor(date: Date, projectCount: number) {
    this.date = date;
    this.projectCount = projectCount;
  }
}
