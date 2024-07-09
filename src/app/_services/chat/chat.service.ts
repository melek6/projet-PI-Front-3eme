import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  private baseUrl = "http://localhost:8081/api/chats";

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
