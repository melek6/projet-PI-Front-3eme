import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ProjectNotificationService {
  private baseUrl = "http://localhost:8081/api/notifications";

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<any[]> {
    return new Observable((observer) => {
      this.http.get(this.baseUrl, { responseType: "text" }).subscribe(
        (data) => {
          console.log("Raw JSON response:", data); // Log the raw response
          try {
            const jsonData = JSON.parse(data);
            observer.next(jsonData);
            observer.complete();
          } catch (e) {
            observer.error("Error parsing JSON response");
          }
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  clearNotifications(): Observable<void> {
    return this.http.delete<void>(this.baseUrl);
  }
}
