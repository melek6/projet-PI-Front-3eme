import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { ChatService } from 'src/app/_services/chat/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  users: any[] = [];
  messages: any[] = [];
  selectedUserId: number | null = null;
  newMessage: string = '';
  loggedInUserId: number | null = null;
  conversations: any[] = [];

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loggedInUserId = this.authService.getCurrentUser()?.id;
    this.loadUsersWithApprovedPropositions();
    this.loadConversations();
  }

  loadUsersWithApprovedPropositions() {
    this.chatService.getUsersWithApprovedPropositionsForProjectOwner().subscribe({
      next: users => {
        this.users = users;
      },
      error: error => {
        console.error('Error loading users:', error);
      }
    });
  }

  loadConversations() {
    if (this.loggedInUserId !== null) {
      this.chatService.getConversations(this.loggedInUserId).subscribe({
        next: conversations => {
          this.conversations = conversations;
        },
        error: error => {
          console.error('Error loading conversations:', error);
        }
      });
    }
  }

  selectUser(userId: number) {
    this.selectedUserId = userId;
    this.loadMessages();
  }

  loadMessages() {
    if (this.selectedUserId !== null && this.loggedInUserId !== null) {
      this.chatService.getMessages(this.loggedInUserId, this.selectedUserId).subscribe({
        next: messages => {
          this.messages = messages;
        },
        error: error => {
          console.error('Error loading messages:', error);
        }
      });
    }
  }

  sendMessage() {
    if (this.selectedUserId !== null && this.loggedInUserId !== null && this.newMessage.trim()) {
      const chatMessage = {
        senderId: this.loggedInUserId,
        recipientId: this.selectedUserId,
        content: this.newMessage
      };

      this.chatService.sendMessage(chatMessage).subscribe({
        next: response => {
          this.messages.push(response);
          this.newMessage = '';
        },
        error: error => {
          console.error('Error sending message:', error);
        }
      });
    }
  }
}
