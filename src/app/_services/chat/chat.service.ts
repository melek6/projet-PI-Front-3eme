import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { forkJoin, map, Observable } from "rxjs";
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  private baseUrl = "http://localhost:8081/api/chats";
  private apiUrl = "http://localhost:8081/api/messages/users";

  constructor(private httpClient: HttpClient) {}

  updateChat(message: Message, chatId: string): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/message/${chatId}`, message);
  }

  getChatById(chatId: string): Observable<Chat> {
    return this.httpClient.get<Chat>(`${this.baseUrl}/${chatId}`);
  }

  createChatRoom(chat: Chat): Observable<Object> {
    return this.httpClient.post(this.baseUrl + "/add", chat);
  }

  getChatByUsername(username: string): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>(`${this.baseUrl}/username/${username}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/users/all`);
  }

  getUsers(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl);
  }

  getUserIdFromToken(): any {
    const user = sessionStorage.getItem("auth-user");
    return user ? JSON.parse(user) : null;
  }

  getUserMessages(userId: number): Observable<any[]> {
    const urlFrom = `http://localhost:8081/api/messages/from/${userId}`;
    const urlTo = `http://localhost:8081/api/messages/to/${userId}`;

    const dataFrom = this.httpClient.get<any[]>(urlFrom);
    const dataTo = this.httpClient.get<any[]>(urlTo);
    console.log({ dataFrom, dataTo, urlFrom, urlTo });

    return forkJoin([dataFrom, dataTo]).pipe(
      map(([fromMessages, toMessages]) => {
        const combinedMessages = [...fromMessages, ...toMessages];
        console.log("Combined messages:", combinedMessages);
        return combinedMessages;
      })
    );
  }
}

// Models
export class Chat {
  id: number;
  user1: User;
  user2: User;
  messageList: Message[];
}

export class Message {
  id: number;
  chat: Chat;
  senderUsername: string;
  time: Date;
  replyMessage: string;
}

export class User {
  id: number;
  username: string;
  email: string;
}
