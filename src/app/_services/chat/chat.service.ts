import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chat, Message } from 'src/app/front-pages/chat/chat.component';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private baseUrl = 'http://localhost:8081/api/chats';

  constructor(private httpClient: HttpClient) { }

  updateChat(message: Message, chatId: string): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/message/${chatId}`, message);
  }

  getChatById(chatId: string): Observable<Chat> {
    return this.httpClient.get<Chat>(`${this.baseUrl}/${chatId}`);
  }

  createChatRoom(chat: Chat): Observable<Object> {
    return this.httpClient.post(this.baseUrl + '/add', chat);
  }

  getChatByFirstUserUsernameOrSecondUserUsername(username: string): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>(`${this.baseUrl}/username/${username}`);
  }
}
