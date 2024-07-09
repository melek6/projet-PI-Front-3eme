import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8081/api/chats';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient) { }

  updateChat(message: Message, chatId: string): Observable<Chat> {
    return this.httpClient.put<Chat>(`${BASE_URL}/message/${chatId}`, message);
  }

  getChatById(chatId: string): Observable<Chat> {
    return this.httpClient.get<Chat>(`${BASE_URL}/${chatId}`);
  }

  createChatRoom(chat: Chat): Observable<Chat> {
    return this.httpClient.post<Chat>(`${BASE_URL}/add`, chat);
  }

  getChatByFirstUserUsernameOrSecondUserUsername(username: string): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>(`${BASE_URL}/username/${username}`);
  }
}

// Models

export class Chat {
  chatId: number;
  firstUser: User;
  secondUser: User;
  messageList: Message[];
}

export class Message {
  senderUsername: string;
  time: Date = new Date();
  replyMessage: string;
}

export class User {
  id: number;
  username: string;
  email: string;
  blocked: boolean;
  profilePictureUrl: string;
  password: string;
}
