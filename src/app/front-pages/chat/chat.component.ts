import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/_services/chat/chat.service';
import { UserService } from 'src/app/_services/user.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chatForm: FormGroup;
  chatObj: Chat = new Chat();
  messageObj: Message = new Message();
  messageList: Message[] = [];
  chatList: Chat[] = [];
  chatData: Chat;
  chatId: any = sessionStorage.getItem('chatId');
  secondUserUsername = '';
  allUsers: any[] = [];
  firstUserUsername = sessionStorage.getItem('username');
  senderUsername = sessionStorage.getItem('username');
  senderCheck = sessionStorage.getItem('username');

  constructor(private chatService: ChatService, private router: Router, private userService: UserService) {
    this.chatForm = new FormGroup({
      replyMessage: new FormControl()
    });
  }

  ngOnInit(): void {
    if (this.firstUserUsername) {
      this.loadChats();
      this.loadUsers();
      if (this.chatId) {
        this.loadChatById();
      }
    } else {
      console.error('Username is null or undefined in sessionStorage.');
      // Redirect to login page or show a message to the user
      this.router.navigate(['/login']);
    }
  }

  loadChats(): void {
    setInterval(() => {
      if (this.firstUserUsername) {
        this.chatService.getChatByFirstUserUsernameOrSecondUserUsername(this.firstUserUsername).subscribe(data => {
          this.chatList = data;
        }, error => {
          console.error('Error loading chats:', error);
        });
      }
    }, 1000);
  }

  loadUsers(): void {
    setInterval(() => {
      this.userService.getall().subscribe(data => {
        this.allUsers = data;
      }, error => {
        console.error('Error loading users:', error);
      });
    }, 1000);
  }

  loadChatById(): void {
    setInterval(() => {
      if (this.chatId) {
        this.chatService.getChatById(this.chatId).subscribe((data: Chat) => {
          this.chatData = data;
          this.messageList = this.chatData.messageList;
          this.secondUserUsername = this.chatData.secondUser.username;
          this.firstUserUsername = this.chatData.firstUser.username;
        }, error => {
          console.error('Error loading chat by ID:', error);
        });
      }
    }, 1000);
  }

  loadChatByEmail(event: string, event1: string): void {
    sessionStorage.removeItem('chatId');
    this.chatService.getChatByFirstUserUsernameOrSecondUserUsername(event).subscribe((data: Chat[]) => {
      this.chatData = data.find(chat => chat.secondUser.username === event1 || chat.firstUser.username === event1);
      if (this.chatData) {
        this.chatId = this.chatData.chatId.toString(); // Convert number to string
        sessionStorage.setItem('chatId', this.chatId);

        this.loadChatById();
      }
    }, error => {
      console.error('Error loading chat by email:', error);
    });
  }

  sendMessage(): void {
    this.messageObj.replyMessage = this.chatForm.value.replyMessage;
    this.messageObj.senderUsername = this.senderUsername;
    this.chatService.updateChat(this.messageObj, this.chatId).subscribe(() => {
      this.chatForm.reset();
      this.loadChatById();
    }, error => {
      console.error('Error sending message:', error);
    });
  }

  goToChat(username: string): void {
    this.chatService.getChatByFirstUserUsernameOrSecondUserUsername(username).subscribe(
      (data: Chat[]) => {
        const existingChat = data.find(chat => chat.firstUser.username === this.firstUserUsername || chat.secondUser.username === this.firstUserUsername);
        if (existingChat) {
          this.chatId = existingChat.chatId.toString(); // Convert number to string
          sessionStorage.setItem('chatId', this.chatId);
        } else {
          this.chatObj.firstUser = { username: this.firstUserUsername } as User;
          this.chatObj.secondUser = { username: username } as User;
          this.chatService.createChatRoom(this.chatObj).subscribe((data: any) => {
            this.chatData = data;
            this.chatId = this.chatData.chatId.toString(); // Convert number to string
            sessionStorage.setItem('chatId', this.chatId);
          }, err => {
            console.error('Error creating chat room:', err);
          });
        }
      },
      error => {
        console.error('Error loading chat by username:', error);
      }
    );
  }
}

// Models

class Chat {
  chatId: number;
  firstUser: User;
  secondUser: User;
  messageList: Message[];
}

class Message {
  senderUsername: string;
  time: Date = new Date();
  replyMessage: string;
}

class User {
  id: number;
  username: string;
  email: string;
  blocked: boolean;
  profilePictureUrl: string;
  password: string;
}
