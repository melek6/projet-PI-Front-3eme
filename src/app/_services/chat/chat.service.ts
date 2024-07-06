import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private baseUrl = 'http://localhost:8081/api/chats';
  private PropbaseUrl = 'http://localhost:8081/api/propositions';

  constructor(private http: HttpClient) {}

  getMessages(senderId: number, recipientId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${senderId}/${recipientId}`);
  }

  sendMessage(message: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/send`, message);
  }

  getUsersWithApprovedPropositionsForProjectOwner(): Observable<any> {
    return this.http.get<any>(`${this.PropbaseUrl}/users-with-approved-propositions-for-owner`);
  }


  getConversations(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/conversations/${userId}`);
  }
  
}
